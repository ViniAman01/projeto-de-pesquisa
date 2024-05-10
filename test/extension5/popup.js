
document.getElementById("getHtmlButton").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      function: getHTML,
    });
  });
});

function getHTML() {
  const html = document.documentElement.outerHTML;
  console.log(html);
}
