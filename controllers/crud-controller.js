const createError = require("http-errors");
const { studentSchema } = require("../helpers/studentJoiSchema");
const StudentModel = require("../model/studentSchema");

module.exports = {
  create: async (req, res) => {
    const newStudent = new StudentModel({
      studentId: req.body.studentId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      date: req.body.date,
      department: req.body.department,
    });
    // newStudent.createdTime;
    // console.log("create time :", newStudent);
    // await newStudent.save();

    newStudent.save(function (err, newStudent) {
      ///log
      console.log("ressss", err, "\t", newStudent);
      if (err) {
        res.send(err);
      } else {
        res.send({
          status: 200,
          message: "User Added SucessFully",
          studentObj: {
            studentId: newStudent.studentId,
            firstName: newStudent.firstName,
            lastName: newStudent.lastName,
            age: newStudent.age,
            date: newStudent.date,
            department: newStudent.department,
            createdTime: newStudent.createdTime,
          },
        });
      }
    });
  },

  find: function (req, res, next) {
    StudentModel.find(function (err, response) {
      if (err) {
        res.send(err);
      } else {
        res.send({
          status: 200,
          resultsFount: response.length,
          students: response,
          // students: {
          //   studentId: response.studentId,
          //   firstName: response.firstName,
          //   lastName: response.lastName,
          //   age: response.age,
          //   date: response.date,
          //   department: response.department,
          //   createdTime: response.createdTime,
          // },
        });
      }
    });
  },

  update: async (req, res, next) => {
    const studentId = req.body.studentId;
    // console.log("id data", studentId);
    // if (studentId !== true) {
    //   console.log("if id data", studentId);
    //   res.send("studentId miss match");
    // }

    const fName = req.body.firstName;

    const lName = req.body.lastName;
    const age = req.body.age;
    const date = req.body.date;
    const department = req.body.department;

    // fName.createdTime;
    // // console.log("create time :", newStudent);
    // await fName.save();

    StudentModel.findOneAndUpdate(
      { studentId },
      // function isEmpty(fName) {
      //   if (!fName || fName.length === 0) {
      //     throw (
      //       (createError.BadRequest("Data is empty"),
      //       console.log("value emtty"))
      //     );
      //   }
      // },

      {
        firstName: fName,
        lastName: lName,
        age: age,
        date: date,
        department: department,
      },

      function (err, response) {
        if (err) {
          res.send(err);
        } else if (response) {
          res.send(`Updated Succesfuly...`);
        }
        // else if (fName.length === 0) {
        //   console.log("dfdff",fName);
        //   res.status(204).end("Empty Data Not Accspt");

        // }
        else {
          res.status(404).end("ID Not Found");
        }
        // else {
        //   res.send(
        //     "Updated succesfuly..."
        //     //   {
        //     //   status: "updated succesfuly",
        //     //   resultsFount: response.length,
        //     //   students: response,
        //     //   // {
        //     //   //   studentId: newStudent.studentId,
        //     //   //   firstName: newStudent.firstName,
        //     //   //   lastName: newStudent.lastName,
        //     //   //   age: newStudent.age,
        //     //   //   date: newStudent.date,
        //     //   //   department: newStudent.department,
        //     //   //   createdTime: newStudent.createdTime,
        //     //   // },
        //     // }
        //   );
        // }
      }
    );
  },

  deleteOne: function (req, res, next) {
    const studentId = req.body.studentId;

    StudentModel.deleteOne(
      { studentId },

      function (err, response) {
        console.log("errorr", err);
        if (err) {
          res.send(err);
        } else {
          res.send({
            status: "delete data",
            resultsFount: response.length,
            students: response,
          });
        }
      }
    );
  },
  

};
