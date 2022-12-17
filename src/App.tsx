import { createContext, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import FooterMenu from "./components/FooterMenu";
import Header from "./components/Header";
import "./css/reset.css";
import Habits from "./pages/Habits";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

interface IUser {
  id: number;
  name: string;
  image: string;
  email: string;
  password?: string;
  token: string;
}

interface IUserContext {
  user?: IUser;
  setUser: (user: IUser) => void;
}

export const UserContext = createContext<IUserContext>({
  user: undefined,
  setUser: (user: IUser) => {},
});

function App() {
  const localStorageUser = JSON.parse(localStorage.getItem("user") || "");
  const [user, setUser] = useState<IUser>(localStorageUser);
  const location = useLocation();

  function isLocationLoginOrSignUp(): boolean {
    if (location.pathname === "/" || location.pathname === "/cadastro") {
      return true;
    }
    return false;
  }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!isLocationLoginOrSignUp() && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<SignUp />} />
        <Route path="/habitos" element={<Habits />} />
      </Routes>
      {!isLocationLoginOrSignUp() && <FooterMenu />}
    </UserContext.Provider>
  );
}

export default App;
