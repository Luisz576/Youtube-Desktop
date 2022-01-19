const { resolve } = require('path')
const { app, BrowserWindow, Menu, globalShortcut, ipcMain } = require('electron')
const { develop_mode_enable } = require('./configs.json')

let win = null

// Functions
ipcMain.on('change-page', (event, ...args) => {
    if(win !== null){
        win.webContents.loadFile(resolve(__dirname, '..', 'screen', args[0])).then(() => {
            const newArgs = args
            newArgs.shift()
            win.webContents.send('open-page', newArgs)
        })
    }
})

// Menu builder
function _changeTheme(theme){
    if(win !== null)
        win.webContents.send('theme-change', theme)
}

function _reloadWin(){
    if(win !== null)
        win.reload()
}

function _buildMenu(){
    const mainMenu = []
    // DEFAULT
    mainMenu.push({
        label: 'Tema',
        submenu: [
            {
                label: 'Claro',
                type: 'radio',
                checked: true,
                click: () => _changeTheme(0)
            },
            {
                label: 'Escuro',
                type: 'radio',
                click: () => _changeTheme(1)
            }
        ]
    })
    // DEVELOP MODE
    if(develop_mode_enable){
        mainMenu.push({
            label: 'Recarregar',
            click: () => _reloadWin()
        })
        // TEMP
        mainMenu.push({
            label: 'Console',
            click: () => {
                if(win !== null)
                    win.webContents.openDevTools()
            }
        })
    }

    Menu.setApplicationMenu(Menu.buildFromTemplate(mainMenu))
}

// Aplicaiton Builder
function createAplication(){
    // Aplication
    win = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Youtube Desktop',
        resizable: false,
        icon: resolve(__dirname, '..', 'img', 'icon.png'),
        webPreferences: {
            preload: resolve(__dirname, '..', 'js', 'connection', 'preload.js')
        }
    })
    win.loadFile(resolve(__dirname, '..', 'screen', 'index.html'))
    _buildMenu()
    globalShortcut.register('CommandOrControl+R', _reloadWin)
    _changeTheme(0)
}

app.on('ready', createAplication)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})