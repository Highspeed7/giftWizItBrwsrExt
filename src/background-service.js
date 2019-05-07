GiftWizIt = {
    wishList: {
        addItem: function(itemToAdd) {
            console.log("In addItem function");
            GiftWizIt.getAuthToken((token) => {
                // Make the api call
                console.log('Token received: ' + token.access_token);
            })
        }
    },
    getAuthToken: function(callback) {
        // TODO: Make a check to see if token is expired.
        chrome.storage.sync.get("access_token", callback);
    },
    reAuthenticate: function(callback) {
        var authEndpoint = "https://login.microsoftonline.com/giftwizit.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SigninSignup1&client_id=80796ab3-282c-49cd-8d61-eb66f744e64b&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fadofnoobbeoahcnapncpcndebfcfdcbi.chromiumapp.org%2F&scope=https%3A%2F%2Fgiftwizit.onmicrosoft.com%2Fapi%2Fwrite%20https%3A%2F%2Fgiftwizit.onmicrosoft.com%2Fapi%2Fread&response_type=token&prompt=login"; 

        chrome.identity.launchWebAuthFlow({
            'url': authEndpoint,
            'interactive': true
          }, (r) => {
            var access_token = r.split("access_token=")[1].split("&")[0];
            var token_expiry = r.split("expires_in=")[1].split("&")[0];
            this.jwtHelper.storeToken(access_token, token_expiry, this.setAuthAndToken.bind(this))
          });
    }
}