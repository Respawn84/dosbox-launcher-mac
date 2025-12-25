const { ipcRenderer } = require('electron');
const path = require('path');

// Estado de la aplicación
let appConfig = null;
let currentPath = '';
let expandedFolders = new Set();

// Elementos del DOM
const welcomeScreen = document.getElementById('welcomeScreen');
const fileExplorer = document.getElementById('fileExplorer');
const btnSelectFolder = document.getElementById('btnSelectFolder');
const btnSelectFolderWelcome = document.getElementById('btnSelectFolderWelcome');
const btnDosTerminal = document.getElementById('btnDosTerminal');
const btnConfigEditor = document.getElementById('btnConfigEditor');
const configModal = document.getElementById('configModal');
const btnCloseConfig = document.getElementById('btnCloseConfig');
const btnSaveConfig = document.getElementById('btnSaveConfig');
const btnCancelConfig = document.getElementById('btnCancelConfig');
const configSelect = document.getElementById('configSelect');
const configEditor = document.getElementById('configEditor');
const btnNewConfig = document.getElementById('btnNewConfig');
const btnDeleteConfig = document.getElementById('btnDeleteConfig');
const currentPathDisplay = document.getElementById('currentPath');
const fileTree = document.getElementById('fileTree');

// Inicializar aplicación
async function init() {
    appConfig = await ipcRenderer.invoke('load-config');
    
    if (appConfig.gamesFolder && appConfig.gamesFolder !== '') {
        showFileExplorer();
        currentPath = appConfig.gamesFolder;
        await renderFileTree();
    } else {
        showWelcomeScreen();
    }
    
    updateConfigSelect();
}

// Mostrar pantalla de bienvenida
function showWelcomeScreen() {
    welcomeScreen.style.display = 'flex';
    fileExplorer.style.display = 'none';
}

// Mostrar explorador de archivos
function showFileExplorer() {
    welcomeScreen.style.display = 'none';
    fileExplorer.style.display = 'flex';
}

// Seleccionar carpeta de juegos
async function selectGamesFolder() {
    const folder = await ipcRenderer.invoke('select-games-folder');
    if (folder) {
        appConfig.gamesFolder = folder;
        currentPath = folder;
        await ipcRenderer.invoke('save-config', appConfig);
        showFileExplorer();
        await renderFileTree();
    }
}

// Renderizar árbol de archivos
async function renderFileTree() {
    currentPathDisplay.textContent = currentPath;
    fileTree.innerHTML = '';
    
    await renderDirectory(currentPath, fileTree, 0);
}

// Renderizar directorio recursivamente
async function renderDirectory(dirPath, container, level) {
    const items = await ipcRenderer.invoke('read-directory', dirPath);
    
    for (const item of items) {
        const itemElement = createTreeItem(item, level);
        container.appendChild(itemElement);
        
        // Si es un directorio expandido, renderizar sus hijos
        if (item.type === 'directory' && expandedFolders.has(item.path)) {
            const childContainer = document.createElement('div');
            childContainer.className = 'children';
            container.appendChild(childContainer);
            await renderDirectory(item.path, childContainer, level + 1);
        }
    }
}

// Crear elemento del árbol
function createTreeItem(item, level) {
    const div = document.createElement('div');
    div.className = `tree-item ${item.type} level-${level}`;
    
    const icon = document.createElement('span');
    icon.className = 'icon';
    
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = item.name;
    
    if (item.type === 'directory') {
        icon.textContent = expandedFolders.has(item.path) ? '📂' : '📁';
        div.classList.toggle('expanded', expandedFolders.has(item.path));
        
        div.addEventListener('click', async (e) => {
            e.stopPropagation();
            toggleFolder(item.path);
        });
    } else {
        icon.textContent = '💾';
        
        div.addEventListener('dblclick', async (e) => {
            e.stopPropagation();
            await launchGame(item.path);
        });
    }
    
    div.appendChild(icon);
    div.appendChild(name);
    
    return div;
}

