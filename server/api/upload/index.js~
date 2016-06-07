'use strict';

import express from 'express';
import bodyParser from 'body-parser';
var router = express.Router();
let fs = require('fs')
let bmpEncoded = bodyParser.raw({type: 'image/bmp'})
let http = require('http')

//const image = __dirname + '/rsz_panda.bmp'
//let postImage2 = base64_encode(image)

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
		var bitmap = new Buffer(base64str, 'base64');
   	//return new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(__dirname + '/' + file, base64str);
    console.log('******** File created from base64 encoded string ********');
}

function postRequest(image){
	let  postOptions = {
      host: 'tk3.s3psis.net',
      port: '80',
      path: '/index.php',
      method: 'POST',
      headers: {
				'Content-Type': 'image/bmp',
        'Content-Length': Buffer.byteLength(image)
      }
 };
	console.log('inside')
  let response = ''
	let postReq = http.request(postOptions, (res) => {
 	 res.on('data', (chunk) => {
 	 	  console.log('Response chunk: ' + chunk)
			response += chunk; 			
		//response.push(chunk)
  	})
		res.on('end', () => {
			return response;
		})
	})

	postReq.write(image)
	postReq.end()
	//setTimeout(()=>{}, 10000)
}

router.post('/', bmpEncoded, function(req, res){
  let body = [];
  res.on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    // At this point, we have the headers, method, url and body, and can now
    // do whatever we need to in order to respond to this request.
  });
  //body = Buffer.concat(body).toString();
  console.log('request body');
	console.log(req.body);

  //let image = base64_decode(req.body)
	console.log('before post request')
  let buffer = new Buffer(req.body, 'base64')
  console.log(buffer)
  console.log('buffer length')
	console.log(Buffer.byteLength(buffer))

  // Begin POST REQUEST TO TK3

	console.log('inside')
 
  // write req.body to file bitmap
	base64_decode(req.body, 'newimage.bmp')	
  let newImage = base64_encode(__dirname + '/newimage.bmp')

	let  postOptions = {
      host: 'tk3.s3psis.net',
      port: '80',
      path: '/index.php',
      method: 'POST',
      headers: {
				'Content-Type': 'image/bmp',
        'Content-Length': Buffer.byteLength(newImage)
      }
  };

  let response = ''
	let postReq = http.request(postOptions, (r) => {
 	 r.on('data', (chunk) => {
 	 	  console.log('Response chunk: ' + chunk)
			response += chunk; 			
		//response.push(chunk)
  	})
		r.on('end', () => {
			console.log('final response' + response)
			return res.status(200).send(response)
			//return response;
		})
	})
	
	//let newImage = base64_encode(__dirname + '/newimage.bmp')
	console.log('new image to be sent')
	//console.log(newImage)

 	postReq.write(newImage)
	postReq.end()

	// END TK3

});

module.exports = router;
