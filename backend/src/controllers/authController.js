import {findByEmail} from "../services/user.service.js";
import { comparePassword } from "../helpers/authHelper.js";

const login = async (req,res)=>{
    const {email, password} = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Email y contraseña son requeridos" });
    }
    try {
        const user = await userService.findByEmail(email)
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(401).json({message: "Credenciales incorrectas"});
        }
        res.status(200).json({message: "Inicio de sesión exitoso"})
    } catch (error) {
        res.status(500).json({message:"Error iterno ", error:error.message});
    }
}

export default login