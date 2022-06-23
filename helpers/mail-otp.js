const { text } = require("express");
const nodemailer = require("nodemailer")
require("dotenv").config();

const MailOtp = async (req, res, next) => {
    try {
        const sender = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.AUTH_MAILID,
                pass: process.env.AUTH_PASSWORD
            }
        })

        const OTP = Math.floor(100000 + Math.random() * 9000);
        console.log("Magil OTP: ", OTP);
        const composemail = {
            from: `poos25451@gmail.com`,
            to: `poos25451@gmail.com`,
            subject: `sample Node OTP sucessfully `,
            text: `sample Node OTP ${OTP}`


        }
        // return JSON.stringify(json, null, 2);
        sender.sendMail(composemail, function (error, info) {
            if (error) {
                console.log(error);

            } else {
                res.json("Mail Send Successfuly" + info.response);
            }
        })
    } catch (error) {

    }
}
module.exports = { MailOtp }