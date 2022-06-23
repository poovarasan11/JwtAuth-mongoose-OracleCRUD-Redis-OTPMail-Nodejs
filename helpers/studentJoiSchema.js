const joi = require('joi')

const studentSchema = joi.object({

   
    firstName: joi.string().max(128).required(),
    lastName: joi.string().max(128).required(),
    age: joi.number().max(10).required(),
    date: joi.string(),
    department: joi.string(),

})

module.exports = { studentSchema }