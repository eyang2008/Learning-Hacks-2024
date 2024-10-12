chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "scrapeContent") {
        chrome.scripting.executeScript({
            target: {tabId: sender.tab.id},
            function: scrapeArticle
        }, (results) => {
            sendResponse({content: results[0].result});
        });
    }
    return true;
});