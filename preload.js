const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('fontAPI', {
  processFont: (filePath) => ipcRenderer.invoke('process-font', filePath),
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog')
}); 