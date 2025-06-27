import { getUsers, getUserWithQuery, create, findPk, update, remove } from "../services/user.service.js";
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

export const getAllUsersWithQuery = async (req, res) => {
    try {
        const { firstName} = req.query;
        const users = await getUserWithQuery({firstName});
        console.log(users);
        
        if(users.lenght === 0){
            res.status(404).json({message: "No se encontraron lso usuarios"})
        }
        res.status(200).json({message: "Lista de usuarios", playload: users})
    } catch (error) {
        res.
        status(500)
        .json({ message: "Error interno del servidor", err: error.message})
    }
}

export const renderUsers = async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
        //res.render("users", { users })
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const {firstName, email, password} = req.body;

        if(!firstName || !email|| !password){
            return res.status(400).json({message: "Completa todos los campos"});
        }
        const passHash = await hashPassword(password)
        console.log(passHash);

        const newUser = await create({firstName, email, password});
        res.status(201).json({ message: "Usuario creado con éxito", payload: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export const findUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userFound = await findPk(id)
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
        const { id } = req.params;
        const userFound = await findPk(id)
        if(!userFound){
            return res.status(404).json({message: "Usuario no encontrado"});
        }
        const { firstName, email, password} = req.body;
        if(!firstName || !email, password){
            return res.status(400).json({message: "Completa todos los campos"});
        }
        const updatedUser = await update(id, { firstName, email, password });
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
