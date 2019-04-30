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

var apiToken = null;
var isAuth = false;

var getApiToken = function(){
    return apiToken;
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeContent.onPageChanged.removeRules([], () => {
        chrome.declarativeContent.onPageChanged.addRules([
            showPageActionRule
        ]);
    });
});

var checkAuth = function() {
    chrome.storage.sync.get('access_token', (res) => {
        apiToken = res.access_token;
        isAuth = true;
    });
}