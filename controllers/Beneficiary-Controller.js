// const createError = require("http-errors");
// // const { studentSchema } = require("../helpers/studentJoiSchema");
// const BeneficiaryModel = require("../model/BeneficiarySchema");
// // const BeneficiaryRoute=require("./routes/BeneficiaryRoute")


// module.exports = {

//     BeneficiaryCreate: async (req, res) => {
//         try {

//             const Beneficiary = await BeneficiaryModel({
//                 BEN_ID: req.body.BEN_ID,
//                 USER_ID: req.body.USER_ID,
//                 BENEFICIARY_ACCOUNT_NO: req.body.BENEFICIARY_ACCOUNT_NO,
//                 BENEFICIARY_NAME: req.body.BENEFICIARY_NAME,
//                 NICK_NAME: req.body.NICK_NAME,
//                 BENEFICIARY_IFSC: req.body.BENEFICIARY_IFSC,
//                 BENEFICIARY_BANK_NAME: req.body.BENEFICIARY_BANK_NAME,
//                 BENEFICIARY_BANK_ADDRESS: req.body.BENEFICIARY_BANK_ADDRESS,
//                 STATUS: req.body.STATUS,
//                 EMAIL: req.body.EMAIL,
//                 MOBILENUMBER: req.body.MOBILENUMBER,
//                 BENEFICIARY_ACCOUNT_TYPE: req.body.BENEFICIARY_ACCOUNT_TYPE,
//                 BTRANSFER_MODEEN_ID: req.body.TRANSFER_MODE,
//                 REF_NO: req.body.REF_NO,
//                 BEREC_CURR_TSN_ID: req.body.REC_CURR_TS,

//             })
//             console.log("before create:", newBeneficiary);
//             Beneficiary.insertMany(function (error, BeneficiaryData) {
//                 // console.log("Data checking: ", newBeneficiary);
//                 try {
//                     res.send({
//                         status: 200,
//                         message: "Beneficiary Added SucessFully",
//                         studentObj: {
//                             BEN_ID: BeneficiaryData.BEN_ID,
//                             USER_ID: BeneficiaryData.USER_ID,
//                             BENEFICIARY_ACCOUNT_NO: BeneficiaryData.BENEFICIARY_ACCOUNT_NO,
//                             BENEFICIARY_NAME: BeneficiaryData.BENEFICIARY_NAME,
//                             NICK_NAME: BeneficiaryData.NICK_NAME,
//                             BENEFICIARY_IFSC: BeneficiaryData.BENEFICIARY_IFSC,
//                             BENEFICIARY_BANK_NAME: BeneficiaryData.BENEFICIARY_BANK_NAME,
//                             BENEFICIARY_BANK_ADDRESS: BeneficiaryData.BENEFICIARY_BANK_ADDRESS,
//                             STATUS: BeneficiaryData.STATUS,
//                             EMAIL: BeneficiaryData.EMAIL,
//                             MOBILENUMBER: BeneficiaryData.MOBILENUMBER,
//                             BENEFICIARY_ACCOUNT_TYPE: BeneficiaryData.BENEFICIARY_ACCOUNT_TYPE,
//                             BTRANSFER_MODEEN_ID: BeneficiaryData.TRANSFER_MODE,
//                             REF_NO: BeneficiaryData.REF_NO,
//                             BEREC_CURR_TSN_ID: BeneficiaryData.REC_CURR_TS,

//                         },
//                     });
//                 } catch (error) {
//                     console.log("Error in BeneficiaryCreate query: ", error);

//                     res.send(error);
//                 }

//             })
//         }
//         catch (error) {
//             console.log("Error in BeneficiaryCreate query: ", error);
//             res.status(500).send("Error while in the database");
//         }
//     }

// }