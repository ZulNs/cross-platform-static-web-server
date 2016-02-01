
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
	_dirlist = {},
	_imglist = [],
	_viewMode = 'list',
	_isListed,
	_isTiled,
	_contentTitle,
	_options,
	_viewList,
	_viewTiles,
	_shutdown,
	_homeContent,
	_listedContent,
	_listedBody,
	_tiledContent,
	_blanket,
	_dialog,
	_dialogMsg,
	_userAnswer,
	_buttonsWrapper,
	_buttonOk,
	_buttonCancel,
	_iframe,
	_iframeClose,
	_imgIdx,
	_isDialogOpened = false,
	_isModal = false,
	_isConfirm = false,
	_isInputMode = false,
	_onConfirm,
	_author,
	_eectr = 0,
	_isDisplayNone,
	_tabIndex,
	_isHovered,
	_isHome = true;

window.document.onkeydown = function (event) {
	if (_isDialogOpened && _isModal) return false;
	var evt = event || window.event;
	var key = evt.which || evt.keyCode;
	/*
	console.log(
		'evt: ' + evt +
		'\nkey: ' + key +
		'\nstr: ' + String.fromCharCode(key)
	);
	*/
	switch (key) {
		case 76:
		case 78:
		case 83:
		case 84:
		case 85:
		case 90:
			if (_isInputMode) {
				_eectr = 0;
				return true;
			}
			switch (key) {
				case 76: // L
					_eectr = _eectr === 2 ? 3 : 0;
					if (! _viewList.disabled && ! _isHome && _eectr !== 3) {
						setViewMode('list');
						return false;
					}
					break;
				case 78: // N
					_eectr = _eectr === 3 ? 4 : 0;
					break;
				case 83: // S
					if (_eectr === 4) {
						//alert('watch the difference');
						infoDialog('ZulNs:<br>My first experience with Node.js<br>and second with HTTP, HTML, and CSS.');
						_eectr = 0;
						return false;
					}
					shutdown();
					return false;
				case 84: // T
					if (! _viewTiles.disabled && ! _isHome) {
						setViewMode('tiles');
						return false;
					}
					break;
				case 85: // U
					_eectr = (_eectr === 1) ? 2 : 0;
					break;
				case 90: // Z
					_eectr = 1;
					break;
			}
			break;
		default:
			_eectr = 0;
			switch (key) {
				case 8: // Backspace
					//return false;
					break;
				case 9: // Tab
					if (_isDialogOpened) return false;
					break;
				case 13: // Enter
					if (_isDialogOpened) {
						closeDialog(true);
						return false;
					}
					if (_tabIndex > 0 && ! _isHome && ! _isDialogOpened) {
						openItem(_tabIndex);
						return false;
					}
					break;
				case 16: return true;
				case 27: // Esc
					if (_isDialogOpened) {
						closeDialog(false);
						return false;
					}
					if (! _isHome && ! _isDialogOpened) {
						openItem(1);
						return false;
					}
					break;
				case 37: // Left
					break;
				case 38: // Up
					break;
				case 39: // Right
					break;
				case 40: // Down
					break;
			}
	}
	return true;
}

function showURL() {
	var url = document.location;
	alert(
		'domain: ' + document.domain +
		'\nhost: ' + url.host +
		'\nhostname: ' + url.hostname +
		'\nhref: ' + url.href +
		'\norigin: ' + url.origin +
		'\npathname: ' + url.pathname +
		'\nport: ' + url.port +
		'\nprotocol: ' + url.protocol +
		'\nsearch: ' + url.search +
		'\nhash: ' + url.hash
	);
}

