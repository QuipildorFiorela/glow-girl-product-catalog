import { createImage } from "../services/imageService.js";

export const upload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "falta la imagen" });
        }

        const imageUpload = await createImage({
            name: req.file.originalname,
            url: req.file.filename,
        });

        res.status(201).json({ message: "imagen creada", payload: imageUpload });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Error interno del servidor", err: error.message });
    }
};
