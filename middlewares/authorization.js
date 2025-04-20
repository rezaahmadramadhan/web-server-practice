const { Grocery } = require('../models')

async function onlyAuthor(req, res, next) {
    try {
        const { id } = req.params
        const groceries = await Grocery.findByPk(+id)
        
        if(!groceries) throw { name: "NotFound", message: "Data not found"}
        
        if(req.user.id !== groceries.UserId) throw { name: "Forbidden", message: "You are not authorized"}
        
        next()
    } catch (error) {
        next(error)
    }
}


module.exports = onlyAuthor