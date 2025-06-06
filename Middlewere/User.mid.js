import jwt from "jsonwebtoken";
import dotenv from "dotenv";
function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
    // console.log("authheader"+authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ errors: "No token provided" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "Jsaif@me_fdw%$");
    // console.log(decoded);
    req.userId = decoded.id;

    next();
  } catch (error) {
    // return res.status(401).json({ errors: "Invalid token or expired" });
    console.log("error in user middleware expire token");
  }
}

export default userMiddleware;
