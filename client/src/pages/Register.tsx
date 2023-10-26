import { motion } from "framer-motion"
import Shape from '../assets/Shape01.png'
import {BsFillEyeFill} from 'react-icons/bs'
import {AiFillEyeInvisible} from 'react-icons/ai'
import { useState } from "react"
import useMediaQuery from "../hooks/useMediaQuery"


type Props = {}

const Register = (props: Props) => {
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [isLoginPage, setIsLoginPage] = useState<boolean>(false);

  const isAboveMediaScreen = useMediaQuery("(min-width: 1080px)")
  console.log(isAboveMediaScreen);

  const handleRegister = () => {

  }

  return (
    <section className="h-full w-full bg-primary flex ">
      
      {isAboveMediaScreen ? (
        // viewpoint >= 1080px
        <>
          {/* LEFT SIDE */}
          <div className="basis-1/3 pt-20 pl-10 pr-5 flex flex-col ">
            {/* LOGO */}
            <div className="font-bold font-sunflower text-3xl text-green-700 mb-[70px]">
              MyDays
            </div>
            {/* DESC */}
            <div className="text-white font-sunflower text-3xl leading-relaxed">
              MyDays를 통해 다른 사람과 일상을 공유하는 즐거움을 경험해 보세요.
            </div>

            {/* IMAGE */}
            <div className="relative h-full ">
              <img 
                className="absolute  bottom-[-20px] right-[-150px] max-w-[550px] " 
                src={Shape} 
                alt="Shape01" 
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white basis-2/3 rounded-l-[50px] flex ">

            <div className="flex flex-col min-w-[600px] h-full py-28 mx-auto items-center justify-center">
              {/* HEADER */}
              <div className="text-3xl font-sunflower  font-bold w-full pl-3">
                {isLoginPage ? "Login" : "Create Account" }
              </div>

              {/* FIELDS */}
              <form 
                className="flex flex-col w-full gap-12 mt-32 mb-20"
                onSubmit={handleRegister}
              >
                {!isLoginPage && 
                  <input 
                    placeholder="Name" 
                    className="border-b-[1px] p-1 placeholder:text-gray-300"
                    type="text"
                  />
                }
                <input 
                  placeholder="Email" 
                  className="border-b-[1px] p-2 placeholder:text-xl placeholder:text-gray-300" 
                  type="email"
                />
                <div className="relative">
                  <input 
                    placeholder="Password" 
                    className="border-b-[1px] w-full p-2 placeholder:text-xl placeholder:text-gray-300" 
                    type={showPwd ? "text" : "password"}
                  />
                  <div className=" absolute top-3 right-0">
                    {showPwd ? 
                    <BsFillEyeFill size={24} onClick={() => setShowPwd(!showPwd)} /> :
                    <AiFillEyeInvisible size={24} onClick={() => setShowPwd(!showPwd)} />
                    }
                  </div>
                </div>

                {/* BUTTON */}
                <div className="w-full mt-5">
                  <button type="submit" className="bg-primary py-3 font-semibold text-white tracking-wider text-lg w-full rounded-lg hover:bg-green-700 transition duration-500">
                    {isLoginPage ? "로그인" : "회원가입"}
                  </button>
                  <div className="text-gray-400 mt-5">
                    {isLoginPage ? "회원이 아니신가요 ? " : "이미 회원이신가요?"}
                    <a onClick={() => setIsLoginPage(!isLoginPage)} className="text-green-700 font-semibold">{isLoginPage ? "회원가입" : "로그인"}</a>
                  </div>
                </div>
              </form>
            </div>        
          </div>
        </>
      ): (

        // viewpoint < 1080px
        <div className="flex flex-col w-full justify-center items-center mx-auto">

          {/* LOGO */}
          <div className="relative w-full pl-24 mb-12 font-bold font-sunflower text-3xl text-green-700">
            MyDays
            {/* IMAGE */}
              <img 
                className="absolute right-[-80px] top-[-90px] w-[500px]" 
                src={Shape} 
                alt="Shape01" 
              />
          </div>

          {/* FORM */}
          <div className="bg-white rounded-[50px] flex flex-col p-14 w-5/6 z-[40]">

              {/* HEADER */}
              <div>
                <div className="text-2xl font-sunflower font-bold">
                {isLoginPage ? "Login" : "Create Account" }
                </div>
                <div className=" text-gray-300 mt-5 font-sunflower leading-relaxed">
                  MyDays를 통해 다른 사람과 일상을 공유하는 즐거움을 경험해 보세요.
                </div>
              </div>

              {/* FIELDS */}
              <form 
                className="flex flex-col w-full gap-12 mt-20 mb-20"
                onSubmit={handleRegister}
              >
                {!isLoginPage && 
                  <input 
                  placeholder="Name" 
                  className="border-b-[1px] p-1 placeholder:text-gray-300"
                  type="text"
                />
                }
                <input 
                  placeholder="Email" 
                  className="border-b-[1px] p-1 placeholder:text-gray-300" 
                  type="email"
                />
                <div className="relative">
                  <input 
                    placeholder="Password" 
                    className="border-b-[1px] w-full p-1 placeholder:text-gray-300" 
                    type={showPwd ? "text" : "password"}
                  />
                  <div className=" absolute top-2 right-1">
                    {showPwd ? 
                    <BsFillEyeFill size={20} onClick={() => setShowPwd(!showPwd)} /> :
                    <AiFillEyeInvisible size={20} onClick={() => setShowPwd(!showPwd)} />
                    }
                  </div>
                </div>

                {/* BUTTON */}
                <div className="w-full mt-5">
                  <button type="submit" className="bg-primary py-3 font-semibold text-white tracking-wider text-lg w-full rounded-lg hover:bg-green-700 transition duration-500">
                    {isLoginPage ? "로그인" : "회원가입"}
                  </button>
                  <div className="text-gray-400 mt-5">
                    {isLoginPage ? "회원이 아니신가요 ? " : "이미 회원이신가요?"}
                    <a onClick={() => setIsLoginPage(!isLoginPage)} className="text-green-700 font-semibold">{isLoginPage ? " 회원가입" : " 로그인"}</a>
                  </div>
                </div>
              </form>
            </div>        
          </div>
      )}
            
    </section>
  )
}

export default Register