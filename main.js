const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const opentype = require('opentype.js');

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  win.setMenuBarVisibility(false);
  win.loadFile('index.html');
  
  // Open DevTools for debugging
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC: Open file dialog
ipcMain.handle('open-file-dialog', async (event) => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Font Files', extensions: ['ttf', 'otf'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

// IPC: Font processing
ipcMain.handle('process-font', async (event, filePath) => {
  console.log('=== FONT PROCESSING START ===');
  console.log('Processing font:', filePath);
  
  try {
    // Read the font file
    const buffer = fs.readFileSync(filePath);
    console.log('File read successfully, size:', buffer.length, 'bytes');
    
    // Convert Node.js Buffer to ArrayBuffer for opentype.js
    const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    
    // Parse the font using opentype.js
    const font = opentype.parse(arrayBuffer);
    console.log('Font parsed successfully');
    console.log('Font family:', font.names.fontFamily.en);
    console.log('Font style:', font.names.fontSubfamily.en);
    
    // Check if font has OS/2 and hhea tables
    const os2Table = font.tables.os2;
    const hheaTable = font.tables.hhea;
    
    console.log('OS/2 table found:', !!os2Table);
    console.log('hhea table found:', !!hheaTable);
    
    if (!os2Table) {
      throw new Error('Font does not contain OS/2 table');
    }
    if (!hheaTable) {
      throw new Error('Font does not contain hhea table');
    }
    
    // Debug: Inspect hhea table structure
    console.log('hhea table properties:', Object.keys(hheaTable));
    console.log('hhea table values:', hheaTable);
    
    // Get current values - try different property names
    let originalAscender = hheaTable.ascent;
    let originalDescender = hheaTable.descent;
    
    // If undefined, try alternative property names
    if (originalAscender === undefined) {
      originalAscender = hheaTable.ascender;
    }
    if (originalDescender === undefined) {
      originalDescender = hheaTable.descender;
    }
    
    // Get OS/2 values
    const os2Ascender = os2Table.sTypoAscender;
    const os2Descender = os2Table.sTypoDescender;
    
    console.log('Current hhea values:');
    console.log('  ascender:', originalAscender);
    console.log('  descender:', originalDescender);
    console.log('OS/2 values:');
    console.log('  sTypoAscender:', os2Ascender);
    console.log('  sTypoDescender:', os2Descender);
    
    if (os2Ascender === undefined || os2Descender === undefined) {
      throw new Error('Could not find ascender/descender values in OS/2 table');
    }
    
    // Create backup before modifying
    const backupPath = filePath + '.backup';
    fs.copyFileSync(filePath, backupPath);
    console.log('Backup created:', backupPath);
    
    // Update hhea table values
    hheaTable.ascent = os2Ascender;
    hheaTable.descent = os2Descender; // Both use the same sign convention
    
    console.log('Updated hhea values:');
    console.log('  ascender:', hheaTable.ascent, '(was:', originalAscender, ')');
    console.log('  descender:', hheaTable.descent, '(was:', originalDescender, ')');
    
    // Create fixed file path with .fixed suffix
    const pathInfo = path.parse(filePath);
    const fixedFilePath = path.join(pathInfo.dir, `${pathInfo.name}.fixed${pathInfo.ext}`);
    
    // Write the modified font to the fixed file
    const modifiedArrayBuffer = font.toArrayBuffer();
    const modifiedBuffer = Buffer.from(modifiedArrayBuffer);
    fs.writeFileSync(fixedFilePath, modifiedBuffer);
    console.log('Fixed font file created:', fixedFilePath);
    
    console.log('=== FONT PROCESSING END ===');
    return { 
      success: true, 
      message: `Font fixed successfully! Ascender: ${originalAscender}→${hheaTable.ascent}, Descender: ${originalDescender}→${hheaTable.descender}. Backup saved as ${path.basename(backupPath)}. Fixed font saved as ${path.basename(fixedFilePath)}.` 
    };
    
  } catch (e) {
    console.error('Error processing font:', e);
    return { success: false, message: e.message };
  }
}); 