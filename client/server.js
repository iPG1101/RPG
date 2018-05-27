"use strict";

let http = require('http'),
	fs = require('fs');

http.createServer((q,s)=>{
	try{
		fs.readFile('./' + q.url,undefined,(e,d)=>{
			s.end((d||e.toString())||"");
		});
	} catch(e) {
		s.end(e);
	};
}).listen(1738);