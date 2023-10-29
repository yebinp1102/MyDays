import jwt from 'jsonwebtoken';

export const verifyToken = async(req, res, next ) => {
  try{
    // FE에서 로그인 당시 header에 저장한 토큰 값을 참조
    let token = req.header("Authorization");

    // 토큰이 없는 경우
    if(!token){
      return res.status(403).send("Access Denied");
    }

    if(token.startsWith("Bearer ")){
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  }catch(err){
    res.status(500).json({ error: err.message, message: "Access rejected" });
  }
}