import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./home";
import RepoCardPage from "./card";
import Footer from "../features/footer";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/repos/:id' element={<RepoCardPage/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default Routing;