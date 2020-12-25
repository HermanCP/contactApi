const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");

verifyToken = (req, res, next) => {
    //jika menggukan token
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;