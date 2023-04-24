const { User } = require("../db");
const { generateToken } = require("./generateToken.js");
const bcrypt = require("bcryptjs");

const userSignin = async (req, res, next) => {
  const { email, password } = req.body;

  console.log('SERVER', email, password);

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {

      return res.status(200).json({
        msg: "Login success",
        data: {
          ...user,
          token: generateToken(user),
        },
      });
    }

  } else {

  }
  res.status(400).send({ msg: "Invalid email or password" });
};



const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password)
    const passwordHash = await bcrypt.hash(password, 10)

    await User.update({ password: passwordHash }, { where: { email: email } })

    res.json({ msg: "Password successfully changed!" })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }

};


module.exports = {
  userSignin,
  resetPassword
} 
