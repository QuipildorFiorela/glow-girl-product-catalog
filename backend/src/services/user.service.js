// services
import User from "../models/user.model.js";

export const getUsers = async () => {
    return await User.findAll(); // select * from users
};

export const create = async (user) => {
    return await User.create(user);
};

export const findPk = async (id) => {
    return await User.findByPk(id);
};

export const findByEmail = async (email) => {
    return await User.findOne({where: {email: email}});
};

export const update = async (user, id) => {
    return await User.update(user, { where: { id: id } });
};
