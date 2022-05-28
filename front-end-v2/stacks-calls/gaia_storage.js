import { networkType, myStxAddress, getUserData } from "./auth";
// import { userSession } from "../pages/_app";
import { Storage } from "@stacks/storage";


const imagefileOptions = {
    encrypt: false,
    contentType: "image/jpg",
    dangerouslyIgnoreEtag: true,
  };

  const nftPic = "nftpic.jpg";
  const nftData = "nftdata.json";


export async function fetchNFTData(userSession) {
    const storage = new Storage({ userSession });
    try {
  
      const nftInfoJSON = await storage.getFile(nftData);
      if (nftInfoJSON) {
        const json = JSON.parse(nftInfoJSON);
        // console.log(json);
        return json.nfts;
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }

export async function saveNFTPic(picture, userSession) {
    const storage = new Storage({ userSession });

    const fileURL = await storage.putFile(nftPic, picture, imagefileOptions);

    return fileURL;
}

export async function saveNFTData(NFT_Data, userSession) {
    const storage = new Storage({ userSession });

    let prevNFTData = await fetchNFTData();
    let nfts = [];
    nfts.push(NFT_Data);

    for(let i = 0; i < prevNFTData.length; i++)
    {
        nfts.push(prevNFTData[i]);
    }

    await storage.putFile(nftData, JSON.stringify({ nfts }));
}

export async function CheckFile(fileName, userSession) {

  const storage = new Storage({ userSession });
  let Found = false;

  await storage.listFiles((filename) => {

      if (fileName === filename) {
          Found = true;
          return false;
      }
      else {
          return true;
      }

  });

  return Found;

}


export async function deleteAllData(userSession) {

  const storage = new Storage({ userSession });

  try {

      if (userSession.isUserSignedIn()) {

          const Found = await CheckFile(nftPic, userSession);

          if (Found) {
              await storage.deleteFile(nftPic, userSession);
          }
          else {
              console.log("File Not Found");
          }

      }
  } catch (error) {
      return;
  }
}
