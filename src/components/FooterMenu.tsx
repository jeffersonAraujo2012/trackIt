import styled from "styled-components";
import { MENU_FOOTER_HIGHT } from "../params";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

export default function FooterMenu() {
  return (
    <StyledFooterMenu>
      <Link to="/habitos">Hábitos</Link>

      <div>
        <CircularProgressbar
          value={70}
          text="Hoje"
          background={true}
          backgroundPadding={5}
          styles={{
            text: {
              fill: "white",
            },
            path: {
              stroke: "white",
            },
            trail: {
              stroke: "#52b6ff",
            },
            background: {
              fill: "#52b6ff",
            }
          }}
        />
      </div>

      <Link to="/historico">Histórico</Link>
    </StyledFooterMenu>
  );
}

const StyledFooterMenu = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: ${MENU_FOOTER_HIGHT};
  padding: 32px;
  left: 0;
  bottom: 0;

  background: #ffffff;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.15);

  a {
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;
    text-decoration: none;

    color: #52b6ff;
  }

  & > div {
    position: relative;
    bottom: 20px;
    width: 91px;
    height: 91px;
  }
`;
