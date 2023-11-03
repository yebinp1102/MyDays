import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../redux/hooks';
import { getPosts } from '../redux/slices/postSlice.ts';
import Post from './Post.tsx';

type Props = {
}

const Posts = ({}: Props) => {
  const dispatch = useDispatch();
  const {posts} = useAppSelector(state => state.post);
  const [isProfile, setIsProfile] = useState<boolean>(false);

  useEffect(() => {
    if(isProfile){
      dispatch(getUserPosts());
    }else{
      dispatch(getPosts());
    }
    // eslint-disable-line react-hooks/exhaustive-deps
  },[]);

  if(!posts) return;

  return (
    
    <div className='mt-5 flex flex-col gap-5'>
      {posts.map(({
        _id,
        userId,
        name,
        location,
        description,
        picturePath,
        userPicturePath,
        likes,
        comments
      }) => (
        <Post 
          key={_id}
          postId={_id}
          postUserId={userId}
          name={name}
          description={description}
          location={location}
          picturePath={picturePath}
          userPicturePath={userPicturePath}
          likes={likes}
          comments={comments}
        /> 
      ))}
    </div>
  )
}

export default Posts