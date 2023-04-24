const jwt = require('jsonwebtoken');

 const generateToken = (user) => {
    return jwt.sign(
        {
            id:user.id,
            email: user.email,
            
        }, 
         'secret', 
        {
            expiresIn: '7d'
        }
    )
};

module.exports ={
    generateToken
}