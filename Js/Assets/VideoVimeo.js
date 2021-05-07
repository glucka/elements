document.querySelectorAll('.frame-type-mask_videovimeo > div > button').forEach(function (videoVimeoButton) {
    videoVimeoButton.addEventListener('click', function () {
        videoVimeoButton.style.display = 'none';
        videoVimeoButton.parentElement.innerHTML = '<iframe src="https://player.vimeo.com/video/' + videoVimeoButton.parentElement.getAttribute('data-vimeoid') + '?autoplay=1&title=0&byline=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    });
});