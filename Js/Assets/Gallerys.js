document.querySelectorAll('.frame-type-mask_gallerys .gallery').forEach(function (gallery) {
    gallery.addEventListener('click', function (e) {
        var id = gallery.getAttribute('data-uid');

        lightGallery(gallery, {
            dynamic: true,
            dynamicEl: window['elements_' + id],
            zoom: 0,
            hash: 0,
            download: 0,
            autoplay: 0,
            autoplayControls: 0,
            controls: 1,
            counter: 0,
            thumbWidth: 150,
            addClass: 'lgbig',
            share: false
        });
    });
});