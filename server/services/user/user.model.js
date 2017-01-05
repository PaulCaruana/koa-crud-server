/**
 * @Injectable("userModel")
 */
exports = module.exports = (function UserModel() {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var id = "User";
    var definition = {
        name: {type: String, required: true},
        info: String,
        active: Boolean,
        role: {type: String, default: 'user', required: true},
        hashedPassword: String,
        provider: String,
        salt: String
    };
    var schema = createSchema(definition);

    return {
        definition: definition,
        schema : schema,
        model : mongoose.model(id, schema)
    };

    //------------------------------------------------------------
    function createSchema(definition) {
        var schema = new Schema(definition);
        return schema;
    }

})();
