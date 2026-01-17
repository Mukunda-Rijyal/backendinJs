import { v2 as cloudinary } from "cloudinary"
import { log } from "console";

import fs from "fs"//file system module

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // secure: true
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error("Local file path is required");
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // This will let Cloudinary automatically detect the file type
            // folder: "bnd", // Specify the folder in Cloudinary where the file will be uploaded
        });

        // file has been uploaded
        console.log("File is uploaded successfully:", response.url);
        
        // Delete the local file after successful upload
        fs.unlinkSync(localFilePath);

        return response; // Return the entire response object for more details

    } catch (error) {
        fs.unlinkSync(localFilePath); // Delete the local file in case of an error
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
}

export { uploadOnCloudinary };