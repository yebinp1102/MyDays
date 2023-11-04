import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout } from '../redux/slices/userSlice';


const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {user} = useAppSelector(state => state.user);

  return (
    <div className='h-[80px] bg-primary mb-10'>
      <div className='w-5/6 mx-auto h-full flex items-center justify-between'>
        {/* LOGO */}
        <div className="font-bold font-sunflower text-2xl text-green-700 cursor-pointer" onClick={() => navigate("/")}>
          MyDays
        </div>

        {/* AUTH BUTTONS */}
        <div className='flex items-center'>
          {!user ? (
            <button 
              className='border-2 py-1 px-2 rounded-lg text-gray-600 hover:bg-green-700 hover:text-white transition duration-300 tracking-wide' 
              onClick={() => navigate("/auth")}
            >
              LOGIN / REGISTER
            </button>
          ): (
            <div className='flex items-center gap-4 text-gray-500'>
              <div className=''>
                {user && user.user.name}
              </div>
              {/* LOGOUT */}
              <button 
                className='border-2 py-1 px-2 rounded-lg text-gray-600 hover:bg-green-700 hover:text-white transition duration-300'
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </div>
          )}
        </div>
    
        
      </div>
    </div>
  )
}

export default Navbar