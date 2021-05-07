function hideCookieBanner() {
    cookieBanner.style.display = 'none';
    document.querySelector('body').removeAttribute('style');
}

function cookiesNotAccepted() {
    if (!Cookies.get('t_ca')) {
        Cookies.set('t_ca', '2', {path: '/'});
    }
}

function cookiesAccepted(url) {

    if (!Cookies.get('t_ca')) {
        Cookies.set('t_ca', '1', {expires: 365, path: '/'});
    }

    if (!Cookies.get('t_ref')) {
        Cookies.set('t_ref', document.referrer, {path: '/'});
    }
    if (!Cookies.get('t_ads') && window.location.search.substring(1).indexOf("gclid=") >= 0) {
        Cookies.set('t_ads', 'adwords', {path: '/'});
    }

    if (url) {
        var goToUrlTimeout = setTimeout(function () {
            window.location = url;
        }, 2000);
    }

    dataLayer.push({
        'event': 'cookies_accepted',
        'eventCallback': function () {
            if (url) {
                clearTimeout(goToUrlTimeout);
                window.location = url;
            }
        }
    });
}

function checkCookieBanner() {
    if (Cookies.get('t_ca') == '1') {
        cookiesAccepted();
    } else if (Cookies.get('t_ca') == '2') {
        cookiesNotAccepted();
    } else {
        cookieBanner.style.display = 'block';
        document.querySelector('body').style.paddingBottom = parseInt(getComputedStyle(cookieBanner)['height']) + 12 + 'px';
        cookieBanner.querySelector('p + button').addEventListener('click', function () {
            hideCookieBanner();
            cookiesAccepted();
        });
        cookieBanner.querySelector('p + button + button').addEventListener('click', function () {
            hideCookieBanner();
            cookiesNotAccepted();
        });
        document.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function (e) {
                if (Cookies.get('t_ca') != '2') {
                    e.preventDefault();
                    cookiesAccepted(link.getAttribute('href'));
                }
            });
        });
        var scrollOnce = true;
        window.addEventListener('scroll', function () {
            if (scrollOnce && !Cookies.get('t_ca') && document.documentElement.scrollTop > window.innerHeight / 4) {
                hideCookieBanner();
                cookiesAccepted();
                scrollOnce = false;
            }
        });
    }
}

var cookieBanner = document.querySelector('.frame-type-mask_cookiebanner');

if (cookieBanner) {
    checkCookieBanner();
}
