import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../App";
import logo from "../assets/images/logo.svg";
import BtnBlue from "../components/forms/BtnBlue";
import Input from "../components/forms/Input";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function login(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const data = {
      email: email,
      password: password,
    };

    const promiseLogin = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      data
    );
    promiseLogin.then((res) => {
      const userLogged = res.data;
      delete userLogged.password;

      localStorage.setItem("user", JSON.stringify(userLogged));
      setUser(userLogged);

      navigate("/habitos");
    });
    promiseLogin.catch((error) => {
      setLoading(false);
      alert(error.response.data.message);
    });
  }

  return (
    <StyledLogin>
      <img src={logo} alt="TrackIt" />
      <form onSubmit={login}>
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.currentTarget.value)}
          value={email}
          disabled={loading ? true : false}
        />
        <Input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.currentTarget.value)}
          value={password}
          disabled={loading ? true : false}
        />
        <BtnBlue text="Entrar" disabled={loading ? true : false} />
      </form>
      <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
    </StyledLogin>
  );
}

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  min-height: 100vh;
  padding: 68px 36px 0;

  form {
    width: 100%;
    margin: 40px 0 25px;
  }

  a {
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
    color: #52b6ff;
  }

  a:visited {
    color: #52b6ff;
  }
`;
