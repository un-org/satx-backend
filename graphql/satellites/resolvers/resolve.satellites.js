import fetch from "node-fetch";

import dotenv from "dotenv";
dotenv.config();

import Satellite from "../../../models/satellite.js";

const DEF_LAT = 41.702;
const DEF_LNG = -76.014;
const DEF_ALT = 0;
const DEF_SECS = 2;
const DEF_SR = 70;
const DEF_CAT = 52;

const API_URL_1 = " https://www.n2yo.com/rest/v1/satellite";

export default {
    Query: {
        satellite: async function (_, args, { res }) {
            const response = await fetch(
                `${API_URL_1}/positions/${args.id}/${args.lat || DEF_LAT}/${
                    args.lng || DEF_LNG
                }/${args.alt || DEF_ALT}/${DEF_SECS}/&apiKey=${
                    process.env.API_KEY_1
                }`
            );

            const result = await response.json();

            if (result.error) {
                res.json({
                    err: "Could not fetch API. Check API key",
                });
            } else {
                return {
                    category: null,
                    satname: result.info.satname,
                    satid: result.info.satid,
                    launchDate: null,
                    source: null,
                    launchSite: null,
                    position: result.positions,
                };
            }
        },

        Satellites: async function (_, args, { res }) {
            const response = await fetch(
                `${API_URL_1}/above/${args.lat || DEF_LAT}/${
                    args.lng || DEF_LNG
                }/${args.alt || DEF_ALT}/${DEF_SR}/${args.catid}/&apiKey=${
                    process.env.API_KEY_1
                }`
            );

            const result = await response.json();

            if (result.error) {
                res.json({
                    err: "Could not fetch API. Check API key",
                });
            } else {
                const cat = result.info.category;
                let toServe = [];

                for (const sat of result.above) {
                    toServe.push(
                        new Satellite({
                            category: cat,
                            satname: sat.satname,
                            satid: sat.satid,
                            launchDate: sat.launchDate,
                            source: null,
                            launchSite: null,
                        })
                    );
                }

                return toServe;
            }
        },
    },
};
