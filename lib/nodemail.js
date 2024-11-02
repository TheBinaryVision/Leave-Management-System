import nodemailer from "nodemailer"

const email = process.env.EMAIL;
const pass = process.env.PASS;
// console.log(email,pass)
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth:{
        type: "login", // default
        user: email,
        pass: pass,
    },
});

export const mailOptions = {
    from: email,
}