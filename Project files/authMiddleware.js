const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;


    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }


    const token = authHeader.split(" ")[1];


    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Invalid token",
      });
    }


    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    req.userId = decoded.id;


    next();


  } catch (error) {

    console.log(error);


    return res.status(401).send({
      success: false,
      message: "Authentication Failed",
    });

  }

};


module.exports = authMiddleware;