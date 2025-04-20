const { User, Grocery } = require('../models');
const { signToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');

class Controller {
    static async register(req, res, next) {
        try {
            const user = await User.create(req.body)
            
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const {email, password} = req.body

            if (!email) throw {name: "BadRequest", message: "Email is required"}
            if (!password) throw { name: "BadRequest", message: "Password is required" }
            
            const user = await User.findOne({ where: { email }})
            if (!user) throw { name: "Unauthorized", message: "Invalid email/password" }
            
            const isValid = comparePassword(password, user.password)
            if (!isValid) throw { name: "Unauthorized", message: "Invalid email/password" }
            
            const access_token = signToken({id: user.id, email: user.email})
            
            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }

    static async getGrocery(req, res, next) {
        try {
            const { id } = req.user
            const data = await Grocery.findAll({where: {UserId: id}})

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    } 

    static async delGrocery(req, res, next) {
        try {
            const { id } = req.params
            const data = await Grocery.findByPk(+id)
            await data.destroy()         

            res.status(200).json({ message: "Grocery item has been deleted" })
        } catch (error) {
            next(error)
        }
    }

    static async createGrocery(req, res, next) {
        try {
            const {id} = req.user
            const {title, price, tag, imageUrl} = req.body
            
            const data = await Grocery.create({title, price, tag, imageUrl, UserId: id})
            console.log(data);
            
            res.status(201).json({
                "id": data.id,
                "title": data.title,
                "price": data.price,
                "tag": data.tag,
                "imageUrl": data.imageUrl,
                "UserId": data.UserId
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateGrocery(req, res, next) {
        try {
            const { id } = req.params

            await Grocery.update(req.body, {
                where: {id: +id}
            })
            
            res.status(200).json({ message: "Grocery item has been updated" })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = Controller