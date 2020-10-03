import merge from "@graphql-tools/merge";
const { mergeResolvers } = merge;

import signup from "./user/resolvers/signup.user.js";

const UserResolversArray = [signup];

export default mergeResolvers(UserResolversArray);
