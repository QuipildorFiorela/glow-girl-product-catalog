import User from "../models/userModel.js";

export const getUsers = async () => {
    return await User.findAll(); // select * from users
};

export const create = async (user) => {
    return await User.create(user);
};

export const findPk = async (id) => {
    return await User.findByPk(id);
};

export const findByMail = async (mail) => {
    return await User.findOne({where: {mail}});
};

export const update = async (user, id) => {
    return await User.update(user, { where: { id: id } });
};
