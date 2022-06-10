const { app, BrowserWindow } = require('electron')
// include the Node.js 'path' module at the top of your file
const path = require('path')


// modify your existing createWindow() function
const createWindow = () => {
    const win = new BrowserWindow({
      width: 810,
      height: 510,
      useContentSize: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
    win.setResizable(false)
    win.loadFile('index.html')
  }
  // ...
app.whenReady().then(() => {
    createWindow()
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})