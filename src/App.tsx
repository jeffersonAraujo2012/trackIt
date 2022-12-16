import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/reset.css";
import Login from "./pages/Login";

interface IUser {
  id: number;
  name: string;
  image: string;
  email: string;
  password: string;
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
  const [user, setUser] = useState<IUser>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
