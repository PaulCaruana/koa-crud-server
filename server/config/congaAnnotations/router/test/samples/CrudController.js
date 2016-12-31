// src/my-bundle/lib/controller/default.js

/**
 * @Router
 */
function CrudController(){};

CrudController.prototype = {

    /**
     * @Route('/:userId', method='PUT')
     */
    put: function*(next){
        this.body = 'Update...';
    },
    /**
     * @Route('/:userId2')
     */
    get: function*(next){
        this.body = 'CRUD ' + this.params.id;
    }

};

module.exports = CrudController;