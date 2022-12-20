import { createContext, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import FooterMenu from "./components/FooterMenu";
import Header from "./components/Header";
import "./css/reset.css";
import Habits from "./pages/Habits";
import Login from "./pages/Login";
import Records from "./pages/Records";
import SignUp from "./pages/SignUp";
import Today from "./pages/Today";

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

interface IProgressContext {
  numDoneHabitsDay: number;
  numHabitsDay: number;
  setNumDoneHabitsDay: (value: number) => void;
  setNumHabitsDay: (value: number) => void;
}

export const UserContext = createContext<IUserContext>({
  user: undefined,
  setUser: (user: IUser) => {},
});

export const ProgressContext = createContext<IProgressContext>({} as IProgressContext);

function App() {
  const localStorageUser = JSON.parse(localStorage.getItem("user") || "");
  const [numHabitsDay, setNumHabitsDay] = useState<number>(1);
  const [numDoneHabitsDay, setNumDoneHabitsDay] = useState<number>(0);
  const [user, setUser] = useState<IUser>(localStorageUser);
  const location = useLocation();

  function isLocationLoginOrSignUp(): boolean {
    if (location.pathname === "/" || location.pathname === "/cadastro") {
      return true;
    }
    return false;
  }
  return (
    <ProgressContext.Provider value={{numDoneHabitsDay, setNumDoneHabitsDay, numHabitsDay, setNumHabitsDay, }}>
      <UserContext.Provider value={{ user, setUser }}>
        {!isLocationLoginOrSignUp() && <Header />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/habitos" element={<Habits />} />
          <Route path="/hoje" element={<Today />} />
          <Route path="/historico" element={<Records />} />
        </Routes>
        {!isLocationLoginOrSignUp() && <FooterMenu />}
      </UserContext.Provider>
    </ProgressContext.Provider>
  );
}

export default App;
