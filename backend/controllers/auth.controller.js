const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { identifier, password, role } = req.body;

    if (
      role === "HOD" &&
      identifier === "hod@gmail.com" &&
      password === "hod@1234"
    ) {
      const token = jwt.sign(
        {
          role: "hod",
          email: "hod@gmail.com",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({
        success: true,
        token,
        user: {
          role: "hod",
          email: "hod@gmail.com",
          name: "Head Of Department",
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};