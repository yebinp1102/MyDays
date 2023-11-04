import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../redux/hooks';
import { getPosts, getUserPosts } from '../redux/slices/postSlice.ts';
import Post from './Post.tsx';

type Props = {
  userId?: string,
  isProfile: boolean
}

const Posts = (props: Props) => {
  const dispatch = useDispatch<any>();
  const {posts} = useAppSelector(state => state.post);

  useEffect(() => {
    if(props.isProfile){
      dispatch(getUserPosts({userId: props.userId}));
    }else{
      dispatch(getPosts());
    }
  },[]);

  if(!posts) return;

  return (
    
    <div className='flex flex-col gap-5'>
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