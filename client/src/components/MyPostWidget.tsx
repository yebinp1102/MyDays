import { useState } from 'react';
import {AiOutlinePaperClip} from 'react-icons/ai';
import {ImFilePicture} from 'react-icons/im'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { createPost } from '../redux/slices/postSlice';

const MyPostWidget = () => {
  const dispatch = useAppDispatch();
  const [post, setPost] = useState<string>("");
  const [showFileUpload, setShowFileUpload] = useState<boolean>(false);
  const {user} = useAppSelector(state => state.user);

  const handleCreatePost = async(e: React.SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData(); 
    formData.append("userId", user?.user._id!);
    formData.append("description", post);
    if(user){
      const token = user.token
      formData.append("token", token)
    }
    await dispatch(createPost(formData));
    setPost("");
  }


  return (
    <div className="bg-primary rounded-2xl">

      <form className="p-5 flex flex-col gap-4 w-full" onSubmit={handleCreatePost}  >
        {/* TOP */}
        <div className="border-b-2 w-full border-b-white pb-6">

          {/* Profile img */}
          <div className='flex px-4 justify-between items-center'>
            <div className="w-16 h-16 bg-gray-400 rounded-[50%]"></div>
            <textarea 
              placeholder='How was your day?' 
              className="bg-gray-200 w-5/6 rounded-lg p-4" 
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
          </div>

          {/* File upload */}
          {showFileUpload && (
            <div className='px-3 border-primary'>
              <div  className='bg-gray-200 text-green-700 w-full p-5 mt-5 border-dashed border-2 border-green-700 rounded'>
                <input 
                  type='file' 
                  placeholder='click to select files'
                  onChange={(e) => {
                    console.log(e.target.value)
                  }}
                />
              </div>
            </div>
          )}

        </div>
        

        {/* BOTTOM */}
        <div className="flex p-3 justify-between text-green-700">
          
          {/* Menus */}
          <div className='flex gap-5'>
            <button 
              className='flex items-center gap-2' 
              onClick={() => setShowFileUpload(!showFileUpload)}
            >
              <ImFilePicture size={20} />
              <p>Image</p>
            </button>
            <div className='flex items-center gap-1'>
              <AiOutlinePaperClip  size={23} />
              <p>Clip</p>
            </div>
          </div>

          {/* Post button */}
          <button 
            className='bg-green-700 text-white py-1 px-3 border-2 rounded-lg'
            type='submit'
            disabled={!post}
          >
            POST
          </button>
        </div>
      </form>
    </div>
  )
}

export default MyPostWidget