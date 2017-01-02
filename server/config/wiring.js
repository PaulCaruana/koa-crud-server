'use strict';

var wiring = function (injectables, locator) {
    Function.prototype.construct = function (aArgs) {
        var oNew = Object.create(this.prototype);
        this.apply(oNew, aArgs);
        return oNew;
    };

    for (var id in injectables) {
        getObject(id);
    }

    function getObject(id, callChain) {
        // Check if object exists in service locator
        var obj = locator[id];
        if (obj) {
            return obj;
        }

        // Check if circular reference
        callChain = callChain || [];
        if (callChain.indexOf(id) > -1) {
            throw new Error('Detected circular reference: ' + id + "(Chain: " + callChain + ")");
        }
        callChain.push(id);

        // Find injectable
        var injectable = injectables[id];
        if (!injectable) {
            throw new Error('Wiring reference: ' + id + " is undefined");
        }

        // Determine if obj or function
        var fnObj = require(injectable.filePath);
        if (typeof fnObj != "function") {
            var obj = fnObj;
            locator.register(id, obj);
            return obj;
        };

        // Load params
        var fn = fnObj;
        var fnParamNames =  getParamNames(fn);
        var params = injectable.params || [];
        var fnParamValues = [];
        fnParamNames.forEach(function(fnParamName) {
            var paramId = params[fnParamName];
            var fnParamValue = (paramId)? getObject(paramId, callChain) : null;
            fnParamValues.push(fnParamValue)
        });

        // Create object
        obj = fn.apply(null, fnParamValues);
        if (typeof obj === "undefined") {
            obj = fn.construct(fnParamValues);
        }
        if (injectable.singleton === true) {
            locator.register(id, obj);
        }
    };

    function getParamNames(func) {
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;
        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if(result === null)
            result = [];
        return result;
    }


};
exports = module.exports = wiring;