
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const { join } = require("path")
const env = process.env.NODE_ENV || 'development';
const Store = require('electron-store');
const store = new Store();
// If development environment
if (env === 'development') {
    try {
        require('electron-reloader')(module, {
            debug: true,
            watchRenderer: true
        });
    } catch (_) { console.log('Error'); }
}

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: true,
            preload: join(__dirname, "./preload.js") // when ever we load a windows expose preload js
        }
    })
    //define icpMainHandle
    ipcMain.handle('dialog:openDirectory', async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog(win, {
            properties: ['openDirectory']
        })
        if (canceled) {
            return
        } else {
            return filePaths[0]
        }
    })

    ipcMain.handle('saveSettings',async (event,setting_name,json)=>{
        return await store.set(setting_name,json)
    })
    ipcMain.handle('loadSettings',async (event,setting_name)=>{
        return await store.get(setting_name)
    })
    // Load the index.html of the app.
    // win.maximize()

    win.loadFile(join(__dirname, "./src/index.html"))

    // Open the DevTools.
    if (env == "development") {
        win.webContents.openDevTools()

    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// This method is equivalent to 'app.on('ready', function())'
app.whenReady().then(createWindow)
app.on("ready", () => {
    Store.initRenderer();

})
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their 
    // menu bar to stay active until the user quits 
    // explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the 
    // app when the dock icon is clicked and there are no 
    // other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file, you can include the rest of your 
// app's specific main process code. You can also 
// put them in separate files and require them here.