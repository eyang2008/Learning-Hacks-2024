document.getElementById("summarize-btn").addEventListener("click", () => {
    chrome.tab.query({ active: true, currentWindow: true }, (tabs) => {
        // executing scripting on current tab
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: scrapeAndSummarize
        });
    });
});

async function scrapeAndSummarize() {
    // scrape content from the page
    const articleContent = document.querySelectorAll("article", "p");
    let content = '';

    articleContent.forEach(p => {
        content += p.innerText + ' ';
    });

    // summarize with ai
    const summary = await summarizeWithChatGPT(content);

    // display summary in popup
    document.getElementById("summary").innerHTML = summary;
}

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
                {"role": "user", "content": content}
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
    return data.choices[0].message.content;
}