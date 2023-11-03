import { useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {BsFillPersonPlusFill, BsFillPersonDashFill} from 'react-icons/bs';
import { addRemoveFriend, getFriends } from "../redux/slices/userSlice";

type Props = {
  friendId?: string,
  name: string,
  subtitle?: string,
}


const Friend = ({friendId, name, subtitle} : Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.user)

  const friends = user?.user.friends;

  const isFriend = friends?.find((friend) => friend === friendId);

  const handleAddRemoveFriend = async() => {
    if(friendId){ 
      await dispatch(addRemoveFriend({friendId}));
      dispatch(getFriends());
    }

  }

  if(!friends) return;

  return (
    <div className="flex justify-between items-center pb-4">
      <div className="flex justify-between items-center gap-4">
        <div className="w-[50px] h-[50px] bg-gray-400 rounded-[50%]" />
        <div 
          onClick={() => {
            navigate(`/profile/${friendId}`)
            navigate(0);
          }}
        >
          <p className="text-xl text-green-700 cursor-pointer">{name}</p>
          <div>{subtitle}</div>
        </div>
      </div>

      {/* Icon */}
      <div>
        {friendId !== user.user._id && (
          <div className="bg-green-700 p-2 rounded-[50%] cursor-pointer" onClick={() => handleAddRemoveFriend()}>
            {isFriend ? (
              <BsFillPersonDashFill color={"white"} size={20}/>
            ) : (
              <BsFillPersonPlusFill color={"white"} size={20} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Friend
