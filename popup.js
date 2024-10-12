document.getElementById("summarize-btn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
            console.error("No active tabs found");
            return;
        }
        console.log("Active tab ID:", tabs[0].id);
        chrome.scripting.executeScript({
            target: {
                tabId: tabs[0].id,
            },
            function: sendData
        });
    });
});

const sendData = async () => {
    chrome.runtime.sendMessage({ action: "scrapeContent" }, function(response) {
        console.log("Received response from content script:", response); // Log the response
        if (chrome.runtime.lastError) {
            console.error("Runtime error:", chrome.runtime.lastError);
            document.getElementById('summary').textContent = "Error: " + chrome.runtime.lastError.message;
            return;
        }
        if (response && response.content) {
            document.getElementById('summary').textContent = response.content; // Display scraped content
        } else {
            document.getElementById('summary').textContent = "Failed to scrape content.";
        }
    });
}

/*
async function summarizeWithChatGPT(content) {
    const response = await fetch('https://chatgpt-42.p.rapidapi.com/conversationgpt4-2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
            'x-rapidapi-key': '9ce4fb5d5amshb768dd74c7e918ep1bf45cjsn48b2be24ab28'
        },
        body: JSON.stringify({
            messages: [
                { "role": "user", "content": content }
            ],
            system_prompt: "", 
            temperature: 0.9, 
            top_k: 5,
            top_p: 0.9,
            max_tokens: 256,
            web_access: false
        })
    });

    const data = await response.json();
    console.log(data); // Log the full response for debugging

    if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;
    } else {
        throw new Error("No choices returned from API");
    }
}*/