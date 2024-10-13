document.getElementById("summarize-btn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
            console.error("No active tabs found");
            return;
        }

        // Send message to the content script to scrape the content
        chrome.tabs.sendMessage(tabs[0].id, { action: "scrapeContent" }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Error sending message:", chrome.runtime.lastError.message);
            } else {
                // Log the response from content script
                console.log("Response from content script:", response);

                // Update popup HTML with the scraped content
                if (response && response.content) {
                    var result = summarizeWithChatGPT(response.content);
                    result.then(function(summary) {
                        console.log("GPT SUMMARY: ", summary);
                        document.getElementById('summary').textContent = summary;
                    });
                } else {
                    document.getElementById('summary').textContent = "Failed to scrape content.";
                }
            }
        });
    });
});

async function summarizeWithChatGPT(content) {
    const apiKey = '';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: `Summarize the following text as much as possible and try to complete the summary (no hanging sentences): ${content}` }],
                max_tokens: 100
            })
        });

        const result = await response.json();
        const summary = result.choices[0].message.content;
        console.log("Summary: ", summary);
        return summary;
    } catch (error) {
        console.error("Error summarizing content:", error);
        return "Error summarizing content.";
    }
}