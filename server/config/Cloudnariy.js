import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({path: '../.env'});


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:process.env.CLOUDNARY_API_KEY ,
  api_secret:process.env.CLOUDNARY_SECRET ,
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