const { contextBridge, ipcRenderer } = require('electron')

function on(eventName="", listener = (event="", ...args) => {}){
    ipcRenderer.on(eventName, listener)
}

function send(eventName="", ...args){
    ipcRenderer.send(eventName, ...args)
}

function invoke(eventName="", ...args){
    ipcRenderer.invoke(eventName, ...args)
}

function openPage(page="", ...args){
    ipcRenderer.send('change-page', page, ...args)
}

contextBridge.exposeInMainWorld('aplication', {
    on,
    send,
    invoke,
    openPage
})