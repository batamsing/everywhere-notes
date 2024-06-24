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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
