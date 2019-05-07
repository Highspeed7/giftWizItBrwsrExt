chrome.runtime.onInstalled.addListener(() => {
    GiftWizIt = {};
    // Bootstrap GiftWizItObject
    GiftWizIt = Object.assign(JwtHelper, Utility);
    // TODO: Make a check for notifications and update the icon badge.
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if(request.action != null) {
            switch(request.action) {
                case "ItemAdded": {
                    GiftWizIt.wishList.addItem({"test": "testing"});
                    break;
                }
            }
        }
    });
});