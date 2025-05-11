const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (fileBuffer, folder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: folder },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    reject(error);
                    return;
                }
                resolve({ public_id: result.public_id, url: result.secure_url });
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
};

module.exports = {
    uploadToCloudinary
}