import merge from "@graphql-tools/merge";
const { mergeResolvers } = merge;

import signup from "./user/resolvers/signup.user.js";
import login from "./user/resolvers/login.user.js";

import satellites from "./satellites/resolvers/resolve.satellites.js";

const UserResolversArray = [signup, login];
const SatellitesResolversArray = [satellites];

const types = UserResolversArray.concat(SatellitesResolversArray);

export default mergeResolvers(types);
