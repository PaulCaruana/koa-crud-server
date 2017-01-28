/**
 * @Injectable("userData")
 */
exports = module.exports = (function UserData() {
    var mongoose = require('mongoose');
    var genericDao = require("../shared/generic.dao.mongoose");
    var Schema = mongoose.Schema;
    var id = "User";
    var definition = {
        name: {type: String, required: true},
        active: Boolean,
        role: {type: String, default: 'user', required: true},
        password: String,
        provider: String
    };
    var schema = createSchema(definition);

    return {
        definition: definition,
        schema : schema,
        model : mongoose.model(id, schema),
        get dao() {
            var dao = genericDao(this.model);
            return dao;
        }
    };

    //------------------------------------------------------------
    function createSchema(definition) {
        var schema = new Schema(definition);
        return schema;
    }
})();
