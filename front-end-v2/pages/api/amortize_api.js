// import { NextApiRequest, NextApiResponse } from "next/types";

import { fetchNFTData } from "../../stacks-calls/gaia_storage";
import { Storage } from "@stacks/storage";
import { useRouter } from "next/router";
// import { userSession } from "../_app";
import { UserSession } from "@stacks/connect";
import { AppConfig } from "@stacks/connect";
import { storage, userSession } from "../../stacks-calls/auth";
import { string } from "prop-types";
// import { userSession } from "../_app";
// import { nodeUserSession } from "../../stacks-calls/auth";

const nftData = "nftdata.json";

// const storage = new Storage({ userSession });

// var client = require('../index');

export default async function (req, res) {
  // try {
  //     console.log(window.localStorage.getItem('us'));
  //     console.log(userSession);
  //     console.log(storage);
  //   const nftInfoJSON = await storage.getFile(nftData);
  //   if (nftInfoJSON) {
  //     const json = JSON.parse(nftInfoJSON);
  //     console.log(json);
  //     // return json.nfts;
  //   }
  // } catch (error) {
  //   console.log(error);
  //   // return [];
  // }
//   const router = useRouter();
//    const userData = req.query.data;

//    const appConfig = new AppConfig(["store_write", "publish_data"]);

//    const userSession = new UserSession({ appConfig });

//    const storage = new Storage({ userSession });

//    const storage2 = new Storage({ userSession: userData});
    console.log(userSession);

    const data =  await fetchNFTData(userSession);
//    try {
//     const nftInfoJSON = await storage.getFile(nftData);
//     if (nftInfoJSON) {
//       const json = JSON.parse(nftInfoJSON);
//       console.log(json);
//       // return json.nfts;
//     }
//   } catch (error) {
//     console.log(error);
//     // return [];
//   }


    // console.log(storage);
    // console.log(userData);

  // console.log(userData);

  res.json({
    data: true,
  });
}
