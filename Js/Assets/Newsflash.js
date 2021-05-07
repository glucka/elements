function newsReaded(url) {
    document.querySelector('.frame-type-mask_newsflash').style.display = 'none';
    if (!Cookies.get('t_nr')) {
        Cookies.set('t_nr', '1', {path: '/'});
    }
    if (url) {
        window.location = url;
    }
}

if (document.querySelector('.frame-type-mask_newsflash')) {
    document.querySelector('.frame-type-mask_newsflash .close').addEventListener('click', function () {
        newsReaded();
    });
    if (Cookies.get('t_nr') == '1') {
        newsReaded();
    } else {
        document.querySelector('body').classList.add('visible-newsflash');
    }
}


