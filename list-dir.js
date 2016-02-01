
/*****************************************************************
 * CROSS PLATFORM STATIC WEB SERVER                              *
 *                                                               *
 * Run at command prompt:                                        *
 *    node server.js                                             *
 *                                                               *
 * Design by ZulNs                                               *
 * @Yogyakarta, 28'th October 2015                               *
 *****************************************************************/

var fs = require('fs');
var path = require('path');
var target = (process.argv.length > 2) ? process.argv[2] : process.cwd();

try {
	fs.accessSync(target, fs.R_OK);
}
catch (e) {
	console.log(e.message);
	process.exit();
}

var dirs = [];
var files = {};
var stat;
var fnlen = 0;
var szlen = 0;
var len;
var body = "<!doctype html>";
body += "<html lang='en'>\n";
body += "<head>\n";
body += "<meta charset='utf-8'>\n";
body += "<title>Static Web Server</title>\n";
body += "<style type='text/css'>\n";
body += "a:link{\n";
body += "color: MidnightBlue;\n"
body += "text-decoration: none;\n";
body += "}\n";
body += "a:visited{\n";
body += "color: Brown;\n"
body += "text-decoration: none;\n";
body += "}\n";
body += "a:link:active, a:visited:active{\n";
body += "color: OrangeRed;\n"
body += "text-decoration: underline;\n";
body += "}\n";
body += "pre{\n";
body += "font-size: 18px;\n";
body += "}\n";
body += ".right{\n";
body += "float: right;\n";
body += "margin-right: 10px;\n";
body += "font: 14px arial, sans-serif;\n";
body += "color: #f0f0ff;\n";
body += "background: #204030;\n";
body += "border: 4px solid #203040;\n";
body += "}\n";
body += "</style>\n";
body += "</head>\n";
body += "<body bgcolor='#f0f0ff' text='#203040'>\n";
body += "<h3>Index of&nbsp;&nbsp;" + path.basename(target) + "</h3>\n";
body += "<hr><pre><code><b>\n";
body += '<a href=\"../\">../</a>\n';
var items = fs.readdirSync(target);
for (i in items) {
	try {
		stat = fs.statSync(path.join(target, items[i]));
		if (stat.isFile()) {
			files[items[i]] = stat.size.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
				// Add digit grouping to the file size
			len = items[i].length;
			if (len > fnlen) fnlen = len;
			len = files[items[i]].length;
			if (len > szlen) szlen = len;
		} else {
			dirs[dirs.length] = items[i] + '/';
			len = items[i].length + 1;
			if (len > fnlen) fnlen = len;
		}
	}
	catch (e) {
	}
}
for (i in dirs) {
	body += '<a href=\"' + encodeURI(dirs[i]) + '\">' + dirs[i] + '</a>\n';
}
body += "</b>\n";
len = fnlen + szlen + 5;
for (file in files) {
	body += '<a href=\"' + encodeURI(file) + '\">' + file + '</a>';
	var spaces = '';
	for (; spaces.length < len - file.length - files[file].length; spaces += ' ') {}
	body += spaces + files[file] + '\n';
}
body += "</code></pre><hr>\n";
body += "<div class='right'>Design by ZulNs, @Yogyakarta, October 28'th 2015</div>\n";
body += "</body>\n";
body += "</html>";
target = path.join(target, 'index.html');
fs.writeFileSync(target, body);
console.log('Generated : \"%s\"',target);
