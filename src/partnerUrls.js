// NOTE: Indexes of thse objects must stay in sync.
GiftWizIt = {
    partnerUrls: [
       "https://www.amazon.com",
       "https://www.walmart.com"
    ],
    partnerUrlMetadata: [
        {
            "name": "Amazon",
            "func": (index) => {
                GiftWizIt[index].init();
            }
        },
        {
            "name": "Walmart",
            "func": (index) => {
                GiftWizIt[index].init();
            }
        }
    ]
}