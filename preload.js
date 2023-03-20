const { contextBridge, shell, dialog } = require("electron");
const { platform, cpus, totalmem } = require("os")
const { ipcRenderer } = require('electron');
const Store = require('electron-store');



const store = new Store({
    name: 'settings', // the name of the store file
    defaults: { // the default values of the store
        key: 'value',
        anotherKey: 'another value'
    }
});


const API = {
    "cpus": cpus(),
    "getMemory": () => totalmem(),
    "selectFolder": () => ipcRenderer.invoke('dialog:openDirectory'),
    "saveSettings" : (setting_name,json) => ipcRenderer.invoke('saveSettings',setting_name,json),
    "loadSettings" : (setting_name) => ipcRenderer.invoke('loadSettings',setting_name),

}
// window.api; to access in the render process
contextBridge.exposeInMainWorld("api", API)


console.log()
