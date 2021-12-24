const { check, validationResult } = require("express-validator");

const ValidateUser = [
  check("username")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Username can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail(),
  check("email")
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Invalid email address!")
    .bail(),
  check("password")
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .not()
    .isEmpty()
    .withMessage("Username can not be empty!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  },
];

module.exports = {
  ValidateUser,
};
