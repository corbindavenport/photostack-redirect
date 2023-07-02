// This is used for downloading all saved watermarks for importing in photostack.app

const watermarksStore = localforage.createInstance({
    name: 'Watermarks',
    driver: [localforage.WEBSQL, localforage.INDEXEDDB]
})

document.getElementById('watermark-export').addEventListener('click', async function () {
    const watermarkCount = await watermarksStore.length();
    if (watermarkCount) {
        await watermarksStore.iterate(function (value, key, iterationNumber) {
            var watermarkText = JSON.stringify(value);
            var fileName = key + ".json";
            var blob = new Blob([watermarkText], { type: 'application/json;charset=utf-8' });
            saveAs(blob, fileName);
        });
    } else {
        alert('You have no watermarks saved!');
    };
});