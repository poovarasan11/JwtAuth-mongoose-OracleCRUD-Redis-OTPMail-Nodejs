const { date, boolean, string } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var studentSchema = Schema({
  // _id: {
  //   type: mongoose.Schema.ObjectId,
  //   select: false
  //   },

  // __v: {Beneficiary
  //   type: Number,
  //   select: false,
  // },

  studentId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    //   validate: {
    //     validator: (value) => {
    //       return false;
    //       // Check if value is empty then return true.
    //       console.log("value sc:", value);
    //       if (value === "") {
    //         return false;
    //       }
    //     },
    //     message: "{VALUE} is not valid",
    //   },
    //   // validate: (value) => typeof value === "string",
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    // default: Date.now,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },

  createdTime: {
    type: Date,
    immutable: true,
    default: new Date(),
  },

  // //************
  // //Equties BENEFICIARY add sample api
  // BEN_ID: {
  //   type: Number,
  //   required: true,
  //   trim: true,
  //   unique: true,
  // },
  // USER_ID: {
  //   type: Number,
  //   required: true,
  //   trim: true,
  //   unique: true,
  // },
  // BENEFICIARY_ACCOUNT_NO: {
  //   type: Number,
  //   required: true,
  //   trim: true,
  //   unique: true,
  // },
  // BENEFICIARY_NAME: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   unique: true,
  // },
  // NICK_NAME: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   unique: true,
  // },
  // BENEFICIARY_IFSC: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   unique: true,mongoose
  // },
  // BENEFICIARY_BANK_NAME: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   unique: true,
  // },
  // BENEFICIARY_BANK_ADDRESS: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   unique: true,
  // },
  // STATUS: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  // EMAIL: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   unique: true,
  // },
  // MOBILENUMBER: {
  //   type: Number,
  //   required: true,
  //   trim: true,
  //   unique: true,
  // },
  // BENEFICIARY_ACCOUNT_TYPE: {
  //   type: String,
  //   required: true,
  //   trim: true,

  // },
  // TRANSFER_MODE: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  // REF_NO: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  // REC_CURR_TS: {
  //   type: Date,
  //   immutable: true,
  //   default: new Date(),
  // }





});

var StudentModel = mongoose.model("students", studentSchema);

module.exports = StudentModel;
