import Navbar from "../components/Navbar"
import UserWidget from "../components/UserWidget"

type Props = {}

const Home = (props: Props) => {
  return (
    <div className="w-full h-full bg-gray-500 ">
      <Navbar />
      <div className="w-5/6 mx-auto">
        <UserWidget />
      </div>
    </div>
  )
}

export default Home