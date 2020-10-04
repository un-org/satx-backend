import merge from "@graphql-tools/merge";
const { mergeTypeDefs } = merge;

// user
import signup from "./user/types/signup.user.response.js";
import login from "./user/types/login.user.response.js";

// satelltes
import satellites from "./satellites/types/satellites.data.js";

const UserTypesArray = [signup, login];
const SatellitesTypesArray = [satellites];

const types = UserTypesArray.concat(SatellitesTypesArray);

export default mergeTypeDefs(types);
