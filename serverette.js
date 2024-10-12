/*	MIT License
	Copyright (c) 2024, Emnawer and others (https://github.com/emnawer) */
let http=require("http"),path=require("path"),fs=require("node:fs"),url=require("node:url");function resFile(e,o,l,t){"/"==e&&(e="/index.htm");t=path.join(t,e);fs.readFile(t,(e,t)=>{e?(o.writeHead(404,{"Content-Type":"text/html"}),o.write("<h1>404 Not Found</h1>")):(o.writeHead(200,{"Content-Type":l,"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"}),o.write(t)),o.end()})}var mimeList=[{regex:/\/$|index\.(html|htm)$/,type:"text/html"},{regex:/\.txt/,type:"text/plain"},{regex:/\.css/,type:"text/css"},{regex:/\.js/,type:"text/javascript"},{regex:/\.htm/,type:"text/html"},{regex:/\.html/,type:"text/html"},{regex:/\.png/,type:"image/png"},{regex:/\.jpg/,type:"image/jpeg"},{regex:/\.jpeg/,type:"image/jpeg"},{regex:/\.gif/,type:"image/gif"},{regex:/\.svg/,type:"image/svg+xml"},{regex:/\.ico/,type:"image/x-icon"},{regex:/\.xml/,type:"text/xml"},{regex:/\.json/,type:"application/json"},{regex:/\.eot/,type:"text/vnd.ms-fontobject"},{regex:/\.ttf/,type:"font/ttf"},{regex:/\.woff/,type:"font/woff"},{regex:/\.woff2/,type:"font/woff2"},{regex:/\.otf/,type:"font/otf"},{regex:/\.mp3/,type:"audio/mp3"},{regex:/\.mp4/,type:"video/mp4"}],callbacks={get:function(e,t){console.log("============================="),console.log("URL(GET) parameters found!"),console.log(e),e.forEach((e,t)=>{console.log(t,e)}),console.log("=============================")},head:function(e,t){console.log("HEAD:",e)},post:function(e,t){console.log("POST:",e),t.writeHead(200,{"Content-Type":"text/html"}),t.end("POST data received!")},put:function(e,t){console.log("PUT:",e)},delete:function(e,t){console.log("DELETE:",e)},options:function(e,t){console.log("OPTIONS:",e)},patch:function(e,t){console.log("PATCH:",e)}};let serverette=function(n,e,t,r){var c;null==n?console.error("ERROR: Root directory not specified!"):(c=[{method:"GET",callback:(r=r||callbacks).get},{method:"HEAD",callback:r.head},{method:"POST",callback:r.post},{method:"PUT",callback:r.put},{method:"DELETE",callback:r.delete},{method:"OPTIONS",callback:r.options},{method:"PATCH",callback:r.patch}],t instanceof Array&&mimeList.concat(t),e=e||8080,console.log("Serverette port #:",e),console.log("======================"),http.createServer(function(t,l){if("GET"==t.method){var e=new URL("http://localhost"+t.url);""!==e.search&&r.get(e.searchParams);let o=t.url.split("?")[0];mimeList.map(function(t){if(t.regex.test(o))try{resFile(o,l,t.type,n),console.log("GET:",o,"MIME:",t.type)}catch(e){console.error("GET:",o,"MIME:",t),console.error("ERROR:",e.message)}})}else for(let e=1;e<c.length;e++){var o;t.method==c[e].method&&(o=[],t.on("data",function(e){o.push(e.toString())}),t.on("end",function(){c[e].callback(o,l)}))}}).listen(e))};module.exports={serverette:serverette,callbacks:callbacks};