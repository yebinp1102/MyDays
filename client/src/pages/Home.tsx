import { useNavigate } from "react-router"
import FriendListWidget from "../components/FriendListWidget"
import MyPostWidget from "../components/MyPostWidget"
import Navbar from "../components/Navbar"
import Posts from "../components/Posts"
import UserWidget from "../components/UserWidget"
import useMediaQuery from "../hooks/useMediaQuery"
import { useAppSelector } from "../redux/hooks"


const Home = () => {
  const isAboveMediumScreen = useMediaQuery("(min-width: 1060px)")
  const {user} = useAppSelector(state => state.user);
  const navigate = useNavigate();

  if(!user) navigate('/auth');

  return (
    <div className="w-full">
      <Navbar />
      <div className="w-5/6 mx-auto flex gap-10">
        {isAboveMediumScreen && ( 
          <div>
            <UserWidget user={user?.user} />
            <FriendListWidget />
          </div>  
        )}
        <div className="w-full flex flex-col">
          <MyPostWidget />
          <Posts isProfile={false} />
        </div>
      </div>
    </div>
  )
}

export default Home