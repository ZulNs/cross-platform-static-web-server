
/*****************************************
 * CROSS PLATFORM STATIC WEB SERVER      *
 *                                       *
 * Run at command prompt: node server.js *
 *                                       *
 * Design by ZulNs                       *
 * @Yogyakarta, 28'th October 2015       *
 *****************************************/

const DEFAULT_PORT = 8080;
const DEFAULT_BUFFER_SIZE = 64; // in KiloBytes
const MAX_BUFFER_SIZE = 102400;
const WINREG_INSTALL = 'install-context-menu.reg';
const WINREG_UNINSTALL = 'uninstall-context-menu.reg';
const ROOTNAME = 'file:';
const WINROOT = 'This_PC:';
const SHUTDOWN_COMMAND = 'shutdown';
const SHUTDOWN_KEY = 'password';
const P_WINREG = '-g';
const P_WINALL = '-a';
const P_PORT = '-p=';
const P_BUFFER = '-b=';
const P_SHUTDOWN = '-s=';
const INDEX_FILES = [
	'index.html',
	'index.htm'
]
const MIME_DEFAULT_BINARY = 'a/octet-stream';
const MIME_TYPE = {
	// a/ > application/
	// i/ > image/
	// u/ > audio/
	// v/ > video/
	// x/ > text/
	'3g2': 'v/3gpp',
	'3gp': 'v/3gpp2',
	'7z' : 'a/x-7z-compressed',
	'aac': 'u/x-aac',
	'aam': 'a/x-authorware-map',
	'aas': 'a/x-authorware-seg',
	'ac' : 'a/pkix-attr-cert',
	'adp': 'u/adpcm',
	'ai' : 'a/postscript',
	'aif': 'u/x-aiff',
	'air': 'a/vnd.adobe.air-application-installer-package+zip',
	'apk': 'a/vnd.android.package-archive',
	'asf': 'v/x-ms-asf',
	'au' : 'u/basic',
	'avi': 'v/x-msvideo',
	'azw': 'a/vnd.amazon.ebook',
	'bas': 'x/plain',
	'bat': 'x/plain',
	'bdf': 'a/x-font-bdf',
	'bin': 'a/octet-stream',
	'bmp': 'i/bmp',
	'bz' : 'a/x-bzip',
	'bz2': 'a/x-bzip2',
	'c'  : 'x/plain',
	'cab': 'a/vnd.ms-cab-compressed',
	'cat': 'a/vnd.ms-pki.seccat',
	'cer': 'a/pkix-cert',
	'chm': 'a/vnd.ms-htmlhelp',
	'chrt': 'a/vnd.kde.kchart',
	'class': 'a/java-vm',
	'clp': 'a/x-msclip',
	'cmd': 'x/plain',
	'cmx': 'a/x-cmx',
	'cod': 'a/vnd.rim.cod',
	'cpt': 'a/mac-compactpro',
	'crd': 'a/x-mscardfile',
	'crl': 'a/pkix-crl',
	'csh': 'a/x-csh',
	'css': 'x/css',
	'csv': 'x/csv',
	'deb': 'a/x-debian-package',
	'der': 'a/x-x509-ca-cert',
	'dir': 'a/x-director',
	'djvu': 'i/vnd.djvu',
	'doc': 'a/msword',
	'docm': 'a/vnd.ms-word.document.macroenabled.12',
	'docx': 'a/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'dotm': 'a/vnd.ms-word.template.macroenabled.12',
	'dotx': 'a/vnd.openxmlformats-officedocument.wordprocessingml.template',
	'dtb': 'a/x-dtbook+xml',
	'dtd': 'a/xml-dtd',
	'dts': 'u/vnd.dts',
	'dtshd': 'u/vnd.dts.hd',
	'dvi': 'a/x-dvi',
	'dwf': 'model/vnd.dwf',
	'dwg': 'i/vnd.dwg',
	'dxf': 'i/vnd.dxf',
	'eml': 'message/rfc822',
	'emma': 'a/emma+xml',
	'eot': 'a/vnd.ms-fontobject',
	'epub': 'a/epub+zip',
	'es' : 'a/ecmascript',
	'etx': 'x/x-setext',
	'exe': 'a/x-msdownload',
	'exi': 'a/exi',
	'ez2': 'a/vnd.ezpix-album',
	'ez3': 'a/vnd.ezpix-packag',
	'f'  : 'x/x-fortran',
	'f4v': 'v/x-f4v',
	'fli': 'v/x-fli',
	'flv': 'v/x-flv',
	'flw': 'a/vnd.kde.kivio',
	'fly': 'x/vnd.fly',
	'fpx': 'i/vnd.fpx',
	'gif': 'i/gif',
	'grv': 'a/vnd.groove-injector',
	'gsf': 'a/x-font-ghostscript',
	'gtar': 'a/x-gtar',
	'gtm': 'a/vnd.groove-tool-message',
	'h'  : 'x/plain',
	'h261': 'v/h261',
	'h263': 'v/h263',
	'h264': 'v/h264',
	'hal': 'a/vnd.hal+xml',
	'hlp': 'a/winhlp',
	'hpid': 'a/vnd.hp-hpid',
	'hps': 'a/vnd.hp-hps',
	'hqx': 'a/mac-binhex40',
	'htm': 'x/html',
	'html': 'x/html',
	'icc': 'a/vnd.iccprofile',
	'ico': 'i/x-icon',
	'ics': 'x/calendar',
	'ini': 'x/plain',
	'ino': 'x/plain',
	'jad': 'x/vnd.sun.j2me.app-descriptor',
	'jar': 'a/java-archive',
	'java': 'x/x-java-source', //'.java'
	'jnlp': 'a/x-java-jnlp-file',
	'joda': 'a/vnd/joost.joda-archive',
	'jpeg': 'i/jpeg',
	'jpg': 'i/jpeg',
	'jpgv': 'v/jpeg',
	'jpm': 'v/jpm',
	'js' : 'a/javascript',
	'json': 'a/json',
	'karbon': 'a/vnd.kde.karbon',
	'kfo': 'a/vnd.kde.kformula',
	'kml': 'a/vnd.google-earth.kml+xml',
	'kmz': 'a/vnd.google-earth.kmz',
	'kon': 'a/vnd.kde.kontour',
	'kpr': 'a/vnd.kde.kpresenter',
	'ksp': 'a/vnd.kde.kspread',
	'kwd': 'a/vnd.kde.kword',
	'latex': 'a/x-latex',
	'log': 'x/plain',
	'm3u': 'u/x-mpegurl',
	'm3u8': 'a/vnd.apple.mpegurl',
	'm4v': 'v/x-m4v',
	'md' : 'x/plain',
	'mdb': 'a/x-masaccess',
	'mdi': 'i/vnd.ms-modi',
	'meta4': 'a/metalink4+xml',
	'mid': 'u/midi',
	'mj2': 'v/mj2',
	'mk3d': 'v/x-matroska-3d',
	'mka': 'u/x-matroska',
	'mkv': 'v/x-matroska',
	'mny': 'a/x-msmoney',
	'mods': 'a/mods+xml',
	'mov': 'v/quicktime',
	'movie': 'v/x-sgi-movie',
	'mp3': 'u/mpeg',
	'mp4': 'v/mp4',
	'mp4a': 'u/mp4',
	'mpeg': 'v/mpeg',
	'mpg': 'v/mpeg',
	'mpga': 'u/mpeg',
	'mpkg': 'a/vnd.apple.installer+xml',
	'mpp': 'a/vnd.ms-project',
	'mseq': 'a/vnd.mseq',
	'msf': 'a/vnd.epson.msf',
	'mvb': 'a/x-msmediaview',
	'nc' : 'a/x-netcdf',
	'ncx': 'a/x-dtbncx+xml',
	'npx': 'i/vnd.net-fpx',
	'obd': 'a/x-msbinder',
	'oda': 'a/oda',
	'odb': 'a/vnd.oasis.opendocument.database',
	'odc': 'a/vnd.oasis.opendocument.chart',
	'odf': 'a/vnd.oasis.opendocument.formula',
	'odft': 'a/vnd.oasis.opendocument.formula-template',
	'odg': 'a/vnd.oasis.opendocument.graphics',
	'odi': 'a/vnd.oasis.opendocument.image',
	'odm': 'a/vnd.oasis.opendocument.text-master',
	'odp': 'a/vnd.oasis.opendocument.presentation',
	'ods': 'a/vnd.oasis.opendocument.spreadsheet',
	'odt': 'a/vnd.oasis.opendocument.text',
	'oga': 'u/ogg',
	'ogv': 'v/ogg',
	'ogx': 'a/ogg',
	'onetoc': 'a/onenote',
	'opf': 'a/oebps-package+xml',
	'otc': 'a/vnd.oasis.opendocument.chart-template',
	'otf': 'a/x-font-otf',
	'otg': 'a/vnd.oasis.opendocument.graphics-template',
	'oth': 'a/vnd.oasis.opendocument.text-web',
	'oti': 'a/vnd.oasis.opendocument.image-template',
	'otp': 'a/vnd.oasis.opendocument.presentation-template',
	'ots': 'a/vnd.oasis.opendocument.spreadsheet-template',
	'ott': 'a/vnd.oasis.opendocument.text-template',
	'oxt': 'a/vnd.openofficeorg.extension',
	'p'  : 'x/x-pascal',
	'par': 'x/plain-bas',
	'pbd': 'a/vnd.powerbuilder6',
	'pbm': 'i/x-portable-bitmap',
	'pcf': 'a/x-font-pcf',
	'pcl': 'a/vnd.hp-pcl',
	'pclxl': 'a/vnd.hp-pclxl',
	'pcx': 'i/x-pcx',
	'pdb': 'a/vnd.palm',
	'pdf': 'a/pdf',
	'pfa': 'a/x-font-type1',
	'pfr': 'a/font-tdpfr',
	'pgm': 'i/x-portable-graymap',
	'pic': 'i/x-pict',
	'pki': 'a/pkixcmp',
	'pkipath':'a/pkix-pkipath',
	'plb': 'a/vnd.3gpp.pic-bw-large',
	'png': 'i/png',
	'pnm': 'i/x-portable-anymap',
	'portpkg': 'a/vnd.macports.portpkg',
	'potm': 'a/vnd.ms-powerpoint.template.macroenabled.12',
	'potx': 'a/vnd.openxmlformats-officedocument.presentation.template',
	'ppam': 'a/vnd.ms-powerpoint.addin.macroenabled.12',
	'ppm': 'i/x-portable-pixmap',
	'ppsm': 'a/vnd.ms-powerpoint.slideshow.macroenabled.12',
	'ppsx': 'a/vnd.openxmlformats-officedocument.presentationml.slideshow',
	'ppt': 'a/vnd.ms-powerpoint',
	'pptm': 'a/vnd.ms-powerpoint.presentation.macroenabled.12',
	'pptx': 'a/vnd.openxmlformats-officedocument.presentationml.presentation',
	'prc': 'a/x-mobipocket-ebook',
	'prf': 'a/pics-rules',
	'psb': 'a/vnd.3gpp.pic-bw-small',
	'psd': 'i/vnd.adobe.photoshop',
	'pub': 'a/x-mspublisher',
	'pvb': 'a/vnd.3gpp.pic-bw-var',
	'py' : 'x/plain',
	'qt' : 'v/quicktime',
	'ra' : 'u/vnd.rn-realaudio, u/x-pn-realaudio',
	'ram': 'u/vnd.rn-realaudio, u/x-pn-realaudio',
	'rar': 'a/x-rar-compressed',
	'ras': 'i/x-cmu-raster',
	'reg': 'x/plain',
	'res': 'a/x-dtbresource+xml',
	'rgb': 'i/x-rgb',
	'rm' : 'a/vnd.rn-realmedia',
	'rms': 'a/vnd.jcp.javame.midlet-rms',
	'rpm': 'u/x-pn-realaudion-plugin',
	'rtf': 'a/rtf',
	'rtx': 'x/richtext',
	'rv' : 'v/vnd.rn-realvideo',
	's'  : 'x/x-asm',
	'ser': 'a/java-serialized-object',
	'sh' : 'x/plain',
	'shar': 'a/x-shar',
	'sis': 'a/vnd.symbian.install',
	'snf': 'a/x-font-snf',
	'spp': 'a/scvp-vp-response',
	'spq': 'a/scvp-vp-request',
	'src': 'a/x-wais-source',
	'srt': 'x/plain',
	'stc': 'a/vnd.sun.xml.calc.template',
	'std': 'a/vnd.sun.xml.draw.template',
	'sti': 'a/vnd.sun.xml.impress.template',
	'stl': 'a/vnd.ms-pki.stl',
	'stw': 'a/vnd.sun.xml.writer.template',
	'sub': 'i/vnd.dvb.subtitle',
	'swf': 'a/x-shockwave-flash',
	'sxc': 'a/vnd.sun.xml.calc',
	'sxd': 'a/vnd.sun.xml.draw',
	'sxg': 'a/vnd.sun.xml.writer.global',
	'sxi': 'a/vnd.sun.xml.impress',
	'sxm': 'a/vnd.sun.xml.math',
	'sxw': 'a/vnd.sun.xml.writer',
	'tar': 'a/x-tar',
	'thmx': 'a/vnd.ms-officetheme',
	'tif': 'i/tiff',
	'tiff': 'i/tiff',
	'torent': 'a/x-bittorent',
	'tpl': 'a/vnd.groove-tool-template',
	'trm': 'a/x-msterminal',
	'ttf': 'a/x-font-ttf',
	'txt': 'x/plain',
	'uri': 'x/uri-list',
	'vbs': 'x/plain',
	'vcd': 'a/x-cdlink',
	'vcf': 'x/x-vcard',
	'vcg': 'a/vnd.groove-vcard',
	'vcs': 'x/x-vcalendar',
	'vsd': 'a/vnd-visio',
	'wav': 'u/x-wav',
	'wax': 'u/x-ms-wax',
	'wbmp': 'i/vnd.wap.wbmp',
	'weba': 'u/webm',
	'webm': 'v/webm',
	'webp': 'i/webp',
	'wm' : 'v/x-ms-wm',
	'wma': 'u/x-ms-wma',
	'wmd': 'a/x-ms-wmd',
	'wmf': 'a/x-msmetafile',
	'wml': 'x/vnd.wap.wml',
	'wmlc': 'a/vnd.wap.wmlc',
	'wmls': 'x/vnd.wap.wmlscript',
	'wmlsc': 'a/vnd.wap.wmlscriptc',
	'wmv': 'v/x-ms-wmv',
	'wmx': 'v/x-ms-wmx',
	'wmz': 'a/x-ms-wmv',
	'woff': 'a/x-font-woff',
	'wpd': 'a/vnd.wordperfect',
	'wpl': 'a/vnd.ms-wpl',
	'wps': 'a/vnd.ms-works',
	'wri': 'a/x-ms-write',
	'wvx': 'v/x-ms-wvx',
	'xif': 'i/vnd.xiff',
	'xlam': 'a/vnd.ms-excel.addin.macroenabled.12',
	'xls': 'a/vnd.ms-excel',
	'xlsb': 'a/vnd.ms-excel.sheet.binary.macroenabled.12',
	'xlsm': 'a/vnd.ms-excel.sheet.macroenabled.12',
	'xlsx': 'a/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	'xltm': 'a/vnd/ms-excel.template.macroenabled.12',
	'xltx': 'a/vnd.openxmlformats-officedocument.spreadsheetml.template',
	'xml': 'a/xml',
	'xop': 'a/xop+xml',
	'xpi': 'a/x-xpinstall',
	'xps': 'a/vnd.ms-xpsdocument',
	'xslt': 'a/xslt+xml',
	'xsm': 'a/vnd.syncml+xml',
	'xspf': 'a/xspf+xml',
	'xul': 'a/vnd.mozilla.xul+xml',
	'xwd': 'i/x-xwindowdump',
	'yaml': 'x/yaml',
	'zip': 'a/zip'
}

