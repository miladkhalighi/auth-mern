import jwt from 'jsonwebtoken'

export const generateVerificationToken = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};


export const generateTokenAndSetCookie = (res,userId) => {
  const token = jwt.sign({userId}, process.env.SECRET_REFRESH_TOKEN, {expiresIn: '7d'})

  res.cookie(
    'token',
    token,
    {
      httpOnly: true, //xss
      secure : process.env.NODE_ENV === 'production',
      sameSite: 'strict', //csrf
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7days
    }
  );
  return token
}