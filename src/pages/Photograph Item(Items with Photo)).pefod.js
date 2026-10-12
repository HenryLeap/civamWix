// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import wixLocation from 'wix-location';

$w.onReady(() => {
    $w('#dynamicDataset').onReady(() => { // replace #dynamicDataset with your dataset ID
        const item = $w('#dynamicDataset').getCurrentItem();
        const keywords = item.keywords; // replace 'keywords' with your field key

        if (keywords && keywords.length > 0) {
            $w('#keywordRepeater').data = keywords.map((kw, i) => ({
                _id: String(i),
                keyword: kw
            }));

            $w('#keywordRepeater').onItemReady(($item, itemData) => {
                $item('#keywordText').text = itemData.keyword;

                $item('#keywordText').onClick(() => {
                    wixLocation.to(
                        `/keyword-results?keyword=${encodeURIComponent(itemData.keyword)}`
                    );
                });
            });
        }
    });
});