var showPageActionRule = {
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {urlMatches: '[a-zA-Z]*://[a-zA-Z]*.amazon.com/[a-zA-Z0-9?&=/]*'}
        }),
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {urlMatches: '[a-zA-Z]*://[a-zA-Z]*.walmart.com/[a-zA-Z0-9?&=/]*'}
        })
    ],
    actions: [
        new chrome.declarativeContent.ShowPageAction()
    ]
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeContent.onPageChanged.removeRules([], () => {
        chrome.declarativeContent.onPageChanged.addRules([
            showPageActionRule
        ]);
    });
});