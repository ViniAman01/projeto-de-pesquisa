async function fetchHTML() {
  const modal_existente_html = document.getElementById("modal-html");
  if(modal_existente_html){
    modal_existente_html.remove();
  }
  let modal_nova_html = await fetch(chrome.runtime.getURL("modal.html"));
  modal_nova_html = await modal_nova_html.text();
  document.body.insertAdjacentHTML('beforeend', modal_nova_html);
}

document.getElementById("bt-coletar").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
      const activeTab = tabs[0];

      await chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        files: ["content.js"],
      });

      await chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        func: fetchHTML,
      });

      await chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        files: ["modal.js"],
      });
  })
});

function abrirModal(){
  const modal = document.getElementById("modal");
  if(modal){
    modal.showModal();
  }
}

document.getElementById("bt-abrir-modal").addEventListener("click", function() {
  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    const activeTab = tabs[0];

    await chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      func: abrirModal,
    });
  });
});