function initialize() {
	_author = document.getElementById('author');
	_author.innerHTML = "Design by ZulNs, @Yogyakarta, Oct-Nov 2015";
	_contentTitle = document.getElementById('content_title');
	_options = document.getElementById('options');
	_viewList = document.getElementById('view_list');
	_viewTiles = document.getElementById('view_tiles');
	_shutdown = document.getElementById('shutdown');
	_homeContent = document.getElementById('home_content');
	_listedContent = document.getElementById('listed_content');
	_listedBody = document.getElementById('listed_body');
	_tiledContent = document.getElementById('tiled_content');
	_blanket = document.getElementById('blanket');
	_dialog = document.getElementById('dialog');
	_dialogMsg = document.getElementById('dialog_message');
	_userAnswer = document.getElementById('user_answer');
	_buttonsWrapper = document.getElementById('buttons_wrapper');
	_buttonOk = document.getElementById('button_ok');
	_buttonCancel = document.getElementById('button_cancel');
	_iframe = document.getElementById('iframe');
	_iframeClose = document.getElementById('iframe_close');
	_iframeClose.addEventListener(whichAnimationEvent(), animationEndHandler);
	_viewList.setAttribute('tabIndex', '-1');
	_viewTiles.setAttribute('tabIndex', '-1');
	_shutdown.setAttribute('tabIndex', '-1');
	_author.setAttribute('tabIndex', '-1');
	_buttonOk.setAttribute('tabIndex', '-1');
	_buttonCancel.setAttribute('tabIndex', '-1');
	_iframe.setAttribute('tabIndex', '-1');
	if (document.location.hash.length > 1)
		loadContent(document.location.hash);
	else
		backToHome();
}

function backToHome() {
	_contentTitle.innerHTML = document.title;
	_options.style.display = 'none';
	_listedContent.style.display = 'none';
	_listedBody.innerHTML = ''; 
	_tiledContent.style.display = 'none';
	_tiledContent.innerHTML = '';
	_homeContent.style.display = 'block';
	document.location.hash = '#';
	_isHome = true;
}

function setViewMode(view) {
	_tabIndex = 0;
	if (_isHome) {
		_homeContent.style.display = 'none';
		_options.style.display = 'block';
	}
	if (_viewMode !== view || _isHome) {
		if (view === 'list') {
			_viewList.disabled = true;
			_viewTiles.disabled = false;
			_tiledContent.style.display = 'none';
			if (! _isListed) viewList();
			_listedContent.style.display = 'block';
		}
		else {
			_viewTiles.disabled = true;
			_viewList.disabled = false;
			_listedContent.style.display = 'none';
			if (! _isTiled) viewTiles();
			_tiledContent.style.display = 'block';
		}
		_isHome = false;
	}
	else {
		if (view === 'list')
			viewList();
		else
			viewTiles();
	}
	_viewMode = view;
	_tabIndex = 0;
	_isHovered = false;
}

function focusItem(tabIdx) {
	if (tabIdx < 1) return;
	if (_viewMode === 'list')
		_listedBody.children[tabIdx - 1].focus();
	else
		_tiledContent.children[tabIdx - 1].children[1].focus();
}

function openItem(tabIdx) {
	if (_viewMode === 'list')
		_listedBody.children[tabIdx - 1].onclick();
	else
		_tiledContent.children[tabIdx - 1].children[1].children[0].onclick();
}

function getImageList() {
	return _imglist;
}

function modalDialog(msg) {
	openDialog(msg, 'modal');
}

function infoDialog(msg) {
	openDialog(msg, 'info');
}

function confirmDialog(msg, onConfirm) {
	openDialog(msg, 'confirm', onConfirm);
}

function questionDialog(msg, onAnswer) {
	_isInputMode = true;
	openDialog(msg, 'question', onAnswer);
}

function openDialog(msg, style, onConfirm) {
	//window.scrollTo(0, 0);
	_blanket.style.display = 'block';
	if (style === 'modal') {
		_userAnswer.style.display = 'none';
		_buttonsWrapper.style.display = 'none';
		_isModal = true;
		_isConfirm = false;
	}
	else {
		if (style === 'info') {
			_userAnswer.style.display = 'none';
			_buttonCancel.style.display = 'none';
			_isConfirm = false;
		}
		else {
			if (style === 'question') {
				_userAnswer.value = '';
				_userAnswer.style.display = 'block';
			}
			else
				_userAnswer.style.display = 'none';
			_buttonCancel.style.display = 'inline-block';
			_onConfirm = onConfirm;
			_isConfirm = true;
		}
		_buttonsWrapper.style.display = 'block';
		_isModal = false;
	}
	_dialogMsg.innerHTML = msg;
	_dialog.style.display = 'block';
	if (style === 'question') _userAnswer.focus();
	_isDialogOpened = true;
}

