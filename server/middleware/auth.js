const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("No token, authorization denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).send("Token is not valid");
  }
};

const protectSocket = (socket, next) => {
  const { cookie } = socket.handshake.headers;
  const token = cookie.split('token=')[1];

  if (!token) {
    throw(new Error('No token, authorization denied'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.decoded = decoded;
    next();
  } catch (err) {
    throw(new Error('Token is not valid'));
  }
};

module.exports = { protect, protectSocket };
