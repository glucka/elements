document.querySelectorAll('.frame-type-mask_albumscategorized').forEach(function (albums) {

    albums.querySelectorAll('.tabs > div').forEach(function (tab) {
        tab.addEventListener('click', function () {
            var uid = this.getAttribute('data-uid');
            albums.querySelector('select').value = uid;

            albums.querySelectorAll('.tabs > div').forEach(function (tab) {
                tab.classList.remove('act');
            });

            tab.classList.add('act');
            document.querySelectorAll('.frame-type-mask_albumscategorized > .contents > a').forEach(function (image) {
                if (uid == 0) {
                    image.classList.add('show');
                } else {
                    if (image.getAttribute('data-uid') == uid) {
                        image.classList.add('show');
                    } else {
                        image.classList.remove('show');
                    }
                }
            });
        });
    });

    albums.querySelector('select').addEventListener('change', function (e) {
        var uid = this.value;
        albums.querySelectorAll('.tabs > div').forEach(function (tab) {
            if (tab.getAttribute('data-uid') == uid) {
                tab.click();
            }
        });
    })


});

lightGallery(document.querySelector('.frame-type-mask_albumscategorized .contents'), {
    zoom: 0,
    thumbnail: 0,
    hash: 0,
    download: 0,
    autoplay: 0,
    share: 0,
    autoplayControls: 0
});

if (document.querySelector('.frame-type-mask_albumscategorized')) {
    document.querySelector('.frame-type-mask_albumscategorized .tabs > div').click();
}


