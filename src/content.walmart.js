Walmart = {
    init: function() {
        console.log("in walmart init");
        // Get the price div for insertion of GW button.
        var $priceDiv = $(`.prod-PriceHero`).first().parent().closest("div");
        if($($priceDiv).length > 0) {
            $.ajax({
                "url": `${gw_chromeUrl}content-gl-button.html`,
                "method": "GET"
            })
            .done((html) => {
                // Insert the GiftWizIt button
                $($priceDiv[0]).before(html);
                // On click of the button
                $("div.gw-container > button").on("click", () => {
                    // Begin collecting page information
                    // Collect item name
                    var itemName = $(".prod-ProductTitle > div").first()[0].textContent;
                    // Collect url
                    var url = window.location.href;
                    // Collect the domain (base_url)
                    var domain = window.location.origin;
                    // Collect image source
                    chrome.runtime.getBackgroundPage;
                    var img = $("button.prod-hero-image-container img")[0].src;
                    console.log(`Url: ${url}, Domain: ${domain}, Image: ${img}, and Name: ${itemName}`);
                    // Send the collected data to the back-end for api call.
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
        }else {
            // Log to server, because an element wasn't found
            // TODO: Create a job that reads these flags and acts on them.
        }

        // Check to see if we've arrived here via an affiliate link from site.
        var isAffiliateLinkArrival = true;
        if(isAffiliateLinkArrival) {
            // Collect the cart button
            var cartButton = $("div.prod-product-cta-add-to-cart > button.prod-ProductCTA--primary")[0];

            // If a cart button was found.
            if(cartButton != null) {
                // Add a click handler to the cart button.
                $(cartButton).on("click", () => {
                    // Make note of it
                    $(window).on("unload", () => {
                        this.doBeacon();                        
                    });
                });
            }
        }
    },
    doBeacon: () => {
        chrome.runtime.sendMessage({
            action: "AddedToCart",
            data: {
                "item_id": 1023
            }
        })
    }
}