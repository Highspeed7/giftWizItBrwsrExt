Walmart = {
    init: function() {
        var $priceDiv = $(`.prod-PriceHero`).first().parent().closest("div");
        if($($priceDiv).length > 0) {
            $.ajax({
                "url": `${gw_chromeUrl}content-gl-button.html`,
                "method": "GET"
            })
            .done((html) => {
                $($priceDiv[0]).before(html);
                $("div.gw-container > button").on("click", () => {
                    // Begin collecting page information
                    // Collect item name
                    var itemName = $(".prod-ProductTitle > div").first()[0].textContent;
                    // Collect url
                    var url = window.location.href;
                    // Collect the domain (base_url)
                    var domain = window.location.origin;
                    // Collect image source
                    var img = $("button.prod-hero-image-container img")[0].src;
                    console.log(`Url: ${url}, Domain: ${domain}, Image: ${img}, and Name: ${itemName}`);
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