import FriendListWidget from "../components/FriendListWidget"
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
        {isAboveMediumScreen && ( 
          <div>
            <UserWidget />
            <FriendListWidget />
          </div>  
        )}
        <div className="w-full flex flex-col">
          <MyPostWidget />
          <Posts />
        </div>
        {/* {isAboveMediumScreen && <FriendListWidget />} */}
      </div>
    </div>
  )
}

export default Home