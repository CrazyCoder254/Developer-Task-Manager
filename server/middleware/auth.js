const jwt = require("jsonwebtoken")

//Checks token and sets req.user

exports.protect = (req,res,next) =>{
    const auth = req.headers.authorization;

    if(!auth || !auth.startsWith("Bearer ")) 
        return res.status(401).json({message: "No token given"})

    const token = auth.split("")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded; //attach {id, role} with the token
        next();
    } catch (error) {
        return res.status(403).json({message: "invalid token"})
    }
}

exports.authorize = (roles) =>{
    return(req, res, next) =>{
        if (!roles.includes(req.user.role))
            return res.status(403).json({message: "Forbidden"})
        next();
    }
}