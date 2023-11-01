import MyPostWidget from "../components/MyPostWidget"
import Navbar from "../components/Navbar"
import UserWidget from "../components/UserWidget"
import useMediaQuery from "../hooks/useMediaQuery"


const Home = () => {
  const isAboveMediumScreen = useMediaQuery("(min-width: 1060px)")

  return (
    <div className="w-full h-full bg-gray-500 ">
      <Navbar />
      <div className="w-5/6 mx-auto flex gap-10">
        {isAboveMediumScreen && <UserWidget />}
        <MyPostWidget />
      </div>
    </div>
  )
}

export default Home