import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res
      .status(403)
      .send({ auth: false, message: "You are not authorize." });
  }
  //verify token if exist
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    //console.log("user", user);
    if (err) {
      return res.status(401).json({ 
        auth: false, 
        message: "token is invalid" });
    }
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.role === "user") {
      next();
    } else {
      return res.status(401).json({ 
        success: false, 
        message: "you are not authenticated" });
    }
  });
};
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      res
        .status(401)
        .json({ success: false, message: "you are not authorize" });
    }
  });
};
