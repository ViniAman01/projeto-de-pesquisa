document.getElementById('startBtn').addEventListener('click',async () => {
    console.log(await chrome.storage.sync.get(['teste']));
});