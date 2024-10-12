/*chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message.action);
    if (message.action === "scrapeContent") {
        console.log("hihi");
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            function: scrapeArticle
        }, (results) => {
            //console.log("Results from content script:", results); // Log the results
            //console.log(results[0].result);
            sendResponse({ response: results[0].result });
        });
    }
    return true; // Keep the message channel open for asynchronous response
});

function scrapeArticle() {
    console.log("scrape article");
    const articleContainer = document.getElementById("bodyContent"); // Select the container
    const articleContent = articleContainer.querySelectorAll("p"); // Get all <p> tags within the container
    let content = '';

    articleContent.forEach(p => {
        content += p.innerText + ' '; // Append each paragraph's text
    });

    return content.trim(); // Trim any extra whitespace
}*/