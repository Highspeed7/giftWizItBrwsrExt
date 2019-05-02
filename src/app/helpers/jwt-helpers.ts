export class JwtHelper {
    public storeTokenExpiry(token_expiry, callback: () => any) {
        // Get the current epoch time and add the appropriate seconds to it.
        // Store the expiry time as an epoch time for easy comparison later.
    }

    public storeToken(token, callback: (token: any) => any) {
        chrome.storage.sync.set({"access_token" : token}, callback(token));
    }
}