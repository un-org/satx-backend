import merge from "@graphql-tools/merge";
const { mergeTypeDefs } = merge;

import signup from "./user/types/signup.user.response.js";
import login from "./user/types/login.user.response.js";

const UserTypesArray = [signup, login];

export default mergeTypeDefs(UserTypesArray);
