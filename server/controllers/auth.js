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
    const newUser = new User({
      name,
      email,
      password : hashedPwd,
      location,
      job,
      picturePath
    })
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  }catch(err){
    res.status(500).json({error: err.message, message: "Register failure"})
  }
}