function extend(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i])
            continue;

        for (var key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key))
                out[key] = arguments[i][key];
        }
    }
    return out;
}


Number.isInteger = Number.isInteger || function(value) {
    return typeof value === "number" &&
           isFinite(value) &&
           Math.floor(value) === value;
};

function elementindex(el) {
    if (!el) return -1;
    var i = 0;
    do {
        i++;
    } while (el = el.previousElementSibling);
    return i;
}

function absOffset(element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);

    return {
        top: top,
        left: left
    };
}

function wrap(el, className, index) {
    if (!el) {
        return;
    }
    var wrapper = document.createElement('div');
    if (className) wrapper.className = className;
    if (index >= 0) wrapper.setAttribute('data-index', index);
    el.parentNode.insertBefore(wrapper, el);
    el.parentNode.removeChild(el);
    wrapper.appendChild(el);
}

function getSiblings(e) {
    // for collecting siblings
    let siblings = [];
    // if no parent, return no sibling
    if (!e.parentNode) {
        return siblings;
    }
    // first child of the parent node
    let sibling = e.parentNode.firstChild;

    // collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
}

/*
if ('NodeList' in window && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}*/
