const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const { spawn } = require('child_process');

let mainWindow;
const CONFIG_FILE = path.join(app.getPath('userData'), 'launcher-config.json');
const DOSBOX_PATH = '/Applications/dosbox.app/Contents/MacOS/DOSBox';

// Configuración por defecto de DOSBox
const DEFAULT_DOSBOX_CONFIG = `[sdl]
fullscreen=false
output=opengl

[dosbox]
machine=svga_s3
memsize=16

[render]
aspect=true
scaler=normal2x

[cpu]
core=auto
cputype=pentium_slow
cycles=3000

[sblaster]
sbtype=sb16
sbbase=220
irq=7
dma=1
hdma=5
sbmixer=true
oplmode=auto
oplemu=default
oplrate=44100

[gus]
gus=false

[speaker]
pcspeaker=true
pcrate=44100
tandy=auto
tandyrate=44100
disney=true

[joystick]
joysticktype=auto

[serial]
serial1=dummy

[dos]
xms=true
ems=true
umb=true
keyboardlayout=sp

[autoexec]
`;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        backgroundColor: '#1e1e1e',
        titleBarStyle: 'default'
    });

    mainWindow.loadFile('index.html');
    
    // Descomentar para desarrollo
    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// IPC Handlers

// Cargar configuración
ipcMain.handle('load-config', async () => {
    try {
        const data = await fs.readFile(CONFIG_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return {
            gamesFolder: '',
            dosboxConfigs: {
                'default': DEFAULT_DOSBOX_CONFIG
            },
            currentConfig: 'default'
        };
    }
});

// Guardar configuración
ipcMain.handle('save-config', async (event, config) => {
    try {
        await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2));
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

// Seleccionar carpeta de juegos
ipcMain.handle('select-games-folder', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
        title: 'Selecciona la carpeta de juegos de MS-DOS'
    });
    
    if (!result.canceled && result.filePaths.length > 0) {
        return result.filePaths[0];
    }
    return null;
});

// Leer contenido de directorio (solo carpetas y .exe/.com)
ipcMain.handle('read-directory', async (event, dirPath) => {
    try {
        const items = await fs.readdir(dirPath, { withFileTypes: true });
        const result = [];
        
        for (const item of items) {
            if (item.name.startsWith('.')) continue; // Ignorar archivos ocultos
            
            if (item.isDirectory()) {
                result.push({
                    name: item.name,
                    path: path.join(dirPath, item.name),
                    type: 'directory'
                });
            } else if (item.isFile()) {
                const ext = path.extname(item.name).toLowerCase();
                if (ext === '.exe' || ext === '.com') {
                    result.push({
                        name: item.name,
                        path: path.join(dirPath, item.name),
                        type: 'file'
                    });
                }
            }
        }
        
        return result.sort((a, b) => {
            // Directorios primero
            if (a.type === 'directory' && b.type === 'file') return -1;
            if (a.type === 'file' && b.type === 'directory') return 1;
            return a.name.localeCompare(b.name);
        });
    } catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
});

// Lanzar juego
ipcMain.handle('launch-game', async (event, gamePath, dosboxConfig) => {
    try {
        // Crear archivo de configuración temporal
        const tempConfigPath = path.join(app.getPath('temp'), 'dosbox-temp.conf');
        const gameDir = path.dirname(gamePath);
        const gameExe = path.basename(gamePath);
        
        // Añadir comandos de autoexec al config
        const configWithAutoexec = dosboxConfig + `
mount c "${gameDir}"
c:
${gameExe}
exit
`;
        
        await fs.writeFile(tempConfigPath, configWithAutoexec);
        
        // Lanzar DOSBox
        const dosbox = spawn(DOSBOX_PATH, ['-conf', tempConfigPath]);
        
        dosbox.on('error', (error) => {
            console.error('Error launching DOSBox:', error);
        });
        
        return { success: true };
    } catch (error) {
        console.error('Error launching game:', error);
        return { success: false, error: error.message };
    }
});

// Lanzar terminal MS-DOS libre
ipcMain.handle('launch-dos-terminal', async (event, dosboxConfig) => {
    try {
        // Seleccionar carpeta para montar
        const result = await dialog.showOpenDialog(mainWindow, {
            properties: ['openDirectory'],
            title: 'Selecciona la carpeta a montar como C:',
            defaultPath: '/Users/daniel/dosbox/c'
        });
        
        if (result.canceled || result.filePaths.length === 0) {
            return { success: false, canceled: true };
        }
        
        const mountPath = result.filePaths[0];
        
        // Crear archivo de configuración temporal
        const tempConfigPath = path.join(app.getPath('temp'), 'dosbox-terminal.conf');
        
        // Añadir comandos de autoexec al config (solo mount, sin ejecutar nada)
        const configWithAutoexec = dosboxConfig + `
mount c "${mountPath}"
c:
`;
        
        await fs.writeFile(tempConfigPath, configWithAutoexec);
        
        // Lanzar DOSBox
        const dosbox = spawn(DOSBOX_PATH, ['-conf', tempConfigPath]);
        
        dosbox.on('error', (error) => {
            console.error('Error launching DOSBox terminal:', error);
        });
        
        return { success: true };
    } catch (error) {
        console.error('Error launching DOS terminal:', error);
        return { success: false, error: error.message };
    }
});
