function rotateReaded() {
    document.querySelector('.alert-rotate').style.display = 'none';
    if (!Cookies.get('t_rr')) {
        Cookies.set('t_rr', '1', {path: '/'});
    }
}

if (document.querySelector('.alert-rotate')) {
    document.querySelector('.alert-rotate .close').addEventListener('click', function () {
        rotateReaded();
    });
    if (Cookies.get('t_rr') == '1') {
        rotateReaded();
    } else {
        document.querySelector('body').classList.add('visible-rotate');
    }
}


