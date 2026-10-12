// The code in this file will load on every page of your site

import wixLocation from 'wix-location';

function runSearch() {
    const query = $w('#input1').value.trim();

    if (query.length > 0) {
        wixLocation.to(`/search-results?query=${encodeURIComponent(query)}`);
    }
}

$w.onReady(function () {
    if (wixLocation.path[0] === 'search-results') {
        return;
    }

    $w('#button9').onClick(() => {
        runSearch();
    });

    $w('#input1').onKeyPress((event) => {
        if (event.key === 'Enter') {
            runSearch();
        }
    });
});