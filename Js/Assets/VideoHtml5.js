document.querySelectorAll('.frame-type-mask_videohtml5').forEach(function (videoEl) {
    videoEl.querySelector('button').addEventListener('click', function () {
        videoEl.querySelector('video').style.opacity = 1;
        videoEl.querySelector('video').play();
        videoEl.querySelector('button').style.display = 'none';
    });
    if (videoEl.querySelector('video').hasAttribute('autoplay')) {
        videoEl.querySelector('button').click();
    }
});