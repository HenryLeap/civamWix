// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixData from 'wix-data';

$w.onReady(async () => {
    const results = await wixData.query("BillYellowtailphotographs")
        .limit(1000)
        .find();

    const allKeywords = new Set();
    results.items.forEach(item => {
        if (item.keywords) {
            item.keywords.forEach(kw => allKeywords.add(kw));
        }
    });

    $w('#dropdown1').options = [
        { label: 'Show All', value: 'all' },
        ...[...allKeywords].sort().map(kw => ({ label: kw, value: kw }))
    ];

    $w('#dropdown1').onChange(async () => {
        const selected = $w('#dropdown1').value;

        if (selected === 'all') {
            await $w('#dataset1').setFilter(wixData.filter());
        } else {
            await $w('#dataset1').setFilter(
                wixData.filter().hasSome("keywords", [selected])
            );
        }
    });
});