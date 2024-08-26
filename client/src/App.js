import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Component/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Topics from "./pages/Topics";
import User from "./pages/User";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Footer from "./Component/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/topics" element={<Topics />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/sign-in" element={<Signin />}></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
