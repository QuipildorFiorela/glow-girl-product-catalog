import Image from "../models/imageModel.js";

export const createImage = async (file) => {
    if (!file) throw new Error("Falta el archivo");
    return await Image.create({
        name: file.originalname,   // nombre original del archivo (ej. "foto.png")
        url: `img/products/${file.filename}`,        // nombre con el que se guardó en disco (ej. "17203875837-.png")
    });
};