// Alternar expansión de carpeta
async function toggleFolder(folderPath) {
    if (expandedFolders.has(folderPath)) {
        expandedFolders.delete(folderPath);
    } else {
        expandedFolders.add(folderPath);
    }
    await renderFileTree();
}

// Lanzar juego
async function launchGame(gamePath) {
    const configName = appConfig.currentConfig || 'default';
    const dosboxConfig = appConfig.dosboxConfigs[configName];
    
    const result = await ipcRenderer.invoke('launch-game', gamePath, dosboxConfig);
    
    if (!result.success) {
        alert('Error al lanzar el juego: ' + result.error);
    }
}

// Lanzar terminal MS-DOS libre
async function launchDosTerminal() {
    const configName = appConfig.currentConfig || 'default';
    const dosboxConfig = appConfig.dosboxConfigs[configName];
    
    const result = await ipcRenderer.invoke('launch-dos-terminal', dosboxConfig);
    
    if (!result.success && !result.canceled) {
        alert('Error al lanzar la terminal: ' + result.error);
    }
}

// Mostrar editor de configuración
function showConfigEditor() {
    configModal.classList.add('active');
    const configName = appConfig.currentConfig || 'default';
    configEditor.value = appConfig.dosboxConfigs[configName];
}

// Cerrar editor de configuración
function closeConfigEditor() {
    configModal.classList.remove('active');
}

// Actualizar selector de configuraciones
function updateConfigSelect() {
    configSelect.innerHTML = '';
    for (const name in appConfig.dosboxConfigs) {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        if (name === appConfig.currentConfig) {
            option.selected = true;
        }
        configSelect.appendChild(option);
    }
}

// Cambiar configuración actual
configSelect.addEventListener('change', (e) => {
    appConfig.currentConfig = e.target.value;
    configEditor.value = appConfig.dosboxConfigs[e.target.value];
});

// Crear nueva configuración
btnNewConfig.addEventListener('click', () => {
    const name = prompt('Nombre de la nueva configuración:');
    if (name && name.trim() !== '') {
        if (appConfig.dosboxConfigs[name]) {
            alert('Ya existe una configuración con ese nombre');
            return;
        }
        appConfig.dosboxConfigs[name] = appConfig.dosboxConfigs['default'];
        appConfig.currentConfig = name;
        updateConfigSelect();
        configEditor.value = appConfig.dosboxConfigs[name];
    }
});

// Eliminar configuración
btnDeleteConfig.addEventListener('click', () => {
    const configName = appConfig.currentConfig;
    if (configName === 'default') {
        alert('No se puede eliminar la configuración por defecto');
        return;
    }
    
    if (confirm(`¿Eliminar la configuración "${configName}"?`)) {
        delete appConfig.dosboxConfigs[configName];
        appConfig.currentConfig = 'default';
        updateConfigSelect();
        configEditor.value = appConfig.dosboxConfigs['default'];
    }
});

// Guardar configuración
btnSaveConfig.addEventListener('click', async () => {
    const configName = appConfig.currentConfig;
    appConfig.dosboxConfigs[configName] = configEditor.value;
    
    const result = await ipcRenderer.invoke('save-config', appConfig);
    if (result.success) {
        closeConfigEditor();
    } else {
        alert('Error al guardar la configuración: ' + result.error);
    }
});

// Event Listeners
btnSelectFolder.addEventListener('click', selectGamesFolder);
btnSelectFolderWelcome.addEventListener('click', selectGamesFolder);
btnDosTerminal.addEventListener('click', launchDosTerminal);
btnConfigEditor.addEventListener('click', showConfigEditor);
btnCloseConfig.addEventListener('click', closeConfigEditor);
btnCancelConfig.addEventListener('click', closeConfigEditor);

// Cerrar modal al hacer click fuera
configModal.addEventListener('click', (e) => {
    if (e.target === configModal) {
        closeConfigEditor();
    }
});

// Iniciar aplicación
init();
