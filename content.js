// scrape the content of the article or paragraphs on a webpage
function scrapeArticle() {
    const articleContent = document.querySelectorAll("article, p");
    let content = '';

    articleContent.forEach(p => {
        content += p.innerText + ' ';
    });

    return content.trim();
}

// listen for messages from the popup or background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "scrapeContent") {
        const content = scrapeArticle();
        sendResponse({ content: content });
    }
})