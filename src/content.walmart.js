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
            });
        }
    }
}