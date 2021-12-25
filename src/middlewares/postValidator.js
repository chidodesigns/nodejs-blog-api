const { check, validationResult } = require("express-validator");

const ValidateCreatePost = [
  check("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Title can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail(),
  check("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Description can not be empty!")
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
    ValidateCreatePost,
}
