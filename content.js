chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "scrapeContent") {
        console.log("Received message to scrape content");

        // Scrape content
        const articleContainer = document.getElementById("bodyContent");
        const paragraphs = articleContainer ? articleContainer.querySelectorAll("p") : [];
        let content = '';

        paragraphs.forEach(p => {
            content += p.innerText + ' ';
        });

        // Trim whitespace and send the response back to popup
        sendResponse({ content: content.trim() });
    }
});