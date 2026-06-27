import jwt from "jsonwebtoken";
import { ENV } from "..lib/env.js";

export const generateToken = (userId , res) => {

    const { JWT_SECRET } = ENV;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign({userId} , JWT_SECRET , {
        expiresIn: "7d",
    });

    res.cookie("jwt" , token , {
        maxAge: 7*24*60*60*1000, // 7 days in milliseconds
        httpOnly: true, //preven XSS atacks: cross-site scripting
        sameSite: "strict", //CSRF attacks
        secure: ENV.NODE_ENV === "development" ? false : true , //only send cookie over HTTPS in production
    });

    return token;
};