const { check, validationResult } = require("express-validator");

const ValidateCreateCategory = [
    check("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Name can not be empty!")
      .bail()
      .isLength({ min: 3 })
      .withMessage("Minimum 3 characters required!")
      .bail(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
  
      next();
    },
  ];

  module.exports = {

    ValidateCreateCategory

  }