function errorHandler(error, req, res, next) {
    // console.log(error);
    
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: error.errors[0].message})
    }

    if (error.name === "BadRequest") {
        res.status(400).json({ message: error.message})
    }

    if (error.name === "Unauthorized") {
        res.status(401).json({ message: error.message})
    }

    if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" })
    }

    if (error.name === "NotFound") {
        res.status(404).json({ message: error.message})
    }

    if (error.name === "Forbidden") {
        res.status(403).json({ message: error.message})
    }

    res.status(500).json({ message: "Internal Server Error" })
}

module.exports = errorHandler