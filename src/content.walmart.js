Walmart = {
    init: function() {
        var $priceDiv = $("div.prod-PriceHero").parent().closest("div");
        if($($priceDiv).length > 0) {
            $.ajax({
                "url": `${gw_chromeUrl}content-gl-button.html`,
                "method": "GET"
            })
            .done((html) => {
                $($priceDiv[0]).before(html);
                $("div.gw-container > button").on("click", () => {
                    chrome.runtime.sendMessage({action: "ItemAdded"}, (res) => {
                        alert("Background responded with: " + res.message);
                    });
                });
            });
        }
    },
}