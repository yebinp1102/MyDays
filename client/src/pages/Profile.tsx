import { useEffect } from 'react'
import MyPostWidget from '../components/MyPostWidget'
import Navbar from '../components/Navbar'
import Posts from '../components/Posts'
import UserWidget from '../components/UserWidget'
import useMediaQuery from '../hooks/useMediaQuery'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { useParams } from 'react-router'
import { getUserProfile } from '../redux/slices/profileSlice.ts';


const Profile = () => {
  const isAboveMediumScreen = useMediaQuery("(min-width: 1060px)");
  const {profile} = useAppSelector(state => state.profile);
  const {user} = useAppSelector(state => state.user);
  const {id} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(id) dispatch(getUserProfile({id}))
  },[])

  return (
    <div>
      <Navbar />
      <div className="w-5/6 mx-auto flex gap-10">
        {isAboveMediumScreen && ( 
          <div>
            <UserWidget user={profile}/>
          </div>  
        )}
        <div className="w-full flex flex-col">
          {id === user?.user._id && <MyPostWidget />}
          <Posts userId={id} isProfile={true} />
        </div>
      </div>
    </div>
  )
}

export default Profile