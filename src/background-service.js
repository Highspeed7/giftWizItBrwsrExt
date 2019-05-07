Utility = {
    wishList: {
        addItem: async function(itemToAdd) {
            var access_token = null;
            console.log("In addItem function");
            await GiftWizIt.getAuthToken().then((token) => {
                access_token = token;
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
    reAuthenticate: function(callback) {
        var authEndpoint = "https://login.microsoftonline.com/giftwizit.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SigninSignup1&client_id=80796ab3-282c-49cd-8d61-eb66f744e64b&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fadofnoobbeoahcnapncpcndebfcfdcbi.chromiumapp.org%2F&scope=https%3A%2F%2Fgiftwizit.onmicrosoft.com%2Fapi%2Fwrite%20https%3A%2F%2Fgiftwizit.onmicrosoft.com%2Fapi%2Fread&response_type=token&prompt=login"; 
        chrome.identity.launchWebAuthFlow({
            'url': authEndpoint,
            'interactive': true
        }, (r) => {
            var access_token = r.split("access_token=")[1].split("&")[0];
            var token_expiry = r.split("expires_in=")[1].split("&")[0];
            GiftWizIt.storeAuthToken(access_token, token_expiry, (token) => {
                callback(token);
            })
        });
    },
    checkTokenExpiry: function (callback) {
        var isExpired = false;
        chrome.storage.sync.get("expiry_time", (expTimes) => {
            var currTime = (Date.now()/1000);
            var tokenExpiresAt = expTimes.expiry_time.tokenExpiresAt;

            // If the compared value is greater than tokenValidFor
            if((currTime > tokenExpiresAt)){
                // Return for login.
                callback(true);
            }else {
                // Execute call back setting the token and authSource sub.
                callback(false);
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