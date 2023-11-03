import { useState } from 'react'
import { LikePost, PostType } from '../redux/slices/postSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Friend from './Friend';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import {BiComment} from 'react-icons/bi';

const Post = ({postId, postUserId, name, location, description, likes, comments}: PostType) => {
  const [isComments, setIsComments] = useState<boolean>(false) ;
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.user);
  const isLiked = Boolean(likes[user.user._id]);
  const likeCount = Object.keys(likes).length;


  const handleLike = async() => {
    const userId = user?.user._id;
    if(postId && userId){
      const bodyData = {postId, userId}
      await dispatch(LikePost(bodyData));
    }
  }

  return (
    <div className='bg-primary rounded-2xl p-5'>
      <Friend friendId={postUserId} name={name} subtitle={location} />
      <p className='mb-3 p-2'>{description}</p>
      {/* {picturePath && (
        <img />
      )} */}

      <div className='flex gap-5 pt-4'>

        {/* Like Icon */}
        <div className='flex gap-1 items-center'>
          <div className='cursor-pointer' onClick={handleLike}>
            {isLiked ? (
              <AiOutlineHeart size={24} color="gray" />
            ): (
              <AiFillHeart size={24} color="gray" />
            )}
          </div>
          <p className=' text-gray-600'>{likeCount}</p>
        </div>

        {/* Comment Icon */}
        <div className='flex gap-1'>
          <div
            className='cursor-pointer'
            onClick={() => setIsComments(!isComments)}
          >
            <BiComment color="gray" size={24} />
          </div>
          <p className='text-gray-600'>{comments.length}</p>
        </div>

      </div>

      {/* Comment text field */}
      {isComments && (
        <div className='mt-4'>
          {comments.map((comment, i) => (
            <div className='py-3 text-gray-500 border-t-2 border-gray' key={`${name}-${i}`}>
              <p>{comment}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Post