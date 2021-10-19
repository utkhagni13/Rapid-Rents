const userSchema = require("../models/Users");
const UserValidators = require("../validators/UserValidators");

exports.login = async (req, res) => {
  const { error, value } = UserValidators.login(req.body);
  if (error) {
    return res.status(400).json({ data: null, error: error.details[0].message });
  }
  // console.log(value);
  try {
    let result = await userSchema.findOne({
      email: req.body.email,
    });
    // console.log(result);
    return res.status(200).json({ data: result, error: null });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ data: null, error: error.message });
  }
};
