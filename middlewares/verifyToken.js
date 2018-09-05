const jwt = require('jsonwebtoken');

function verifyToken(req,res,next) {
    if (req.headers.token){
        jwt.verify(req.headers.token,process.env.SECRET,(err,doc)=>{
            if (err) console.log(err);
            req.user = doc;
            next();
        });
    }
    else res.status(400).send("please sign-in");

}
module.exports = verifyToken;