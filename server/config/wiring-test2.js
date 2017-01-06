var _ = require('lodash');
var inherits = require('util').inherits
var Animal = function (firstName) {
    this.firstName = firstName;
    this.walked = false;
};


Animal.prototype = {
    walk: function () {
        console.log(this.firstName + ' is walking...')
        this.walked = true;
    },
    hasBeenWalked: function hasBeenWalked() {
        return this.walked
    }


}

var Cat = function (name) {
    Animal.apply(this, arguments)
};

Cat.prototype = {
    walk: function () {
        console.log(this.firstName + ' is walking too...')
        this.walked = true;
    },
    run: function () {
        console.log(this.firstName + ' is running...')
    },
    lasagna: function () {
        console.log('lasagna!');
        this.walked = true;
    }
};
inherits(Cat, Animal);

//Cat.prototype = _.create(Animal.prototype, Cat.prototype)
/*
 var garfield = new Cat("Garfld")
 console.log(garfield.hasBeenWalked())
 garfield.walk()
 console.log(garfield.hasBeenWalked())
 */
var MyClass = (function () {
    var MyClass = function (something) {
        this.something = something;
        console.log(this.something)
    }


    MyClass.prototype = {
        myMethod: function (arg) {
            this.arg = arg;
            console.log(this.something + arg)
            return this.arg;
        }
    }

    // You were missing this
    return MyClass;
})();

function createInstanceWithArguments (fConstructor, aArgs) {
    var obj = Object.create(fConstructor.prototype);
    fConstructor.apply(obj, aArgs);
    return obj;
}
var myClass = createInstanceWithArguments (MyClass, ["con"])
myClass.myMethod("prop");
//console.log(myClass.fred)