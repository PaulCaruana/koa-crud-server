
 function Rabbit(name) {
 this.jump = function() {
 console.log(name + " jumped!")
 }
 }

function Rabbit2(name) {
    return {
        jump: function () {
            console.log(name + " jumped!!")
        }
    }
}
/*

 Function.prototype.construct = function (aArgs) {
 var oNew = Object.create(this.prototype);
 this.apply(oNew, aArgs);
 return oNew;
 };

 var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
 var ARGUMENT_NAMES = /([^\s,]+)/g;
 function getParamNames(func) {
 var fnStr = func.toString().replace(STRIP_COMMENTS, '');
 var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
 if(result === null)
 result = [];
 return result;
 }
 */

var myArray = ['Jack!'];
rabbit = Rabbit.apply(null, myArray)

console.log(rabbit)
//rabbit.jump();