export class JwtHelper {
    private token = null;

    public storeToken(token, token_expiry, callback: () => any) {
        this.token = token;
        chrome.storage.sync.set({"access_token" : token}, () => {
          this.storeTokenExpiry(token_expiry, callback);  
        });
    }

    public getStorageToken(callback: (doLogin: boolean, token?: any) => any) {
        // Attempt to get token from storage
        chrome.storage.sync.get("access_token", (token) => {
            var ac_token = token.access_token;
            // If the token doesn't exist
            if(ac_token == null) {
                // Return for login.
                callback(true);
            }
            else {
                // Else (if the token does exist)
                // Get token expiry time
                // TODO: Enforce a model for expTime object.
                chrome.storage.sync.get("expiry_time", (v) => {
                    var currTime = (Date.now()/1000);
                    var tokenExpiresAt: number = v.expiry_time.tokenExpiresAt;

                    // If the compared value is greater than tokenValidFor
                    if((currTime > tokenExpiresAt)){
                        // Return for login.
                        callback(true);
                    }else {
                        // Execute call back setting the token and authSource sub.
                        callback(false, ac_token);
                    }
                });
            }
        })
    }

    private storeTokenExpiry(token_expiry, callback: (token: any) => any) {
        // Get the current epoch time and add the appropriate seconds to it.
        var currTime = Math.floor(((Date.now()/1000) - 2));
        // Store the expiry time as an epoch time for easy comparison later.
        var expTime = currTime + parseInt(token_expiry, 10);
        chrome.storage.sync.set({"expiry_time": {
            "tokenValidFor": token_expiry,
            "tokenExpiresAt": expTime
        }}, callback(this.token));
    }
}