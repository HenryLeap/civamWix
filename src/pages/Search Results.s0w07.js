import wixData from 'wix-data';
import wixLocation from 'wix-location';

async function searchItems(query) {
    if (!query) {
        $w('#repeater1').data = [];
        return;
    }

    $w('#input1').value = query;

    const search = wixData.query('BillYellowtailphotographs')
        .contains('heritageItem', query)
        .or(wixData.query('BillYellowtailphotographs').contains('description', query))
        .or(wixData.query('BillYellowtailphotographs').contains('keywords', query))
        .or(wixData.query('BillYellowtailphotographs').contains('creator', query))
        .or(wixData.query('BillYellowtailphotographs').contains('cultureOrCommunity', query))
        .or(wixData.query('BillYellowtailphotographs').contains('dateOfCreation', query));

    const results = await search.limit(24).find();

    $w('#repeater1').data = results.items;
}

function setupRepeater() {
    $w('#repeater1').onItemReady(($item, itemData) => {
        const title =
            itemData.title ||
            itemData.heritageItem ||
            itemData["Heritage Item"] ||
            'Untitled Item';

        const rawDesc =
            itemData.description ||
            itemData.physicalDetails ||
            itemData.cultureOrCommunity ||
            '';

        const cleanDesc = String(rawDesc)
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .trim();

        $item('#text6').text = title;

        $item('#text5').text = cleanDesc
            ? cleanDesc.slice(0, 100) + '...'
            : 'No description available.';

        if (itemData.image) {
            $item('#container1').background.src = itemData.image;
        }

        $item('#container1').onClick(() => {
            const link = itemData["link-items-1-title"];
            if (link) {
                wixLocation.to(link);
            }
        });
    });
}

function runSearchFromResultsPage() {
    const query = $w('#input1').value.trim();

    if (query.length > 0) {
        searchItems(query);
    }
}

$w.onReady(function () {
    setupRepeater();

    const initialQuery = wixLocation.query.query;
    searchItems(initialQuery);

    $w('#button9').onClick(() => {
        runSearchFromResultsPage();
    });

    $w('#input1').onKeyPress((event) => {
        if (event.key === 'Enter') {
            runSearchFromResultsPage();
        }
    });
});