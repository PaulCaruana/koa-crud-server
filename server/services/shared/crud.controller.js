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
        create: dao.create,
        /**
         * @Route('/:id', method='PUT')
         */
        replaceById: dao.replaceById,
        /**
         * @Route('/:id', method=['POST','PATCH'])
         */
        updateById: dao.updateById,
        /**
         * @Route('/:id', method='DELETE')
         */
        deleteById: dao.deleteById

    };
};

exports = module.exports = controller;
