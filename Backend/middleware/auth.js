import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {

    const token = req.headers['authorization']?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: "No token provided" });
    }
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token expired" });
            }
            return res.status(403).json({ message: "failed to authenticate token" });
        }

        req.user = decoded  //in your route  to identity which  user is making the request
        next(); // function used to pass control from one middleware to next middleware or router
    })
}
