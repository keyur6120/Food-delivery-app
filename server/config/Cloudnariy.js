import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dx3v1oycv",
  api_key: "348268716963857",
  api_secret: "I7nDrIGbQ813PQj0gxFKijqRSOo",
});

const path = async (localpath) => {
  try {
    if (!localpath) return null;
    const response = await cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localpath);
    return response;
  } catch (error) {
    console.log(error);
    fs.unlink(localpath);
    return null;
  }
};

export {path} ;