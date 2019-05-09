chrome.runtime.onInstalled.addListener(() => {
    GiftWizIt = {};
    // Bootstrap GiftWizItObject
    GiftWizIt = Object.assign(JwtHelper, Utility);
    // TODO: Make a check for notifications and update the icon badge.
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if(request.action != null) {
            switch(request.action) {
                case "ItemAdded": {
                    if(request.data != null) {
                        GiftWizIt.wishList.addItem(request.data);
                    }else {
                        throw new Error("No data sent");
                        // TODO: Add logging
                    }
                    break;
                }
            }
        }
    });
});