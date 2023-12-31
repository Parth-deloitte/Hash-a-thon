import jwt from "jsonwebtoken";

export const verifyAuthentication = (secretKey) => (req, res, next) => {
  const bearer = req.headers.authorization?.split(" ")[1];
  if (typeof bearer === undefined)
    res.send({ error: "invalid token or auth header is not present" });
  else
    jwt.verify(bearer, secretKey, (err, payload) => {
      if (err) {
        console.log("KL");
        res.status(403).send(err);
      } else {
        req.payload = payload;
        return next();
      }
    });
};
