import {MdOutlineLocationOn} from 'react-icons/md';
import {BiShoppingBag} from 'react-icons/bi';
import {BsTwitter, BsLinkedin} from 'react-icons/bs';
import {LiaUserCogSolid} from 'react-icons/lia';

type Props = {
  user: {
    _id: string,
    name: string,
    location: string,
    job: string,
    friends: [string],
    picturePath: string,
  }
}

const UserWidget = (props: Props) => {

  if(!props.user){
    return (
      <div 
        className='bg-primary w-[400px] h-[500px] flex items-center justify-center
        rounded-2xl text-lg text-gray-600'
      >
        <p>
          로그인 하고 더 많은 기능을 즐겨보세요. <br/>
          Please Sign up and enjoy more days.
        </p>
      </div>
    )
  }

  return (
    <div className='bg-primary w-[400px] mb-10 rounded-2xl flex flex-col'>
      <div className='p-5'>
        {/* section 1 */}
        <div className=' border-b-2 border-b-white flex justify-between items-center pb-5'>
          <div className='flex items-center'>
            {/* Profile Img */}
            <div className='bg-gray-400 rounded-[50%] w-16 h-16 mr-3'></div>
            <div>
              {/* Profle name */}
              <div className=' font-bold text-green-700 text-lg'>
              {props.user.name ? props.user.name : "Sample person"}
              </div>
              {/* friends */}
              <div className='text-gray-500'>
                {props.user.friends.length}friends
              </div>
            </div>
          </div>
          
          <LiaUserCogSolid size={28} color={"green"} />
        </div>

        {/* section 2 */}
        <div className=' border-b-2 border-b-white flex flex-col py-5'>
          <div className='flex gap-2 text-gray-500 mb-2'>
            <MdOutlineLocationOn size={28} color={"green"}/>
            <p>{props.user.location.length ? props.user.location : "Not filled yet"}</p>
          </div>

          <div className='flex gap-2 text-gray-500'>
            <BiShoppingBag size={28} color={"green"}/>
            <p>{props.user.job.length ? props.user.job : "Not filled yet"}</p>
          </div>

        </div>

        {/* section 3 */}
        <div className=' flex flex-col justify-between py-4'>
          <div className='font-bold text-green-700 text-lg mb-3'>Social Profiles</div>
          <div className='flex items-center gap-3 mb-2'>
            <BsTwitter size={26} color={"green"}/>
            <div>
              <p className='font-bold text-green-700'>Twitter</p>
              <p className='text-gray-500'>Social Network</p>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <BsLinkedin size={26} color={"green"}/>
            <div>
              <p className='font-bold text-green-700'>LinkedIn</p>
              <p className='text-gray-500'>Social Platform</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default UserWidget