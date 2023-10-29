import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.tsx"
import Auth from "./pages/Auth.tsx"

function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth /> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
