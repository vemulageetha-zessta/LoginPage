const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY =
    "8J0inOmn65ospaI1PwQYwZskbuuc/CKlolPo6j7INHCDGmxl0+YZDFDKzv5EMBLQRFQpMr8diODp2I4IIO5iXZmYhk719jWJbAWaNpAa8f3NMHJGcB4aa7FY0xI6IB0SYEvZBEl6o3LfrjJd9OtlssdXVCQ7It3qvnfHUYdSkq9pORGRv5Y2rCgbI6NgJlLRapAdsoAESgHpd+8TZfCqSicWoNpv43Qks9Pij2FdWT81Levy//OC9q0A+KHUxTJyhBH3f4togIg8T+jZIHsUjOOMcqajXeAP3bu3WxA4s/QPteMAO/Qyf810904RmRD6M5YZEMP6n0TC8f/Wv9HQTg==";
  //node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"

const tokenGenerator = (data) => {
  if (data != null) {
    const token = jwt.sign(data, JWT_SECRET_KEY, {
      expiresIn: "120s",
    });
    return token;
  } else {
    return "Make sure to use a valid secret key";
  }
};

const authenticateJWT = (req, res, next) => {
  const token = req.headers["token"];
  if (token) {
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  tokenGenerator,
  authenticateJWT,
};
