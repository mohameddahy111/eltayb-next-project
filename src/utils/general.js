import cloudinary from "@/utils/cloudinary";
// import multer from "multer";

export const addImages = async (options) => {

    const { public_id, secure_url } = await cloudinary.uploader.upload(
     options.path,
     { folder: options.folder }
    );
    return { id: public_id, scr: secure_url };

};

// export const  uploadCloud = ()=>{
//   const storage =  multer.diskStorage({})
//   const multerUpload = multer({storage})
//   return multerUpload
// }