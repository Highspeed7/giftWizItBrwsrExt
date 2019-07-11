Utility = {
    wishList: {
        sendItemBeacon: async function(itm_id) {
            // var apiEndpoint = "https://giftwizitapi.azurewebsites.net/api/GiftListItems/Purchase";
            var apiEndpoint = "https://localhost:44327/api/GiftListItems/Purchase";
            await GiftWizIt.getAuthToken().then((token) => {
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": `${apiEndpoint}?item_id=${itm_id}`,
                    "method": "GET",
                    "headers": {
                    "authorization": `bearer ${token}`,
                    "content-type": "application/json",
                    "cache-control": "no-cache"
                    },
                    "processData": false
                };
                $.ajax(settings).done(function(response) {
                    console.log(response);
                });
            });
        },
        addItem: async function(itemToAdd) {
            // var apiEndpoint = "https://giftwizitapi.azurewebsites.net/api/Items";
            var apiEndpoint = "https://localhost:44327/api/Items";
            console.log("In addItem function");
            await GiftWizIt.getAuthToken().then((token) => {
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": apiEndpoint,
                    "method": "POST",
                    "headers": {
                      "authorization": `bearer ${token}`,
                      "content-type": "application/json",
                      "cache-control": "no-cache"
                    },
                    "processData": false,
                    "data": JSON.stringify(itemToAdd)
                  }
                  
                  $.ajax(settings).done(function (response) {
                    console.log(response);
                  });
            });
        }
    },
    getAuthToken: async function() {
        return new Promise(resolve => {
            GiftWizIt.checkTokenExpiry((doLogin) => {
                if(doLogin) {
                    GiftWizIt.reAuthenticate((token) => {
                        resolve(token);
                    });
                }else {
                    chrome.storage.sync.get("access_token", (token) => {
                        resolve(token.access_token);
                    });
                }
            });   
        })
    },
    reAuthenticate: function(callback, user_interact = false) {
        var access_token;
        var token_expiry;
        var authEndpoint = "https://login.microsoftonline.com/giftwizit.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SigninSignup1&client_id=80796ab3-282c-49cd-8d61-eb66f744e64b&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fadofnoobbeoahcnapncpcndebfcfdcbi.chromiumapp.org%2F&scope=https%3A%2F%2Fgiftwizit.onmicrosoft.com%2Fapi%2Fwrite%20https%3A%2F%2Fgiftwizit.onmicrosoft.com%2Fapi%2Fread&response_type=token"; 
        chrome.identity.launchWebAuthFlow({
            'url': authEndpoint,
            'interactive': user_interact
        }, (r) => {
                if(chrome.runtime.lastError != null){
                    if(chrome.runtime.lastError.message === "User interaction required.") {
                        this.reAuthenticate((token) => {
                            // Here we just do the callback, because everything else has been taken care of.
                            callback(token);
                        }, true);
                    }
                }else {
                    access_token = r.split("access_token=")[1].split("&")[0];
                    token_expiry = r.split("expires_in=")[1].split("&")[0];
                    GiftWizIt.storeAuthToken(access_token, token_expiry, (token) => {
                        callback(token);
                    });
                }
            }
        );
    },
    checkTokenExpiry: function (callback) {
        var isExpired = false;
        chrome.storage.sync.get("expiry_time", (expTimes) => {
            var currTime = (Date.now()/1000);
            if(expTimes.expiry_time == null) {
                callback(true);
            }else {
                var tokenExpiresAt = expTimes.expiry_time.tokenExpiresAt;

                // If the compared value is greater than tokenValidFor
                if((currTime > tokenExpiresAt)){
                    // Return for login.
                    callback(true);
                }else {
                    // Execute call back setting the token and authSource sub.
                    callback(false);
                }
            }
        });
    },
    storeAuthToken: function(token, token_expiry, callback) {
        chrome.storage.sync.set({"access_token": token}, () => {
            GiftWizIt.storeTokenExpiry(token, token_expiry, callback);    
        })
    },
    storeTokenExpiry: function(token, token_expiry, callback) {
        // Get the current epoch time and add the appropriate seconds to it.
        var currTime = Math.floor(((Date.now()/1000) - 2));
        // Store the expiry time as an epoch time for easy comparison later.
        var expTime = currTime + parseInt(token_expiry, 10);
        chrome.storage.sync.set({"expiry_time": {
            "tokenValidFor": token_expiry,
            "tokenExpiresAt": expTime
        }}, callback(token));
    }
}