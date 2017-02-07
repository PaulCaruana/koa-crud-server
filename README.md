# koa-crud-server

Koa CRUD Server wired up with annotated Dependency Injection + Routing with MongoDB/Mongoose and Mocha tests.

## Architecture

0. Functionality is grouped under folders and is designed easily replace layers. For example, to swap out a different DB offering or even different middleware.
0. Uses Object Oriented techniques like inheritance and aggregation.

### Annotations

This server uses Conga annotations (extended to annotate generators and function in form of sample below) and are place in comments are constructor, functions or properties.

```javascript
/**
 * @Injectable
 * @Inject(dao="userData['dao']")
 * @Router(prefix="/users", nested="CrudController")
 */
exports = module.exports = (function UserController() {
    var crudController = require('../shared/crud.controller'); //extends crudController
    return function UserController(dao) {
        return Object.assign(crudController(dao), {
            /**
             * @Route('/hello')
             */
            hello: function*(next) {
                yield next;
                this.body = {"hello" : "world"};
            }
        })
    };
})();

/**
 * @Router
 */
var controller = function CrudController(dao) {
    return {
        /**
         * @Route('')
         */
        findAll: dao.findAll,
        /**
         * @Route('/:id')
         */
        findById: dao.findById,
        /**
         * @Route('/', method=['PUT','POST'])
         */
        create: dao.create,...
    };
};

exports = module.exports = controller;

```

#### Depencency Injection
```
Type: @Injectable
Purpose: Flags this module to be created and then stores in object repository (application.locator) referenced by id.
Usage: Once an object is stored in repository it can injected with @inject annotation or alternative can be referenced with application.locator(id).
Location: Constructor
Parameters: 
    id: The name of the injectable, defaults to module function name.
    singleton: Determines if object is instantiated or is object. Defaults to false.

Type: @Inject
Purpose: Get object from object repository based on specified id and inject object(s) into a module's constructor.
Usage: Constructor Dependency Injection
Location: Constructor
Parameters: One to many key/values pairs where variable name = id or variable name = id[property] eg. dao="userDao" or dao="userDao['dao']" 
    
Config:
Set what folder(s) and are to scanned for dependency injection. In config/index.js:

wiring: {
    scan: [...] eg, ["services/**/*.js, another-folder/**/*.js"]
}   
```
#### Routing
```
Type: @Router 
Purpose: Flagged and scan module for routable functions
Usage: Use in conjunction with @Route annotation to assign route to functions
Location: Constructor
Parameters: 
    prefix: API endpoint prefix eg. '/users' - Optional
    nested: Scan inherited or aggregated as child module - Optional
    
Type: @Route
Purpose: Add assigned route and optionally REST method(s) to function
Usage: State what API endpoint is assigned to a function
Location: Function
Parameters:
    implicit path eg '/:id' where API path would be prefix/:id eg. /users/1234
    method: REST eg 'GET', 'PUT', 'POST', 'DELETE' or 'PATCH'. Can be one or many eg METHOD='GET' or METHOD=['GET', 'POST'] - Defaults to GET

Config:
Set what folder(s) and are to scanned for dependency injection. In config/index.js:

routing: {
    scan: [...] eg, ["services/**/*.js, another-folder/**/*.js"]
}
```
### Prerequisite

* [NodeJS](http://nodejs.org/download/) > 4.0.0
* [npm](https://www.npmjs.org/)
* [MongoDB](http://www.mongodb.org/downloads)

### Installation

0. Checkout in a directory
0. `npm install`

### Running the project

To run the project, you need two terminals.

0. Start Server `npm start`
0. Try access `localhost:8000` or `localhost:8443`
0. APIs: 'localhost:8000/users/hello' will return {hello:world} JSON. Refer to crud.controller.js for CRUD API calls.


**Run Tests**

`npm  test`

### License

The plugin is under MIT license, please see the LICENSE file provided with the module.

### Soon

Updates to come when I get some time:

 - Angular Client side example
 - React Client Side example
 - Login and security model
 - Server side rendering with prod webpack config
 - Redux
 - ES6/Babel server side
