import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Register 회원가입
export const register = async(req, res) => {
  try{
    const {name, email, password, location, job, picturePath} = req.body;

    const salt = await bcrypt.genSalt(); // 암호화에 사용할 랜덤한 salt 생성
    const hashedPwd = await bcrypt.hash(password, salt); // salt로 비번 암호화

    // DB에 비번을 저장할 때는 암호화된 것으로 저장
    const newUser = await User.create({
      name,
      email,
      password : hashedPwd,
    })
    
    res.status(201).json({name, email});
  }catch(err){
    res.status(500).json({error: err.message, message: "Register failure"})
  }
}


// Login 로그인
export const login = async(req, res) => {
  try{
    const { email, password } = req.body;

    // 해당 이메일로 가입한 유저가 있는지 확인
    const user = await User.findOne({ email: email });
    // 일치하는 유저가 없는 경우 400 에러 반환
    if (!user) return res.status(400).json({message: "Cannot find email"});

    // 비밀번호 확인
    // compare 함수가 암호화된 비번을 해독해서 일치하는지 확인
    const isMatch = await bcrypt.compare(password, user.password);
    // 일치하지 않는 경우 400 에러 반환
    if (!isMatch) return res.status(400).json({message: "Password does not match"});

    // 로그인에 성공하면 토큰 생성
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // 토큰을 추가하고, pwd를 제외한 나머지 정보들 응답으로 전달
    res.status(200).json({ 
      token, 
      user : {
        name: user.name,
        email: user.email,
        location: user.location,
        job: user.job,
        friends: user.friends,
        picturePath: user.picturePath
      }
    });
  }catch(err){
    res.status(500).json({error: err.message, message: "Login failure"})
  }
}