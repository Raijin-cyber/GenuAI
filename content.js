(() => {
    function getArticleText() {
      return document.body.innerText;
    }
    
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "extract_text") {
        sendResponse({ text: getArticleText() });
      }
    });
  })();
  