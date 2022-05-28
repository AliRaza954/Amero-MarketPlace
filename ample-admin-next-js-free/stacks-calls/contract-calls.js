import { networkType, myStxAddress, getUserData } from "./auth";
import { userSession } from "../pages/_app";
import {
  callReadOnlyFunction,
  cvToJSON,
  standardPrincipalCV,
  stringAsciiCV,
  bufferCV,
  responseErrorCV,
  responseOkCV,
  trueCV,
  falseCV,
  uintCV,
  intCV,
  FungibleConditionCode,
  makeStandardSTXPostCondition,
} from "@stacks/transactions";

import { Storage } from "@stacks/storage";

import { openContractCall } from "@stacks/connect";

import { createSha2Hash } from "@stacks/encryption";
// import { v4 as uuidv4 } from "uuid";

// import { fetchUserInfo } from "./profile";

// import { fetchEquityInfo } from "./equity-info";

// import Email from "./smtp";

import {
  NonFungibleConditionCode,
  createAssetInfo,
  makeStandardNonFungiblePostCondition,
  makeContractNonFungiblePostCondition,
  bufferCVFromString,
  makeContractSTXPostCondition,
} from "@stacks/transactions";

// import Logo from "../assets/img/Amortize-pics/amortize-nft-logo.jpeg"
// import { fetchHomeInfo } from "./home-reg";
// import { getBTC, getSTX } from "./crypto-api";
import { saveNFTData, saveNFTPic } from "./gaia_storage";
// import { superUser } from "./auth";
// import { homedir } from "os";

const ContractDeployerAddress = "ST2C20XGZBAYFZ1NYNHT1J6MGMM0EW9X7PFZZEXA6";
const marketPlaceName = "amero-market";
const sip_010_ft = "sip-010-ft";
const sip_009_nft = "sip-009-nft";

// var download = function (data) {
//   var link = document.createElement('a');
//   link.download = 'amortize-nft-logo.jpeg';
//   link.href = data;
//   link.click();
// }

// function generatePicNFT(Equity, HomeAddress) {
//   const valueOfHome = "Value of Home:" + Equity.ValueOfHome;
//   const Loan = "Loan:" + Equity.CurrentMorgageBalance;
//   const length = "Term Length:" + Equity.TermLength;
//   const country = "Estate:" + HomeAddress.Estate;
//   var c = document.createElement("canvas");
//   c.width = 300;
//   c.height = 500;
//   // var c = document.getElementById("myCanvas");
//   var ctx = c.getContext("2d");
//   ctx.fillStyle = "white";
//   ctx.fillRect(0, 0, c.width, c.height);
//   // var img = document.createElement('img');
//   var img = new Image();
//   img.crossOrigin = 'anonymous';
//   img.src = Logo;

//   img.onload = () => {
//     ctx.drawImage(img, c.width / 3, 50, 100, 100);
//     ctx.fillStyle = "red";
//     ctx.textAlign = "center";
//     ctx.fillText(valueOfHome, 150, c.height / 2);
//     ctx.fillText(Loan, 150, c.height / 2 + 50);
//     ctx.fillText(length, 150, c.height / 2 + 100);
//     ctx.fillText(country, 150, c.height / 2 + 150);
//     var dataURL = c.toDataURL("image/jpeg", 1.0);
//     download(dataURL);
//   }

// }
export default async function appCallReadOnlyFunction(optionsProps) {
  if (!optionsProps)
    return new Promise((resolve, reject) => reject("no arguments provided"));

  const options = {
    ...optionsProps,
    network: networkType(),
    senderAddress: myStxAddress(),
  };

  return callReadOnlyFunction(options)
    .then((response) => {
      const responseJson = cvToJSON(response);

      return new Promise((resolve, reject) => resolve(responseJson));
    })
    .catch((e) => {
      return new Promise((resolve, reject) => reject(e));
    });
}

async function appCallPublicFunction(optionsProps) {
  if (!optionsProps)
    return new Promise((resolve, reject) => reject("no arguments provided"));

  const options = {
    ...optionsProps,
    network: networkType(),
    appDetails: {
      name: "Amortize",
      icon: window.location.origin + "/img/Logo.svg",
    },
    senderAddress: myStxAddress(),
  };

  openContractCall(options);
}

export async function Mint(picture) {
  if (picture !== null) {
    try {
      console.log("minted!");
      let options2 = {
        contractAddress: ContractDeployerAddress,
        contractName: sip_009_nft,
        functionName: "get-last-token-id",
        functionArgs: [],
        network: networkType(),
        appDetails: {
          name: "Amortize",
        },
      };
      const nft_id = await appCallReadOnlyFunction(options2);
      const fileURL = await saveNFTPic(picture);
      const nft_data = [{ id: nft_id.value.value, URL: fileURL }];
      console.log(nft_data);
      await saveNFTData(nft_data);
      let functionArgs = [standardPrincipalCV(myStxAddress())];
      let options = {
        contractAddress: ContractDeployerAddress,
        contractName: sip_009_nft,
        functionName: "mint",
        functionArgs,
        network: networkType(),
        appDetails: {
          name: "Amortize",
        },
      };
      // await appCallPublicFunction(options);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("Tried minting!");
    }
  }
}
