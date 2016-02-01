
/**********************************************
 * CROSS PLATFORM STATIC WEB SERVER           *
 *                                            *
 * Pure Javascript for client side scripting, *
 * no jQuery or other UI template needed.     *
 *                                            *
 * Design by ZulNs                            *
 * @Yogyakarta, Oct-Nov 2015                  *
 **********************************************/

var _pathname,
	_imglist = [],
	_img,
	_prevImg,
	_nextImg,
	_filename,
	_imgIdx = 0,
	_isLoaded = false,
	_isOverflowing = false;

window.document.onkeydown = function (event) {
	var evt = event || window.event;
	var key = evt.which || evt.keyCode;
	switch (key) {
		case 9: // Tab
			return false;
		case 13: // Enter
			if (_isLoaded) {
				imageClick();
				return false;
			}
			break;
		case 27: // Esc
			parent.closeIframeWithAnimation();
			return false;
		case 37: // Left Arrow
			if (_isLoaded && ! _isOverflowing) {
				previousImage();
				fade(_prevImg);
				return false;
			}
			break;
		case 39: // Right Arrow
			if (_isLoaded && ! _isOverflowing) {
				nextImage();
				fade(_nextImg);
				return false;
			}
		default:
	}
	return true;
}

function initialize() {
	var file = document.location.hash.substr(1);
	var animEvent = whichAnimationEvent();
	_img = document.getElementById('imgFrame');
	_prevImg = document.getElementById('prevImg');
	_nextImg = document.getElementById('nextImg');
	_filename = document.getElementById('filename');
	_img.src = file;
	file = decodeFilename(file);
	_pathname = getParent(file);
	file = file.substr(_pathname.length);
	_imglist = parent.getImageList();
	for (i in _imglist) {
		if (file === _imglist[i]) {
			_imgIdx = i;
			break;
		}
	}
	if (_imglist.length > 1) {
		_prevImg.style.display = 'block';
		_nextImg.style.display = 'block';
		_prevImg.addEventListener(animEvent, animationEndHandler);
		_nextImg.addEventListener(animEvent, animationEndHandler);
		fadeRollLeft(_prevImg);
		fadeRollRight(_nextImg);
	}
	_filename.addEventListener(animEvent, animationEndHandler);
}

function imageLoaded() {
	if (window.innerWidth !== _img.width && window.innerHeight !== _img.height)
		_img.className = 'normal';
	_filename.innerHTML = _imglist[_imgIdx];
	_filename.style.display = 'block';
	_isLoaded = true;
	fade(_filename);
}

function imageClick() {
	if (! _isLoaded || _img.className === 'normal') return;
	if (_isOverflowing) {
		_img.className = 'shrinkToFit';
		_isOverflowing = false;
	}
	else {
		_img.className = 'overflowing';
		_isOverflowing = true;
	}
}

function previousImage() {
	if (! _isLoaded) return;
	_imgIdx = _imgIdx <= 0 ? _imglist.length -1 : --_imgIdx;
	loadImage();
}

function nextImage() {
	if (! _isLoaded) return;
	_imgIdx = _imgIdx >= _imglist.length - 1 ? 0 : ++_imgIdx;
	loadImage();
}

function loadImage() {
	_img.className = 'shrinkToFit';
	_isOverflowing = false;
	_isLoaded = false;
	_filename.style.display = 'none';
	_img.src = encodeFilename(_pathname + _imglist[_imgIdx]);
}

function getParent(path) {
	return path.replace(/\/[^\/]*$/, '/');
}

function encodeFilename(url) {
	url = url.replace(/ /g, '%20');
	return url.replace(/#/g, '%23');
}

function decodeFilename(url) {
	url = url.replace(/%20/g, ' ');
	return url.replace(/%23/g, '#');
}

function fade(elm) {
	elm.classList.remove('fadeOnHover');
	elm.classList.add('fade');
}

function fadeRollLeft(elm) {
	elm.classList.remove('fadeOnHover');
	elm.classList.add('fadeRollLeft');
}

function fadeRollRight(elm) {
	elm.classList.remove('fadeOnHover');
	elm.classList.add('fadeRollRight');
}

function animationEndHandler() {
	this.classList.remove('fade');
	this.classList.remove('fadeRollLeft');
	this.classList.remove('fadeRollRight');
	this.classList.add('fadeOnHover');
}

function whichAnimationEvent() {
	var a;
	var el = document.createElement('div');
	var animations = {
		'animation': 'animationend',
		'MozAnimation': 'animationend',
		'WebkitAnimation': 'webkitAnimationEnd',
		'OAnimation': 'oAnimationEnd'
	}
	for (a in animations) {
		if (el.style[a] !== undefined) return animations[a];
	}
	return null;
}
