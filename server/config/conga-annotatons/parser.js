
var parser = require('annotation-parser');

parser('controller.js', function(err, annotations){
        console.log(annotations);


})