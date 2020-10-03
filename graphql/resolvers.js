import merge from "@graphql-tools/merge";
const { mergeResolvers } = merge;

import signup from "./user/resolvers/signup.user.js";
import login from "./user/resolvers/login.user.js";

const UserResolversArray = [signup, login];

export default mergeResolvers(UserResolversArray);
