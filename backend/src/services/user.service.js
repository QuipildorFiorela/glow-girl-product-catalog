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

export const findMail = async (mail) => {
    return await User.findOne({ where: { mail } });
};

export const update = async (id, user) => {
    return await User.update(user, { where: { id } });
};

export const remove = async (id) => {
    return await User.destroy({ where: { id } })
}
