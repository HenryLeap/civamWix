import wixData from 'wix-data';
import wixLocation from 'wix-location';

const ITEMS_PER_PAGE = 9;
let allItems = [];

$w.onReady(async () => {
    const { keyword } = wixLocation.query;

    if (!keyword) {
        $w('#keywordTitle').text = 'No keyword selected.';
        return;
    }

    const decoded = decodeURIComponent(keyword);
    $w('#keywordTitle').text = `Results for: ${decoded}`;

    const results = await wixData.query("BillYellowtailphotographs")
        .hasSome("keywords", [decoded])
        .limit(1000)
        .find();

    if (results.items.length === 0) {
        $w('#keywordTitle').text = `No results found for: ${decoded}`;
        return;
    }

    allItems = results.items;
    console.log("Total items found:", allItems.length);
    console.log("Items without images:", allItems.filter(item => !item.image).length);

    const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);
    $w('#pagination1').totalPages = totalPages;
    $w('#pagination1').currentPage = 1; // ← force start on page 1

    renderPage(1);

    $w('#pagination1').onChange((event) => {
        renderPage(event.target.currentPage);
    });
});

function renderPage(page) {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = Math.min(start + ITEMS_PER_PAGE, allItems.length); // ← prevents going over
    const pageItems = allItems.slice(start, end);

    const galleryItems = pageItems.map(item => ({
        type: "Image",
        src: item.image,
        title: item.title,
        alt: item.title,
        link: item.videos && item.videos.length > 0
            ? item["link-bill-yellowtail-photographs-title"]
            : item["link-copy-of-bill-yellowtail-photographs-title"]
    }));

    $w('#gallery1').items = galleryItems;
}