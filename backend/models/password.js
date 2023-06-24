const passwordValidator = require("password-validator");

const passwordModel = new passwordValidator();

passwordModel
  .is()
  .min(5)
  .is()
  .max(23)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

module.exports = passwordModel;
