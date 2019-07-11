GiftWizIt = {};
// Bootstrap GiftWizItObject
GiftWizIt = Object.assign(JwtHelper, Utility);

chrome.runtime.onInstalled.addListener(() => {
   // Nothing yet 
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    
    // TODO: Make a check for notifications and update the icon badge.
    if(request.action != null) {
        switch(request.action) {
            case "ItemAdded": {
                if(request.data != null) {
                    await GiftWizIt.wishList.addItem(request.data);
                    sendResponse({"message": "Item Added"});
                }else {
                    throw new Error("No data sent");
                    // TODO: Add logging
                }
                break;
            }
            case "AddedToCart": {
                GiftWizIt.wishList.sendItemBeacon("1234");
            }
        }
    }
});