window.addEventListener('DOMContentLoaded', () => {
    const elNodeVersion = document.getElementById('node-version')
    elNodeVersion.innerText = process.versions['node'];
  
    document.getElementById('chrome-version').innerText=process.versions['chrome'];
    document.getElementById('electron-version').innerText=process.versions['electron'];
  })