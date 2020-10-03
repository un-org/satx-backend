import User from "../../../models/user.js";
import bcrypt from "bcrypt";
import TokenHandler from "../utils/TokenHandler.js";

export default {
    Query: {
        loginUser: async function (_, args, { res }) {
            const user = await User.findOne({
                username: args.username,
            });
            if (user) {
                const result = await bcrypt.compare(
                    args.password,
                    user.password
                );
                if (result) {
                    const accessToken = TokenHandler.createAccessToken(user);

                    if (accessToken) {
                        return {
                            message: "Successfully logged in.",
                            accessToken,
                        };
                    } else {
                        res.status(422);

                        return {
                            message: "Unable to create token.",
                            accessToken: null,
                        };
                    }
                } else {
                    return {
                        message: "Unable to login.",
                        accessToken: null,
                    };
                }
            } else {
                return {
                    message: "Unable to login.",
                    accessToken: null,
                };
            }
        },
    },
};
