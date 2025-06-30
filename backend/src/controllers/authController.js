import { findByMail } from "../services/user.service.js";
import { comparePassword } from "../helpers/authHelper.js";

export const login = async (req, res) => {
    const { mail, password } = req.body
    
    if (!mail || !password) {
        return res.status(400).json({ message: "Email y contraseña son requeridos" });
    }
    try {
        const user = await findByMail(mail);
        console.log(user);
        
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(401).json({ message: "Constraseña incorrecta" });
        }
        res.status(200).json({ message: "Inicio de sesión exitoso", payload: user.name})
    } catch (error) {
        console.log("ERROR:", error);
        
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}