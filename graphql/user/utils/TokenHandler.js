import jwt from "jsonwebtoken";

class TokenHandler {
    static createAccessToken(user) {
        const payload = {
            _id: user._id,
            username: user.username,
            type: "access",
        };

        try {
            return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "15m",
            });
        } catch {
            return undefined;
        }
    }

    static checkHeaderToken(req, res, next) {
        // checking the token in the req header
        const authHeader = req.get("authorization");

        if (authHeader) {
            const token = authHeader.split(" ")[1];

            if (token) {
                // verify the token
                jwt.verify(
                    token,
                    process.env.ACCESS_TOKEN_SECRET,
                    (err, user) => {
                        // this can be avoided but it is more readable
                        if (err) {
                            req.user = undefined;
                            next();
                        } else {
                            req.user = user; // we can access the user in every req
                            next();
                        }
                    }
                );
            } else {
                next();
            }
        } else {
            next();
        }
    }

    static verifyAccessToken(token) {
        let decoded = null;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (!err) decoded = payload;
        });

        return decoded;
    }
}

export default TokenHandler;
