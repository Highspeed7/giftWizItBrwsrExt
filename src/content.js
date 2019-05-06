var gw_chromeUrl = "chrome-extension://adofnoobbeoahcnapncpcndebfcfdcbi/"
$(document).ready(() => {
    // Bootstrap init functions
    // NOTE: Indexes of the bootstrapped objects, must be in appropriate order.
    $.extend(GiftWizIt, [Amazon, Walmart]);
    var locationOrigin = location.origin;
    var partners = GiftWizIt.partnerUrls;
    var partnerFunctions = GiftWizIt.partnerUrlMetadata;
    var partnerIndex = partners.indexOf(locationOrigin);
    
    if(partnerIndex > -1) {
        // Run the given function
        partnerFunctions[partnerIndex].func(partnerIndex);
    }
})