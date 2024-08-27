const router = require("express").Router();

const Session = require("../models/session");
const { tokenExtractor } = require("../utils/middleware");

router.delete("/", tokenExtractor, async (request, response) => {
  const existingSession = await Session.findOne({
    where: {
      userId: request.decodedToken.id,
    },
  });
  if (!existingSession) {
    return response.status(401).json({
      error: "not logged in",
    });
  }
  await existingSession.destroy();
  response.sendStatus(200);
});

module.exports = router;
