function onYouTubeIframeAPIReady() {
    window.youtubeready = true;
}

function playVideo(videoYoutube) {

    var youtubeDivId = videoYoutube.getAttribute('id');
    var youtubeId = videoYoutube.getAttribute('data-youtubeid');
    var mute = videoYoutube.getAttribute('data-mute');
    var loop = videoYoutube.getAttribute('data-loop');

    document.getElementById(youtubeDivId).style.background = 'black';

    if (!window.youtubeReady && !window.youtubeApiload) {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/player_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.youtubeApiload = true;
        window.youtubeInterval = setInterval(function () {
            playVideo(videoYoutube);
        }, 50)

    }

    if (window.youtubeready) {
        clearInterval(window.youtubeInterval);

        new YT.Player(youtubeDivId, {
            host: 'https://www.youtube-nocookie.com',
            videoId: youtubeId,
            playerVars: {
                playlist: youtubeId,
                wmode: 'transparent',
                autohide: 1,
                rel: 0,
                loop: loop,
                modestbranding: 1,
                playsinline: 1,
            },
            events: {
                'onReady': function (e) {
                    e.target.playVideo();
                    if (mute == 1) {
                        e.target.mute();
                    }
                }
            }
        });
    }

}

document.querySelectorAll('.frame-type-mask_videoyoutube [data-youtubeid]').forEach(function (videoYoutube) {
    videoYoutube.firstChild.addEventListener('click', function () {
        playVideo(videoYoutube);
    });
    if (videoYoutube.getAttribute('data-autoplay') == 1) {
        playVideo(videoYoutube);
    }
});