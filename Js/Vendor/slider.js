/**
 * slider
 * @version 1.1.0
 * @author Attila Glück
 * @license The MIT License (MIT)
 * @todo better indexing
 * @todo align after resize
 * @todo better constructor see pireg
 */

function slider(selector, options) {
    selector.forEach(function (el) {
        if (el.firstElementChild.firstElementChild.firstElementChild) {
            new sliderSetup(el, options);
        }
    });
}

function sliderSetup(sliderEl, options) {

    if (sliderEl.length == 0) {
        return false;
    }

    var settings = extend({
        arrowsContainer: 'nav.arrows',
        dotsContainer: 'nav.dots',
        loop: false,
        center: false,
        shuffle: false,
        autorun: false,
        autorunInterval: 4000,
        autorunRestartDelay: 8000,
        animation: false,
        animationSpeed: 800,
        trigger: false,
    }, options);

    var slider = this;
    var container = sliderEl.firstElementChild.firstElementChild;
    var centerOffset = 0;
    var slideDiff = 0;
    var defaultTranslate;
    var animationInProgress = false;
    var firstIsPlaceholder = false;
    var slideIsPossible = true;
    var elementWidth, elementToShow, elementPadding, autorunInterval, startClientX, endClientX,
        direction;

    this.init = function () {

        elementWidth = parseInt(getComputedStyle(container.children[0])['width']);
        elementPadding = parseInt(getComputedStyle(container.children[0])['paddingLeft'], 10);
        elementToShow = Math.round(parseInt(getComputedStyle(container)['width']) / elementWidth);

        if (settings.center) {
            settings.loop = true;
            centerOffset = Math.round((parseInt(getComputedStyle(container)['width']) - elementToShow * elementWidth) / 2);
            if (centerOffset < 2 && !(elementToShow % 2)) {
                centerOffset = elementWidth / -2;
            }
        }

        if (container.children.length >= elementToShow && settings.loop === true) {
            defaultTranslate = settings.center ? 'translateX(-100%) translateX(' + centerOffset + 'px)' : 'translateX(-100%)';
            slider.extendToLoop();
        }

    };

    this.extendToLoop = function () {

        var nodeList = [];
        Array.prototype.forEach.call(container.children, function (child) {
            nodeList.push(child.cloneNode(true));
        });

        if (settings.loop && container.children.length <= elementToShow + 2) {
            nodeList.forEach(function (node) {
                container.appendChild(node);
            });
            if (container.children.length <= elementToShow) {
                slider.extendToLoop();
            }
        }

        if (!settings.loop && container.children.length < elementToShow + 2) {
            container.appendChild(nodeList[0]);
            firstIsPlaceholder = true;
        } else {
            firstIsPlaceholder = false;
        }

        if (!settings.loop && container.children.length < elementToShow + 1) {
            slideIsPossible = false;
        }


    };

    this.start = function () {

        var j = 0;
        Array.prototype.forEach.call(container.children, function (el) {
            wrap(el, false, j);
            var dot = document.createElement('div');
            dot.setAttribute('data-index', j);
            sliderEl.querySelector(settings.dotsContainer).appendChild(dot);
            j++;
        });


        slider.init();

        container.children[0].classList.add('first');
        container.children[0].classList.add('act');

        if (firstIsPlaceholder) {
            container.children[container.children.length - 2].classList.add('last');
        } else {
            container.children[container.children.length - 1].classList.add('last');
        }

        Array.prototype.forEach.call(container.children, function (el) {
            el.style.transform = defaultTranslate;
        });

        if (!slideIsPossible) {
            sliderEl.classList.add('navinact');
            return false;
        }

        slider.loopPrev();

        if (settings.center) {
            for (var i = 1; i <= elementToShow / 2; ++i) {
                slider.loopPrev();
            }
        }

        if (settings.shuffle) {
            for (i = container.children.length; i >= 0; i--) {
                container.appendChild(container.children[Math.random() * i | 0]);
            }
        }

        if (settings.autorun) {
            slider.setAutorun();
        }

        sliderEl.querySelector(settings.arrowsContainer + ' div:first-child').addEventListener('click', function () {
            slider.prev(settings.animation);
            if (settings.autorun) {
                slider.setAutorunDelay();
            }
        });

        sliderEl.querySelector(settings.arrowsContainer + ' div:last-child').addEventListener('click', function () {
            slider.next(settings.animation);
            if (settings.autorun) {
                slider.setAutorunDelay();
            }
        });

        sliderEl.querySelector(settings.dotsContainer).childNodes.forEach(function (dot) {

            dot.addEventListener('click', function () {
                slider.goTo(dot.getAttribute('data-index'));
                if (settings.autorun) {
                    slider.setAutorunDelay();
                }
            });
        });

        Array.prototype.forEach.call(container.querySelector('*'), function (el) {
            el.addEventListener('dragstart', function (e) {
                return false;
            });
        });


        Array.prototype.forEach.call(container.children, function (el) {
            el.addEventListener('click', function (e) {
                if (slideDiff != 0) {
                    e.preventDefault();
                }
            });
        });

        var i = 0;
        Array.prototype.forEach.call(container.children, function (el) {

            if (i % 4 == 0) {
                if (container.children[i]) container.children[i].classList.add('i4');
                if (container.children[i + 2]) container.children[i + 2].classList.add('i2');
                if (container.children[i + 3]) container.children[i + 3].classList.add('i3');
                if (container.children[i + 4]) container.children[i + 4].classList.add('i4');
            }
            i++

        });

        //container.addEventListener('mousedown', this.mousedownTouchstart);
        container.addEventListener('touchstart', this.mousedownTouchstart);

        //container.addEventListener('mousemove', this.mousemoveTouchmove);
        container.addEventListener('touchmove', this.mousemoveTouchmove);

        //container.addEventListener('mouseup', this.mouseupTouchend);
        container.addEventListener('touchend', this.mouseupTouchend);

        slider.state();

    };

    this.mousedownTouchstart = function (e) {
        sliderEl.classList.add('touch');
        if (settings.autorun) {
            clearInterval(autorunInterval);
        }

        slideDiff = 0;
        direction = '';
        startClientX = typeof e.touches == 'undefined' ? e.clientX : e.touches[0].clientX;
    };

    this.mousemoveTouchmove = function (e) {
        if (sliderEl.classList.contains('touch')) {

            endClientX = typeof e.touches == 'undefined' ? e.clientX : e.touches[0].clientX;
            if (!animationInProgress && endClientX - startClientX < elementWidth && endClientX - startClientX > -elementWidth) {

                slideDiff = endClientX - startClientX;

                Array.prototype.forEach.call(container.children, function (el) {
                    el.style.transform = 'translateX(-100%) translateX(' + (slideDiff + centerOffset) + 'px)';
                });

                if (slideDiff > 50 && !slider.atStart()) {
                    direction = 'prev';
                }
                if (slideDiff < -50 && !slider.atEnd()) {
                    direction = 'next';
                }
            }
        }
    };

    this.mouseupTouchend = function (e) {
        sliderEl.classList.remove('touch');
        if (settings.autorun) {
            slider.setAutorunDelay();
        }
        if (direction == 'next') {
            slider.next(false);
        } else if (direction == 'prev') {
            slider.prev(false);
        } else {
            Array.prototype.forEach.call(container.children, function (el) {
                el.style.transform = 'translateX(-100%) translateX(' + centerOffset + 'px)';
            });
        }
    };

    this.setAutorun = function () {
        clearInterval(autorunInterval);
        autorunInterval = setInterval(function () {
            slider.next(settings.animation);
        }, settings.autorunInterval)
    };

    this.setAutorunDelay = function () {
        clearInterval(autorunInterval);
        setTimeout(function () {
            slider.setAutorun();
        }, settings.autorunRestartDelay)
    };

    this.atStart = function () {
        return !settings.loop && container.firstElementChild.classList.contains('first');
    };

    this.atEnd = function () {
        return !settings.loop && container.lastElementChild.classList.contains('last');
    };

    this.loopPrev = function () {
        container.insertBefore(container.children[container.children.length - 1], container.firstChild);
    };

    this.loopNext = function () {
        container.appendChild(container.firstChild);
    };

    this.slideOrAnimate = function (translate, animation) {
        if (animation && elementToShow == 1) {
            Array.prototype.forEach.call(container.children, function (el) {
                el.firstChild.style.animationDuration = settings.animationSpeed + 'ms';
                el.style.transform = translate;
            });
            sliderEl.querySelector('.prevAct').style.transitionDelay = settings.animationSpeed + 'ms';
        } else {
            Array.prototype.forEach.call(container.children, function (el) {
                el.firstChild.style.animationDuration = '0ms';
                el.style.transitionDuration = settings.animationSpeed + 'ms';
                el.style.transform = translate;
            });
        }
    };

    this.endAnimate = function () {
        animationInProgress = false;
        Array.prototype.forEach.call(container.children, function (el) {
            el.style.transitionDuration = '0ms';
            el.style.transform = defaultTranslate;
            el.style.transitionDelay = null;
            el.classList.remove('prevAct');
        });
        sliderEl.querySelector('.nextAct').classList.add('act')
        sliderEl.querySelector('.nextAct').classList.remove('nextAct')
        slider.state();
    };

    this.prev = function (animation) {

        if (!animationInProgress && (settings.loop || !slider.atStart())) {

            animationInProgress = true;

            sliderEl.querySelector('.act').classList.add('prevAct');
            sliderEl.querySelector('.act').classList.remove('act');
            sliderEl.querySelector('.prevAct').previousElementSibling.classList.add('nextAct');

            var translate = settings.center ? 'translateX(' + centerOffset + 'px)' : 'translateX(0)';
            slider.slideOrAnimate(translate, animation);

            if (settings.trigger) {
                settings.trigger.prev(settings.animation);
            }

            setTimeout(function () {
                slider.loopPrev();
                slider.endAnimate();
            }, settings.animationSpeed);

        }
    };

    this.next = function (animation) {

        if (!animationInProgress && (settings.loop || !slider.atEnd())) {

            animationInProgress = true;

            sliderEl.querySelector('.act').classList.add('prevAct');
            sliderEl.querySelector('.act').classList.remove('act');
            sliderEl.querySelector('.prevAct').nextElementSibling.classList.add('nextAct');

            var translate = settings.center ? 'translateX(-200%) translateX(' + centerOffset + 'px)' : 'translateX(-200%)';
            slider.slideOrAnimate(translate, animation);

            if (settings.trigger) {
                settings.trigger.next(settings.animation);
            }

            setTimeout(function () {
                slider.loopNext();
                slider.endAnimate();
            }, settings.animationSpeed);

        }
    };

    this.goTo = function (index) {
        var actIndex = sliderEl.querySelector(settings.dotsContainer + ' div.act').getAttribute('data-index');
        var i = 0;
        if (actIndex < index) {
            slider.next(settings.animation);
            i++;
            var goToInterval = setInterval(function () {
                if (i == (index - actIndex)) {
                    clearInterval(goToInterval);
                } else {
                    slider.next(settings.animation);
                    i++;
                }
            }, settings.animationSpeed + 50);
        }
        if (actIndex > index) {
            slider.prev(settings.animation);
            i++;
            var goToInterval = setInterval(function () {
                if (i == (actIndex - index)) {
                    clearInterval(goToInterval);
                } else {
                    slider.prev(settings.animation);
                    i++;
                }
            }, settings.animationSpeed + 50);
        }
    }

    this.state = function () {

        if (!settings.loop) {
            sliderEl.classList.remove('navinactprev');
            sliderEl.classList.remove('navinactnext');
            sliderEl.classList.remove('navinact');

            if (slider.atStart()) {
                sliderEl.classList.add('navinactprev');
            }
            if (slider.atEnd()) {
                sliderEl.classList.add('navinactnext');
            }
        }
        if (container.children.length <= elementToShow + 1) {
            sliderEl.classList.add('navinact');
            clearInterval(autorunInterval);
        }

        Array.prototype.forEach.call(container.children, function (el) {

            if (el.classList.contains('act')) {
                var index = el.getAttribute('data-index');
                sliderEl.querySelector(settings.dotsContainer).childNodes.forEach(function (el) {
                    el.classList.remove('act');
                })
                sliderEl.querySelector(settings.dotsContainer).childNodes[index].classList.add('act');
            }

        })

    };

    slider.start();

    window.addEventListener('resizewidth', function () {
        slider.init();
        slider.state();
    });

    return this;

}