var is = {};

function detectBrowser() {

    is['ios'] = (/iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) && !window.MSStream;
    is['edge'] = window.navigator.userAgent.toLowerCase().indexOf("edge") > -1;
    is['msie'] = window.navigator.userAgent.toLowerCase().indexOf("trident") > -1;
    is['firefox'] = window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

    for (var el in is) {
        if (is[el]) {
            document.body.classList.add(el);
        }
    }
}


function detectViewport() {

    document.body.classList.remove('xs','sm','smd','md','lg','portrait','landscape');

    is['xs'] = window.innerWidth < 768;
    is['sm'] = 768 <= window.innerWidth && window.innerWidth < 980;
    is['smd'] = 980 <= window.innerWidth && window.innerWidth < 1280;
    is['md'] = 1280 <= window.innerWidth && window.innerWidth < 1920;
    is['lg'] = window.innerWidth >= 1920;
    is['portrait'] = window.innerWidth / window.innerHeight < 1;
    is['landscape'] = window.innerWidth / window.innerHeight >= 1;

    for (var el in is) {
        if (is[el]) {
            document.body.classList.add(el);
        }
    }
}

function detectScroll() {

    var scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
    if (scrollTop > 10 && !document.body.classList.contains('visible-menu')) {
        document.body.classList.add('scroll-started');
    } else {
        document.body.classList.remove('scroll-started');
    }
    if (scrollTop > 100 && !document.body.classList.contains('visible-menu')) {
        document.body.classList.add('scrolled-down');
    } else {
        document.body.classList.remove('scrolled-down');
    }
}

/* prevent right click on img
document.querySelectorAll('img').forEach(function(img) {
    img.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        return false;
    });
});
*/



if (document.cookie.indexOf('t_l=') < 0) {
    document.cookie = "t_l=1; path=/";
}

/* global events */

window.addEventListener('resizewidth', function () {
    detectViewport();
});

window.addEventListener('scroll', function () {
    detectScroll();
});

window.addEventListener('scrolldown', function () {
    document.body.classList.remove('scrolled-upwards');
    document.body.classList.add('scrolled-downwards');
});

window.addEventListener('scrollup', function () {
    document.body.classList.remove('scrolled-downwards');
    document.body.classList.add('scrolled-upwards');
});

/* powermail */
setValidate('powermail_form powermail_form_1');

/* ce */


detectBrowser();
//detectViewport();
detectScroll();

/*
document.querySelectorAll('.frame').forEach(function (frame) {
    if (frame.classList.contains('frame-type-text')) {
        frame.setAttribute('data-aos', 'fade-in');
    }
});

document.querySelectorAll('footer .frame').forEach(function (frame) {
    frame.removeAttribute('data-aos');
});
*/

AOS.init({
    duration: 800
});

document.body.onkeydown = function (e) {
    if (e.keyCode === 71) {
        document.body.classList.add('show-grid');
    }
};
document.body.onkeyup = function (e) {
    if (e.keyCode === 71) {
        document.body.classList.remove('show-grid');
    }
};
