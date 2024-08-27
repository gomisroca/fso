const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
const Session = require("../models/session");

const errorHandler = (error, _request, response, _next) => {
  return response.status(400).send({ error: error.message });
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const token = authorization.substring(7);
      console.log(token);
      req.decodedToken = jwt.verify(token, SECRET);
      const session = await Session.findOne({
        where: {
          token: token,
          user_id: req.decodedToken.id,
        },
      });
      console.log(session);
      if (!session) {
        return res.status(401).json({ error: "session not found" });
      }
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
};
