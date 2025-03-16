document.getElementById("check-news").addEventListener("click", () => {
    document.getElementById("status").textContent = "Authenticating...";
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          function: extractText,
        },
        (results) => {
          if (results && results[0] && results[0].result) {
            const articleText = results[0].result;
            fetchNewsVerification(articleText);
          } else {
            document.getElementById("status").textContent = "Failed to extract article.";
          }
        }
      );
    });
  });
  
  function fetchNewsVerification(text) {
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "***Enter your CHATGPT API Key***"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "system", content: "Give me the reliability score of the given content between 1-10 in floating data typegit: " + text }],
        max_tokens: 100
      })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById("status").textContent = data.choices[0].message.content || "No response from API";
    })
    .catch(error => {
      console.error(error);
      document.getElementById("status").textContent = "Error checking article.";
    });
  }
  
  function extractText() {
    return document.body.innerText;
  }
  