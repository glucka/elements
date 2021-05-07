function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
    return time;
}


function sortObject(o) {
    var sorted = [],
        key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();
    //a.reverse();

    for (key = 0; key < a.length; key++) {
        sorted.push(o[a[key]]);
    }
    return sorted;
}

function initFacebook() {
    socialNets++;
    FB.api(
        '/' + facebookName + '/feed?date_format=U&fields=full_picture,message,created_time,permalink_url',
        'GET',
        {
            'access_token': facebookAccessToken,
            'limit': postsToShow + 2
        },
        function (feed) {
            var x = 0;
            for (key in feed.data) {

                var post = feed.data[key];

                if (typeof post.full_picture != 'undefined' && x < postsToShow) {

                    x++;

                    var post_message = post.message;

                    if (String(post_message).length > 60) {
                        post_message = post_message.substring(0, 60);
                        post_message = '<a href="' + post.permalink_url + '" target="_blank" rel="noopener noreferrer">' + post_message.substring(0, post_message.lastIndexOf(" ")) + ' ...' + '</a>';
                    }
                    if (typeof post_message != 'undefined') {
                        post_message = '<a href="' + post.permalink_url + '" target="_blank" rel="noopener noreferrer">' + post_message + '</a>';
                    } else {
                        post_message = '';
                    }

                    var html = templateFacebook.replace('{ctime}', timeConverter(post.created_time))
                        .replace('{datatime}', post.created_time)
                        .replace('{img}', '<a class="img lazyload" href="' + post.permalink_url + '" target="_blank" data-bgset="' + post.full_picture + '" ></a>')
                        .replace('{caption}', post_message);

                    feedelements[post.created_time] = html;

                    if (x == postsToShow) {
                        prepareSocialWall();
                    }
                }

            }

        }
    );
}

function initInstagram() {
    socialNets++;
    FB.api(
        '/' + instagramUserId + '/media',
        'GET',
        {
            'access_token': facebookAccessToken,
            'limit': postsToShow * 2
        },
        function (feed) {
            var x = 0;
            for (key in feed.data) {

                FB.api(
                    '/' + feed.data[key].id + '?date_format=U&fields=media_type,media_url,permalink,timestamp',
                    'GET',
                    {
                        'access_token': facebookAccessToken,
                        'limit': postsToShow
                    },
                    function (media) {

                        if ((media.media_type == 'IMAGE' || media.media_type == 'CAROUSEL_ALBUM') && x < postsToShow) {

                            x++;

                            var html = templateInstagram.replace('{ctime}', timeConverter(media.timestamp))
                                .replace('{datatime}', media.timestamp)
                                .replace('{img}', '<a class="img lazyload" href="' + media.permalink + '" target="_blank" rel="noopener noreferrer" data-bgset="' + media.media_url + '" ></a>');

                            feedelements[media.timestamp] = html;

                            if (x == postsToShow) {
                                prepareSocialWall();
                            }
                        }
                    }
                );

            }
        }
    );
}

function drawSocialWall() {
    feedelements = Storages.sessionStorage.get('socialWall');
    var z = 0;

    for (key in feedelements) {
        z += 1;
        if (z <= postsToShow) {
            var parser = new DOMParser();
            var html = parser.parseFromString(feedelements[key], 'text/html');
            document.querySelector('.frame-type-mask_socialwall').prepend(html.body.firstChild);
        }
    }

    /*slider(document.querySelectorAll('.frame-type-mask_socialwall .inner'), {
        loop: true
    });*/
}


function prepareSocialWall() {

    socialNetsReady++;

    if (Storages.sessionStorage.get('socialWall') != null) {
        drawSocialWall();
    } else {
        if (socialNetsReady == socialNets) {
            Storages.sessionStorage.set('socialWall', JSON.stringify(sortObject(feedelements)));
            drawSocialWall();
        }
    }
}

/* called from tag manager */
function initSocialWall() {
    if (document.querySelector('.frame-type-mask_socialwall')) {
        if (Storages.sessionStorage.get('socialWall') == null) {
            //initFacebook();
            initInstagram();
            //console.error('load instagram: '+ navigator.userAgent);
        } else {
            drawSocialWall();
        }
    }
}

var socialNets = 0;
var socialNetsReady = 0;
var postsToShow = 8;
var feedelements = [];

var facebookAccessToken = 'EAAKWjZB7NySgBAPpFEpjL29GSqNJ62MO2JuwKAvEZB5EZAkZAYqq2lmhXF87RNKMKK81aLr8ZCNBODMeXO3ktFE6NPWg4Ex8gJvwBZCgJJY21NJiIyZATyLTvV8DfJPxHaahCNZBYrKiZCNbXtnLd9WnApc8CZCTAs0tmFT1acxLiLaTWL0JVxJeU6';
var facebookName = 'hub.it';
var facebookAppId = 728494884374824;
var instagramUserId = 17841402203458916;

var templateFacebook = '' +
    '<div class="feed-el" data-time="{datatime}">' +
    '<div>' +
    '{img}' +
    '<div class="footer">' +
    '<div>' +
    '<span>{caption}</span>' +
    '</div>' +
    '<svg xmlns="http://www.w3.org/2000/svg" id="Ebene_1" width="50.401" height="50.401" viewBox="0 0 50.401 50.401">' +
    '<path id="path7" fill="#c5070a" d="M24.5 17c-.9.8-1.3 2-1.3 3.5v2.7h-3.1v3.6h3.1v9.4H27v-9.3h3.1l.5-3.6H27V21c0-.6.1-1 .4-1.3.2-.3.7-.4 1.4-.4h1.9v-3.2c-.7-.1-1.6-.1-2.8-.1-1.4-.2-2.6.2-3.4 1z"></path>' +
    '</svg>' +
    '</div> ' +
    '</div></div>';

var templateInstagram = '' +
    '<div class="feed-el" data-time="{datatime}">' +
    '<div>' +
    '{img}' +
    '<div class="footer">' +
    '</div>' +
    '</div>' +
    '</div>';

/*
if (document.querySelector('.frame-type-mask_socialwall')) {
    dataLayer.push({
        'event': 'init_facebook'
    });
}
*/
