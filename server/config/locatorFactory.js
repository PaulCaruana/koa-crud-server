'use strict';

exports = module.exports = function (injectables, application) {
    Function.prototype.construct = function (aArgs) {
        var oNew = Object.create(this.prototype);
        this.apply(oNew, aArgs);
        return oNew;
    };

    var locator = {
        store: {},
        register: function (id, obj) {
            this.store[id] = obj;
        },
        get: getObjectProperty,
        getObject : getObject
    };
    return locator;

    function getObjectProperty(idProp) {
        if (idProp) {
            var ID_PROP = /(.*)\[[\'|\"](.*)[\'|\"]\]/;
            var match = idProp.match(ID_PROP);
            if (match) {
                var id = match[1];
                var prop = match[2];
                var obj = this.getObject(id);

                if (obj) {
                    return obj[prop];
                }
            } else {
                var id = idProp
                return this.getObject(id);
            }
        } else {
            return null;
        }
    }

    function getObject(id, callChain) {
        // Check if object exists in service locator
        var obj = this.store[id];
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
            this.register(id, obj);
            return obj;
        }
        ;

        // Load params
        var fn = fnObj;
        var fnParamNames = getParamNames(fn);
        var params = injectable.params || [];
        var fnParamValues = [];
        var self = this;
        fnParamNames.forEach(function (fnParamName) {
            var paramId = params[fnParamName];
            var fnParamValue = (paramId) ? self.get(paramId, callChain) : null;
            fnParamValues.push(fnParamValue)
        });

        // Create object
        obj = fn.apply(null, fnParamValues);
        if (typeof obj === "undefined") {
            obj = fn.construct(fnParamValues);
        }
        if (injectable.singleton === true) {
            this.register(id, obj);
        }
        return obj;
    };

    function getParamNames(func) {
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;
        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if (result === null)
            result = [];
        return result;
    }
};
