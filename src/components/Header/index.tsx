import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../App";
import { HEADER_HIGHT } from "../../params";

export default function Header() {
  let {user} = useContext(UserContext);
  if (!user) {
    let userStorage = localStorage.getItem("user");
    if (userStorage) user = JSON.parse(userStorage);
  }
  return(
    <StyledHeader>
      <span>TrackIt</span>
      <img src={user?.image} alt={user?.name} />
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: ${HEADER_HIGHT};
  padding: 0 18px;

  background: #126ba5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

  & span {
    font-family: "Playball";
    font-size: 38.982px;
    line-height: 49px;
    color: #ffffff;
  }

  & img {
    width: 51px;
    height: 51px;
    border-radius: 98.5px;
  }
`;
