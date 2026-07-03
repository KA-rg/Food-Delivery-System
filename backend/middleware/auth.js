import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({success:false,message:'Not Authorized, Login Again'});
    }
    try {
        const token_decode =  jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
        // It tells Express:
        // Token is valid. Now proceed to the actual route handler that was supposed to run.
        // Without next(), the request stops right there and never reaches the route function like addToCart.
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}

export default authMiddleware;