import User from "../../../models/user.js";
import bcrypt from "bcrypt";
import TokenHandler from "../utils/TokenHandler.js";
import validateCreds from "../utils/validateCreds.js";

export default {
    Mutation: {
        signupUser: async function (_, args, { res }) {
            if (
                validateCreds({
                    username: args.username,
                    password: args.password,
                })
            ) {
                const hashedPass = await bcrypt.hash(args.password, 10);

                const user = new User({
                    username: args.username,
                    password: hashedPass,
                });

                try {
                    await user.save();

                    const accessToken = TokenHandler.createAccessToken(user);

                    if (accessToken) {
                        return {
                            message: "Successfully signed up.",
                            accessToken,
                        };
                    } else {
                        res.status(422);

                        return {
                            message: "Unable to create token.",
                            accessToken: null,
                        };
                    }
                } catch {
                    res.status(401);

                    return {
                        message:
                            "Unable to signup. Credentials are already taken.",
                        accessToken: null,
                    };
                }
            } else {
                res.status(400);
                return {
                    message: "Invalid credentials. Please try again.",
                    accessToken: null,
                };
            }
        },
    },
};
