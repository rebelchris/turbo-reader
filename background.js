const turboMode = () => {
    const paragraphs = document.getElementsByTagName('p');
    const isTurboMode = document.body.classList.contains('trms');
    for(const paragraph of paragraphs) {
        if(isTurboMode) {
            paragraph.innerText = paragraph.innerText;
        } else {
            paragraph.innerHTML = paragraph.innerText.split(' ').map((word) => {
                const length = word.replace(/[^a-zA-Z0-9]+$/, '').length
                const boldedLength = length === 1 ? 1 : Math.floor(length / 2)
                return `<strong className="trms">${word.substring(0, boldedLength)}</strong>${word.substring(boldedLength)}`
            }).join(' ');
        }
    }

    isTurboMode ? document.body.classList.remove('trms') : document.body.classList.add('trms');
}

chrome.action.onClicked.addListener(async () => {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: turboMode
    });
});
