Amazon = {
    init: function() {
        var $priceDiv = $("div#price");
        if($($priceDiv).length > 0) {
            // Add gw item before div
            // Bring in html
            $.ajax({
                "url": `${gw_chromeUrl}content-gl-button.html`,
                "method": "GET"
            })
            .done((html) => {
                $($priceDiv[0]).before(html);
                $(".a-button-inner").on("click", () => {
                    var btnAddOnce = false;
                    // Set a timeout to check for the button,
                    // If it's missing, add it once.
                    var interval = setInterval(() => {
                        var $gw_btn = $("div.gw-container");
                        if($($gw_btn).length == 0 || $($gw_btn) == null) {
                            $("div#price").before(html);
                            clearInterval(interval);
                        }
                    }, 100);
                });

                $("div.gw-container > button").on("click", () => {
                    // Begin collectiong page information
                    // Collect item name
                    var itemName = $("span#productTitle")[0].textContent.trim();

                    // Collect url
                    var url = window.location.href;

                    // Collect the domain (base_url)
                    var domain = window.location.origin;

                    // Collect image source
                    var img = $("img#landingImage")[0].src;

                    // Send the collected data to the background for api call.
                    chrome.runtime.sendMessage({
                        action: "ItemAdded",
                        data: {
                            "name": itemName,
                            "url": url,
                            "domain": domain,
                            "image": img
                        }
                    }, (res) => {
                        alert("Background responded with: " + res.message);
                    });
                });
            });
        }
    }
}