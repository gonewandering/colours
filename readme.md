# Colours: Get primary colors from images using node
A simple node module for extracting colors from images in node.

## Installation
``` var colours = require("colours"); ```

## Methods

### colours.rgb(imgUrl, numberOfColors, callback)
Gets colors in RGB format

``` 
var colours = require("colours");

colours.rgb('path/to/img', 9, function (err, arr) { 
  console.log(arr);
}); 
```

### colors.hsl(imgUrl, numberOfColors, callback)
Gets colors in HSL format

``` 
var colours = require("colours");
  
colours.hsl('path/to/img', 9, function (err, arr) { 
  console.log(arr);
}); 
```
