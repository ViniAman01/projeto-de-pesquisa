fetch(chrome.runtime.getURL('/modal.html')).then(r => r.text()).then(html => {
  document.body.insertAdjacentHTML('beforeend', html);
});

console.log("Modal ativada!")