console.log('');
console.log('--------------------------------------------------');
console.log(' Cross Platform Static Web Server');
console.log('');
console.log(" Design by ZulNs, @Yogyakarta, October 28'th 2015");
console.log('--------------------------------------------------');
console.log('');

var fs = require('fs');
var path = require('path');

var node = path.basename(process.argv[0]);
var thisfile = path.basename(__filename);
var rootDir = path.join(path.dirname(__filename), path.sep);
var rootDirName = path.basename(rootDir);
var port = DEFAULT_PORT;
var hostDir = process.cwd();
var resBufSize = DEFAULT_BUFFER_SIZE;
var password = '';
var isAllWinDrives = false;
var isGenerateWinReg = false;
var isWindows = process.platform === 'win32';

if (process.argv.length > 2) {
	if (process.argv[2] === '?') {
		console.log('USAGE:');
		console.log(node + ' ' + thisfile + ' ?');
		console.log(node + ' ' + thisfile + ' ' + P_WINREG + ' [' + P_PORT + 'xxx | ' + P_BUFFER + 'yyy | ' + P_SHUTDOWN + 'zz]');
		console.log(node + ' ' + thisfile + ' [' + P_PORT + 'xxx | ' + P_BUFFER + 'yyy | ' + P_SHUTDOWN + 'zzz] ["dir" | ' + P_WINALL + ']');
		console.log('');
		console.log('OPTIONS:');
		console.log(P_WINREG  + '    : Generates registry files for explorer context menu');
		console.log(          '        on Windows platform.');
		console.log(P_PORT     + '   : Assigns port number to xxx value,');
		console.log(          '        default value is %d.', DEFAULT_PORT);
		console.log(P_BUFFER   + '   : Assigns buffer size to yyy value in kB,');
		console.log(          '        default (min) value is %d and max value is %d.', DEFAULT_BUFFER_SIZE, MAX_BUFFER_SIZE);
		console.log(P_SHUTDOWN + '   : Sets zzz as a password to shutdown the server,');
		console.log(          '        accessed by /%s?%s=zzz from the client.', SHUTDOWN_COMMAND, SHUTDOWN_KEY);
		console.log(        '"dir" : Hosts this directory,');
		console.log(          '        default is current working directory.');
		console.log(P_WINALL  + '    : Hosts all logical drives on Windows platform.');
		process.exit();
	}
}

