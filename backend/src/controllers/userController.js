import { getUsers, create, findPk, findByMail, update} from "../services/user.service.js";
import {hashPassword} from "../helpers/authHelper.js"

export const getAllUsers = async (req, res) => {
    try {
        const {limit, offset} = req.query;
        const users = await getUsers();
        res.status(200).json({ message: "Lista de usuarios", payload: users });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const {name, mail, password} = req.body;
        const existingUser = await findByMail(mail);
        if (existingUser) {
            return res.status(409).json({ message: "El correo ya está registrado" });
        }
        if(!name || !mail|| !password){
            return res.status(400).json({message: "Completa todos los campos"});
        }
        const passHash = await hashPassword(password)
        console.log(passHash);

        const newUser = await create({name, mail, password});
        res.status(201).json({ message: "Usuario creado con éxito", payload: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export const findUserByMail = async (req, res) => {
    try {
        const { mail } = req.params;
        const userFound = await findByMail(mail)
        if(!userFound){
            return res.status(404).json({message: "Usuario no encontrado"});
        }
        res.status(201).json({ message: "Usuario encontrado con éxito", payload: userFound });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { mail } = req.params;
        const userFound = await findPk(mail)
        if(!userFound){
            return res.status(404).json({message: "Usuario no encontrado"});
        }
        const { name, email, password} = req.body;
        if(!name || !email, password){
            return res.status(400).json({message: "Completa todos los campos"});
        }
        const updatedUser = await update(mail, { name, password });
        res.status(200).json({ message: "Usuario actualizado con éxito", payload: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userFound = await findPk(id)
        if(!userFound){
            return res.status(404).json({message: "Usuario no encontrado"});
        }
        await remove(id);
        res.status(200).json({ message: "Usuario eliminado con éxito"});
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}
