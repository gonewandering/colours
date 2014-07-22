module.exports = new function colours() { 

	var gm = require("gm");
	var async = require('async');
	var converter = require("color-convert")();

	this.get = function (img, num, format, callback) { 

		var nxn = Math.ceil(Math.sqrt(num));

		var matrix = [];
		var m = 0, n = 0;

		while (m < nxn) { 
			n = 0;
			while (n < nxn) {
				var im = gm(img).setFormat('ppm').resize(nxn, nxn);
				matrix.push(im.crop(1,1,m,n));
				n++;
			}
			m++;
		}

		async.map(matrix, this.pixel, function (err, arr) { 
			callback(err, arr);
		});
	}

	this.pixel = function (pixel, format, callback) { 
	    pixel.toBuffer(function (err, buffer) {

	        var color = converter.rgb(buffer.readUInt8(buffer.length - 3),
	            			buffer.readUInt8(buffer.length - 2),
	        				buffer.readUInt8(buffer.length - 1));

	        if (format == "rgb") { 
	        	callback(err, color);
	        } else if (format == "hsl") { 
	        	callback(err, color.hsl());
	        }
	    });
	}

	this.rgb = function (img, num, callback) { 
		this.get(img, num, "rgb", callback);
	}

	this.hsl = function (img, num, callback) { 
		this.get(img, num, "hsl", callback);
	}
}();

