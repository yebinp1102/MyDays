import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getFriends } from "../redux/slices/userSlice";
import Friend from "./Friend";

type Props = {}

const FriendListWidget = (props: Props) => {
  const dispatch = useAppDispatch();
  const {friends} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getFriends());
  },[]);

  if(!friends) return;
  
  return (
    <div className="bg-primary rounded-2xl p-6">
      <p className="text-green-700 font-bold text-xl mb-4">My Friend List</p>
      <div className="">
        {friends.map((friend) => (
          <div className="border-t-2 pt-4">
            <Friend key={friend._id} friendId={friend._id} name={friend.name} subtitle={friend.job}  />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FriendListWidget