for (var i = 2; i < process.argv.length && i < 6; i++) {
	if (strCompare(process.argv[i].substr(0, P_PORT.length), P_PORT, false)) {
		port = parseInt(process.argv[i].substr(P_PORT.length));
		if (isNaN(port) || port < 0 || port > 65535) {
			port = DEFAULT_PORT;
		}
	}
	else if (strCompare(process.argv[i].substr(0, P_BUFFER.length), P_BUFFER, false)) {
		resBufSize = parseInt(process.argv[i].substr(P_BUFFER.length));
		if (isNaN(resBufSize) || resBufSize < DEFAULT_BUFFER_SIZE || resBufSize > MAX_BUFFER_SIZE) {
			resBufSize = DEFAULT_BUFFER_SIZE;
		}
	}
	else if (strCompare(process.argv[i].substr(0, P_SHUTDOWN.length), P_SHUTDOWN, false)) {
		password = process.argv[i].substr(P_BUFFER.length);
	}
	else if (strCompare(process.argv[i], P_WINALL, false)) {
		if (! isWindows) {
			console.log('The %s option only valid on Windows platform.', process.argv[i]);
			process.exit();
		}
		isAllWinDrives = true;
	}
	else if (strCompare(process.argv[i], P_WINREG, false)) {
		if (! isWindows) {
			console.log('The %s option only valid on Windows platform.', process.argv[i]);
			process.exit();
		}
		isGenerateWinReg = true;
	}
	else {
		hostDir = process.argv[i];
	}
}

