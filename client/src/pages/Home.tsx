import Friend from "../components/Friend"
import MyPostWidget from "../components/MyPostWidget"
import Navbar from "../components/Navbar"
import Posts from "../components/Posts"
import UserWidget from "../components/UserWidget"
import useMediaQuery from "../hooks/useMediaQuery"


const Home = () => {
  const isAboveMediumScreen = useMediaQuery("(min-width: 1060px)")

  return (
    <div className="w-full bg-gray-500 ">
      <Navbar />
      <div className="w-5/6 mx-auto flex gap-10">
        {isAboveMediumScreen && <UserWidget />}
        <div className="w-full flex flex-col">
          <MyPostWidget />
          <Posts />
        </div>
        <UserWidget />
      </div>
    </div>
  )
}

export default Home