function closeDialog(key) {
	_dialog.style.display = 'none';
	_blanket.style.display = 'none';
	_isDialogOpened = false;
	_isInputMode = false;
	if (_isConfirm) _onConfirm(key);
}

function openIframe(src) {
	if (/^img$/.test(getFileType(src))) {
		_iframe.src = '/imgview.html#' + src;
	}
	else
		_iframe.src = src;
	_iframe.style.display = 'block';
	_iframeClose.style.display = 'block';
	_isDisplayNone = false;
	fade(_iframeClose);
	_iframe.focus();
}

function closeIframe() {
	_iframe.style.display = 'none';
	_iframeClose.style.display = 'none';
	_iframe.src = '';
	focusItem(_tabIndex);
}

function closeIframeWithAnimation() {
	_isDisplayNone = true;
	fade(_iframeClose);
	_iframe.style.display = 'none';
	_iframe.src = '';
	focusItem(_tabIndex);
}

function fade(elm) {
	elm.classList.remove('fadeOnHover');
	elm.classList.add('fade');
}

function animationEndHandler() {
	this.classList.remove('fade');
	this.classList.add('fadeOnHover');
	if (_isDisplayNone) this.style.display = 'none';
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

function getFileType(filename) {
	var ext = filename.replace(/^.+\./, '').toLowerCase();
	if (filename === ext) ext = '';
	var type = FILE_TYPE[ext];
	if (typeof type === 'undefined') type = 'bin';
	return  type;
}

function checkImageFile(filename) {
	if (/^img$/.test(getFileType(filename))) _imglist[_imglist.length] = filename;
}

function getFormattedDate(date) {
	var d = new Date(date).toString().split(' ');
	return d[2] + '-' + d[1] + '-' + d[3] + ';' + d[4];
}

function encodeFilename(url) {
	url = url.replace(/ /g, '%20');
	url = url.replace(/#/g, '%23');
	return url;
}

function decodeFilename(url) {
	url = url.replace(/%20/g, ' ');
	url = url.replace(/%23/g, '#');
	return url;
}

function getParent(path) {
	var parent = path.replace(/((\/[^\/]+$)|(\/[^\/]+\/$))/, '/');
	if (parent.length === path.length) parent = '';
	return parent;
}

function onEnterTile() {
	var target;
	if (/^img$/i.test(this.nodeName))
		target = this.parentNode.parentNode.children[1];
	else
		target = this;
	target.focus();
	_isHovered = true;
}

function onLeaveTile() {
	_isHovered = false;
}

function onFocusTile() {
	if (_isHovered) {
		var elm = _tiledContent.children[_tabIndex - 1].children[1];
		if (this !== elm) elm.focus();
		return;
	}
	var img = this.parentNode.children[0].children[1];
	var hlen = document.location.protocol.length + 2 + document.location.host.length;
	img.classList.add('focused');
	this.classList.add('focused');
	if (img.src.substr(hlen).toLowerCase() === '/assets/images/img.png') {
		img.alt = 'loading...';
		img.src = this.children[0].href.substr(hlen);
	}
	_tabIndex = this.tabIndex;
}

function onBlurTile() {
	if (! _isHovered) {
		this.parentNode.children[0].children[1].classList.remove('focused');
		this.classList.remove('focused');
		_tabIndex = 0;
	}
}

function createTileImage(src, href, filename) {
	var tile = document.createElement('div');
	var wrapper = document.createElement('div');
	var helper = document.createElement('span');
	var img = document.createElement('img');
	var name = document.createElement('div');
	var link = document.createElement('a');
	tile.className = 'tile_wrapper';
	wrapper.className = 'image_wrapper';
	name.className = 'filename';
	img.src = '/assets/images/' + src + '.png';
	img.alt = 'no image';
	link.href = href;
	link.innerHTML = filename;
	if (/^#/.test(href)) {
		if (href.length > 1) {
			img.onclick = loadContentFromTiles;
			link.onclick = loadContentFromTiles;
		}
		else {
			img.onclick = backToHome;
			link.onclick = backToHome;
		}
	}
	else {
		img.onclick = loadFileFromTiles;
		link.onclick = loadFileFromTiles;
	}
	link.setAttribute('tabIndex', '-1');
	img.onmouseenter = onEnterTile;
	img.onmouseleave = onLeaveTile;
	name.onmouseenter = onEnterTile;
	name.onmouseleave = onLeaveTile;
	name.onfocus = onFocusTile;
	name.onblur = onBlurTile;
	_tabIndex++;
	name.setAttribute('tabIndex', _tabIndex.toString());
	wrapper.appendChild(helper);
	wrapper.appendChild(img);
	name.appendChild(link);
	tile.appendChild(wrapper);
	tile.appendChild(name);
	return tile;
}

function viewTiles() {
	var src, href, name;
	var parent = getParent(_pathname);
	if (parent !== '') {
		src = 'up';
		href = '#' + encodeFilename(parent);
		name = '[parent directory]';
	}
	else {
		src = 'hom';
		href = '#';
		name = '[back to Home]';
	}
	_tiledContent.appendChild(createTileImage(src, href, name));
	for (dir in _dirlist.dirs) {
		href = '#' + encodeFilename(_pathname + dir);
		if (! /\/$/.test(href)) href += '/';
		_tiledContent.appendChild(createTileImage('dir', href, dir));
	}
	for (file in _dirlist.files) {
		checkImageFile(file);
		href = encodeFilename('/' + _pathname + file);
		_tiledContent.appendChild(createTileImage(getFileType(file), href, file));
	}
	_isTiled = true;
	closeDialog(true);
}

function onEnterList() {
	this.focus();
	_isHovered = true;
}

function onLeaveList() {
	_isHovered = false;
}

function onFocusList() {
	if (_isHovered) {
		var elm = _listedBody.children[_tabIndex - 1];
		if (this !== elm) elm.focus();
		return;
	}
	_tabIndex = this.tabIndex;
}

function onBlurList() {
	if (! _isHovered) _tabIndex = 0;
}

function createCell(data, className) {
	var cell = document.createElement('td');
	if (className !== null) cell.className = className;
	if (typeof data === 'string')
		cell.innerHTML = data;
	else
		cell.appendChild(data);
	return cell;
}

function createRow(icon, name, size, mtime, href, onclick) {
	var row = document.createElement('tr');
	var img = document.createElement('img');
	var link = document.createElement('a');
	var mtm = (mtime === null) ? ['&nbsp;', '&nbsp;'] : getFormattedDate(mtime).split(';');
	if (size === null) size = '';
	img.src = '/assets/icons/' + icon + '.png';
	link.href = href;
	link.innerHTML = name;
	link.setAttribute('tabIndex', '-1');
	row.appendChild(createCell(img, 'fileicon'));
	row.appendChild(createCell(link, null));
	row.appendChild(createCell(size, 'filesize'));
	row.appendChild(createCell(mtm[0], 'mod_date'));
	row.appendChild(createCell(mtm[1], 'mod_time'));
	if (onclick === null)
		onclick = loadFileFromList;
	row.onclick = onclick;
	row.onmouseenter = onEnterList;
	row.onmouseleave = onLeaveList;
	row.onfocus = onFocusList;
	row.onblur = onBlurList;
	_tabIndex++;
	row.setAttribute('tabIndex', _tabIndex.toString());
	return row;
}

function viewList() {
	var link = document.createElement('a');
	var icon, name, href, onclick;
	var parent = getParent(_pathname);
	if (parent !== '') {
		href = '#' + encodeFilename(parent);
		onclick = loadContentFromList;
		icon = 'up';
		name = '[parent directory]';
	}
	else {
		href = '#';
		onclick = backToHome;
		icon = 'hom';
		name = '[back to Home]';
	}
	_listedBody.appendChild(createRow(icon, name, null, null, href, onclick));
	for (dir in _dirlist.dirs) {
		href = '#' + encodeFilename(_pathname + dir);
		if (! /\/$/.test(href)) href += '/';
		onclick = loadContentFromList;
		_listedBody.appendChild(createRow('dir', dir, null, _dirlist.dirs[dir].mtime, href, onclick, null));
	}
	for (file in _dirlist.files) {
		checkImageFile(file);
		href = encodeFilename('/' + _pathname + file);
		_listedBody.appendChild(createRow(getFileType(file), file,
			_dirlist.files[file].size.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,'),
				// Adds decimal separator
			_dirlist.files[file].mtime, href, null
		));
	}
	_isListed = true;
	closeDialog(true);
}

function loadFileFromTiles() {
	var elm = this;
	if (/^img$/i.test(elm.nodeName)) elm = elm.parentNode.parentNode.children[1].children[0];
	return loadFile(elm.href);
}

function loadFileFromList() {
	return loadFile(this.children[1].children[0].href);
}

function loadFile(href) {
	if (/^img$/.test(getFileType(href)))
		openIframe(href);
	else
		window.open(href, '_blank');
	return false;
}

function loadContentFromTiles() {
	var elm = this;
	if (/^img$/i.test(elm.nodeName)) elm = elm.parentNode.parentNode.children[1].children[0];
	return loadContent(elm.href);
}

function loadContentFromList() {
	return loadContent(this.children[1].children[0].href);
}

function loadContent(href) {
	if (! /#/.test(href)) return false;
	href = href.replace(/[^#]*(?=#)/, '');
	if (! /((\/$)|(\*$))/.test(href)) href += '/';
	document.location.hash = href;
	_pathname = decodeFilename(href.substr(1));
	if (_pathname === '') return false;
	ajaxRequest('GET', '/' + href.substr(1), receiveContent);
	modalDialog('Loading...<br>Please wait...', 'modal');
	return false;
}

function receiveContent(xhr) {
	var ctype = xhr.getResponseHeader('Content-Type');
	if (xhr.status === 200 && ctype === 'application/json') {
		_dirlist = JSON.parse(xhr.responseText);
		_pathname = _pathname.replace(/\*[.]*$/, '');
		_contentTitle.innerHTML = 'Index of ' + _pathname;
		_imglist = [];
		_listedBody.innerHTML = '';
		_isListed = false;
		_tiledContent.innerHTML = '';
		_isTiled = false;
		setViewMode(_viewMode);
	}
	else if (xhr.status === 200 && ctype === 'text/html') {
		loadContent('#' + encodeFilename(_pathname) + '*');
	}
	else {
		var msg = 'Error ' + xhr.status;
		if (xhr.responseText) msg += '<br>' + xhr.responseText;
		infoDialog(msg);
	}
}

function shutdown() {
	questionDialog('Enter password to shutdown server:', function(answer) {
		if (answer && _userAnswer.value !== '') {
			ajaxRequest('GET', encodeFilename('/shutdown?password=' + _userAnswer.value), function(xhr) {
				if (xhr.status === 503) {
					modalDialog('503 - ' + xhr.responseText);
				}
				else {
					var msg = 'Error ' + xhr.status;
					if (xhr.responseText) msg += '<br>' + xhr.responseText;
					infoDialog(msg);
				}
			});
		}
	});
}

function ajaxRequest(method, request, onData) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 0)
				infoDialog('Request timeout...');
			else
				onData(xhr);
		}
	};
	xhr.open(method, request, true);
	xhr.send();
}
