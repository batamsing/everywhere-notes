import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./page/login";
import Register from "./page/register";
import Home from "./page/home/home";
import NotFound from "./page/NotFound";
import UserProfile from "./component/profile/userProfile";
import HelpAndSupport from "./page/help/helpAndSupport";
import AboutDeveloper from "./page/about/aboutDeveloper";
import About from "./page/about/about";

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:noteId" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/help&support" element={<HelpAndSupport />} />
          <Route path="/aboutDeveloper" element={<AboutDeveloper />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
