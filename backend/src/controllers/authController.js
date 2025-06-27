import {findByEmail} from "../services/user.service";
import { comparePassword } from "../helpers/authHelper";

const login = async (req,res)=>{
    const {email, password} = req.body
    //validar los ingresos falta
    try {
        const user = userService.findByEmail(email)
        //valido si hay usuarios o no

        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(401).json({message: "Credenciales incorrectas"});
        }
        res.status(200).json({message: "Inicio de sesión exitoso"})
    } catch (error) {
        res.status(500).json({message:"Error iterno ", error:error.message});
    }
}