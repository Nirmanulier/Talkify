import jwt from "jsonwebtoken";

export const generateToken = (userId , res) => {
    const token = jwt.sign({userId: userId} , process.env.JWT_SECRET , {
        expiresIn: "7d",
    });

    res.cookie("jwt" , token , {
        maxAge: 7*24*60*60*1000, // 7 days in milliseconds
        httpOnly: true, //preven XSS atacks: cross-site scripting
        sameSite: "strict", //CSRF attacks
        secure: prcess.env.NODE_ENV === "devlopement" ? false : true , //only send cookie over HTTPS in production
    });

    return token;
};