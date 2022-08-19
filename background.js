const turboMode = () => {
    const paragraphs = document.getElementsByTagName('p');
    const isTurboMode = document.body.classList.contains('trms');
    for(const paragraph of paragraphs) {
        if(isTurboMode) {
            paragraph.innerText = paragraph.innerText;
        } else {
            paragraph.innerHTML = paragraph.innerText.split(' ').map((word) => {
                const length = word.replace(/[^a-zA-Z0-9]+$/, '').length
                const boldLength = length === 1 ? 1 : Math.floor(length / 2)
                return `<strong>${word.substring(0, boldLength)}</strong>${word.substring(boldLength)}`
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
