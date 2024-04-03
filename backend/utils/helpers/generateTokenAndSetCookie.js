import jwt from "jsonwebtoken";

//store usedId and token with expiration in 15 days
const generateTokenAndCookie = (userId, res) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn:'15d',
  })

  res.cookie("jwt", token, {
    httpOnly: true,  //so that this cookie is not accessible by javascript/browser
    maxAge: 15 * 24 * 60 * 60 * 1000,   //15 days
    sameSite: "strict",   //CSRF(Cross-site Request Forgery))
  });
  
  return token;

}

export default generateTokenAndCookie;