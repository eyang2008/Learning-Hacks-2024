// Scrape the content of the article or paragraphs within the bodyContent div
function scrapeArticle() {
    const articleContainer = document.getElementById("bodyContent"); // Select the container
    const articleContent = articleContainer.querySelectorAll("p"); // Get all <p> tags within the container
    let content = '';

    articleContent.forEach(p => {
        content += p.innerText + ' '; // Append each paragraph's text
    });

    return content.trim(); // Trim any extra whitespace
}

console.log('Content script loaded!');

// Listen for messages from the popup
chrome.runtime.onInstalled.addListener((request, sender, sendResponse) => {
    console.log("request action: ", request.action);
    if (request.action === "scrapeContent") {
        const scrapedContent = scrapeArticle(); // Call the scrapeArticle function
        console.log("Scraped content:", scrapedContent); // Log the scraped content for debugging
        sendResponse({ content: scrapedContent });
    }
});