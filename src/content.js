var gw_chromeUrl = "chrome-extension://adofnoobbeoahcnapncpcndebfcfdcbi/"
$(document).ready(() => {
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
        });
    }
})