if (isGenerateWinReg) {
	var hkc = 'HKEY_CLASSES_ROOT';
	var key = hkc + '\\Directory\\shell\\StartHosting';
	var regCommand = '@="cmd.exe /s /k ' + node + ' \\"' + process.argv[1].replace(/\\/g, '\\\\') + '\\"';
	if (port !== DEFAULT_PORT)
		regCommand += ' ' + P_PORT + port;
	if (resBufSize !== DEFAULT_BUFFER_SIZE)
		regCommand += ' ' + P_BUFFER + resBufSize;
	if (password !== '')
		regCommand += ' ' + P_SHUTDOWN + password;
	var reg = 'Windows Registry Editor Version 5.00\r\n';
	reg += '\r\n';
	reg += '[-' + key + ']\r\n';
	reg += '\r\n';
	reg += '[' + key + ']\r\n';
	reg += '@="Start hosting this folder"\r\n';
	reg += '"Icon"="imageres.dll,20"\r\n';
	reg += '\r\n';
	reg += '[' + key + '\\command]\r\n';
	reg += regCommand + ' \\"%V\\""\r\n';
	reg += '\r\n';
	key = hkc + '\\Drive\\shell\\StartHosting';
	reg += '[-' + key + ']\r\n';
	reg += '\r\n';
	reg += '[' + key + ']\r\n';
	reg += '@="Start hosting this drive"\r\n';
	reg += '"Icon"="imageres.dll,20"\r\n';
	reg += '\r\n';
	reg += '[' + key + '\\command]\r\n';
	reg += regCommand + ' %V\"\r\n';
	reg += '\r\n';
	key = hkc + '\\Drive\\shell\\StartHostingAll';
	reg += '[-' + key + ']\r\n';
	reg += '\r\n';
	reg += '[' + key + ']\r\n';
	reg += '@="Start hosting all logical drive"\r\n';
	reg += '"Icon"="imageres.dll,20"\r\n';
	reg += '\r\n';
	reg += '[' + key + '\\command]\r\n';
	reg += regCommand + ' ' + P_WINALL + '"\r\n';
	try {
		fs.writeFileSync(WINREG_INSTALL, reg);
		console.log('Generated: "%s"', WINREG_INSTALL);
	}
	catch (e) {
		console.log (e.message);
	}
	reg = 'Windows Registry Editor Version 5.00\r\n';
	reg += '\r\n';
	reg += '[-' + hkc + '\\Directory\\shell\\StartHosting' + ']\r\n';
	reg += '\r\n';
	key = hkc + '\\Drive\\shell\\StartHosting';
	reg += '[-' + key + ']\r\n';
	reg += '\r\n';
	reg += '[-' + key + 'All]\r\n';
	try {
		fs.writeFileSync(WINREG_UNINSTALL, reg);
		console.log('Generated: "%s"', WINREG_UNINSTALL);
	}
	catch (e) {
		console.log (e.message);
	}
	process.exit();
}

