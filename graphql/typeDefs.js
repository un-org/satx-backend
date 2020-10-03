import merge from "@graphql-tools/merge";
const { mergeTypeDefs } = merge;

import signup from "./user/types/signup.user.response.js";

const UserTypesArray = [signup];

export default mergeTypeDefs(UserTypesArray);
