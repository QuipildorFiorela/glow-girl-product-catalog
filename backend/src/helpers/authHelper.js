import bcrypt from "bcrypt";

//cuando guardo un user su contraseña es una cadena de caracteres y cuando hago el login comparo lo que le envio desde el front con lo que tiene guardado con el comparePassword

const salRounds = 10; //la cant de veces que retuerce la contraseña para que sea indecifrable, cuanto mas alto el numero mas tarda en hashearse
export const hashPassword = async (password) =>{
    try {
        const hashedPassword = await bcrypt.hash(password, salRounds)
        return hashedPassword;
    } catch (error) {
        console.error("Error al hashear el pass", error.message);
    }
}

export const comparePassword = async(password, hash) =>{
    try {
        const match = await bcrypt.compare(password, hash);
        return match; 
    } catch (error) {
        console.error("Error al comparar el pass", error.message);
    }
}