if (isAllWinDrives) {
	hostDir = WINROOT + path.sep;
}
else {
	try {
		hostDir = fs.realpathSync(hostDir);
		if (!fs.statSync(hostDir).isDirectory()) {
			console.log('Target is not a directory: "%s"', hostDir);
			process.exit();
		}
		hostDir = path.join(hostDir, path.sep);
		if (strCompare(hostDir, rootDir, ! isWindows)) {
			console.log('This directory cannot be hosted: "%s"', hostDir);
			process.exit();
		}
	}
	catch (e) {
		console.log(e.message);
		process.exit();
	}
}

console.log('Directory to host: "%s"', hostDir);
console.log('');
console.log('Buffer size: %d kB', resBufSize);
console.log('');
if (password !== '') {
	console.log('Password to shutdown: "%s"', password);
	console.log('');
}

require('http').createServer(httpListener).listen(port, function() {
    console.log('Server listening on: "http://localhost:%d"', port);
	console.log('');
});

function httpListener(req, res) {
	console.log('Req: "%s"', req.url);
	if (req.method !== 'GET') {
		return sendResponse(res, 405, {'Allow': 'GET'}, 'Method Not Allowed', false, null);
	}
	var reqUrl = require('url').parse(req.url);
	var url = decodeURIComponent(reqUrl.pathname);
	var query = decodeURIComponent(reqUrl.query);
	if (strCompare(url, '/' + SHUTDOWN_COMMAND, false)) {
		query = query.split('=');
		if (strCompare(query[0], SHUTDOWN_KEY, false)) {
			if (password !== '' && query.length > 1 && query[1] === password) {
				sendResponse(res, 503, null, 'Service Unavailable (Server Terminated)', false, null);
				process.exit();
			}
			else {
				return sendResponse(res, 400, null, 'Bad Request', false, null);
			}
		}
	}
	var avoidIndex = url.substr(-2) === '/*';
	if (avoidIndex) url = url.substr(0, url.length - 1);
	var target;
	if (strCompare(url.substr(1, ROOTNAME.length), ROOTNAME, false))
		target = path.join(hostDir, url.replace('/' + ROOTNAME, ''));
	else
		target = path.join(rootDir, url);
	if (isWindows)
		target = target.replace(/:$/, ':\\');
	var realPath = target;
	if (target.substr(0, WINROOT.length) === WINROOT) {
		realPath = target.replace(WINROOT + path.sep, '');
		if (realPath === '') {
			return serveDirectory(res, target, url);
		}
	}
	try {
		fs.accessSync(realPath, fs.R_OK);
	}
	catch (e) {
		console.log(e.message);
		return sendResponse(res, 404, null, 'Not Found', false, null);
	}
	var stat = fs.statSync(realPath);
	if (stat.isFile()) {
		if (strCompare(realPath, __filename, ! isWindows))
			return sendResponse(res, 403, null, 'Forbidden', false, null);
		return serveFile(res, req, realPath);
	}
	else {
		var index = findIndexFile(realPath);
		if (avoidIndex || index === null)
			return serveDirectory(res, realPath, url);
		return serveFile(res, req, path.join(realPath, index));
	}
}

function findIndexFile(target) {
	for (i in INDEX_FILES) {
		try {
			fs.accessSync(path.join(target, INDEX_FILES[i]), fs.R_OK);
			return INDEX_FILES[i];
		}
		catch (e) {
		}
	}
	return null;
}

function getMimeType(target) {
	var mime = MIME_TYPE[path.extname(target).substr(1).toLowerCase()];
	if (typeof mime === 'undefined') mime = MIME_DEFAULT_BINARY;
	mime = mime.replace(/a\//g, 'application/');
	mime = mime.replace(/i\//g, 'image/');
	mime = mime.replace(/u\//g, 'audio/');
	mime = mime.replace(/v\//g, 'video/');
	mime = mime.replace(/x\//g, 'text/');
	return mime;
}

function strCompare(str1, str2, cs) {
	if (str1.length !== str2.length) return false;
	return cs ? str1 === str2 : str1.toLowerCase() === str2.toLowerCase();
}

function repeatSpace(repeat) {
	for (var word = ''; word.length < repeat; word += ' '){}
	return word;
}

function readRange(range, totalLength) {
	if (typeof range === 'undefined' || range === null || range.length === 0)
		return null;
	var array = range.split(/bytes=(\d*)-(\d*)/);
	var r0 = parseInt(array[1]);
	var r1 = parseInt(array[2]);
	var result = {
		start: isNaN(r0) ? 0 : r0,
		end: isNaN(r1) ? totalLength - 1 : r1
	};
	return result;
}

function sendResponse(res, status, header, data, isStream, log) {
	res.writeHead(status, header);
	if (isStream)
		data.on('open', function() { data.pipe(res); });
	else {
		res.write(data);
		res.end();
	}
	if (log === null) log = data;
	console.log('Res: %d > %s', status, log);
	return null;
}

function serveFile(res, req, target) {
	var status;
	var header;
	var data;
	var isStream = true;
	var log;
	try {
		var stat = fs.statSync(target);
		var rangeReq = readRange(req.headers['range'], stat.size);
		log = '"' + target + '"';
		if (rangeReq === null) {
			status = 200;
			header = {
				'Content-Type': getMimeType(target),
				'Content-Length': stat.size,
				'Accept-Ranges': 'bytes'
			};
			data = fs.createReadStream(target, {bufferSize: resBufSize * 1024});
		}
		else {
			if (rangeReq.start > rangeReq.end || rangeReq.end >= stat.size) {
				status = 416;
				header = {'Content-Range': 'bytes */' + stat.size};
				data = null;
				isStream = false;
				log = 'Requested Range Not Satisfiable for ' + log;
			}
			else {
				status = 206;
				header = {
					'Content-Range': 'bytes ' + rangeReq.start + '-' + rangeReq.end + '/' + stat.size,
					'Content-Length': rangeReq.start === rangeReq.end ? 0 : rangeReq.end - rangeReq.start + 1,
					'Content-Type': getMimeType(target),
					'Accept-Ranges': 'bytes',
					'Cache-Control': 'no-cache'
				};
				data = fs.createReadStream(target, {
					bufferSize: resBufSize * 1024,
					start: rangeReq.start,
					end: rangeReq.end
				});
				log = 'Partial Content of ' + log;
			}
		}
	}
	catch (e) {
		status = 500;
		header = null;
		data = 'Internal Server Error';
		isStream = false;
		log = null;
		console.log(e.message);
	}
	return sendResponse(res, status, header, data, isStream, log);
}

function serveDirectory(res, target, url) {
	var list = {};
	var dirs = {};
	var files = {};
	var stat;
	if (url.substr(-1) !== '/') url += '/';
	if (target.substr(-1) !== path.sep) target += path.sep;
	var isRootDir = strCompare(target.substr(0, rootDir.length), rootDir, ! isWindows);
	var isParentRootDir = strCompare(target, path.join(path.dirname(rootDir), path.sep), ! isWindows);
	if (target === WINROOT + path.sep) {
		/*
		var drives = 'CDEFGHIJKLMNOPQRSTUVXYZ'.split('');
		var drive, i;
		for (i in drives) {
			drive = drives[i] + ':';
			try {
				fs.accessSync(drive + path.sep, fs.R_OK);
				stat = fs.statSync(drive + path.sep);
				dirs[drive + '/'] = { mtime: stat.mtime };
			}
			catch (e) {
			}
		}
		*/
		var drive;
		for (var i = 67; i <= 90; i++) {
			drive = String.fromCharCode(i) + ':';
			try {
				fs.accessSync(drive + path.sep, fs.R_OK);
				stat = fs.statSync(drive + path.sep);
				dirs[drive + '/'] = { mtime: stat.mtime };
			}
			catch (e) {
			}
		}
	}
	else if (! isRootDir) {
		var items = fs.readdirSync(target);
		var item;
		for (i in items) {
			item = items[i];
			try {
				stat = fs.statSync(path.join(target, item));
				if (stat.isFile()) {
					files[item] = {
						size: stat.size,
						mtime: stat.mtime
					};
				} else {
					if (! isParentRootDir || ! strCompare(item, rootDirName, ! isWindows))
						dirs[item] = { mtime: stat.mtime };
				}
			}
			catch (e) {
			}
		}
	}
	list.dirs = dirs;
	list.files = files;
	var json = JSON.stringify(list);
	return sendResponse(res, 200, {
		'Content-Type': 'application/json'
		//'Content-Length': json.length
	}, json, false, 'Index of "' + target + '"');
}
