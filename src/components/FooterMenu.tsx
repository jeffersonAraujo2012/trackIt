import styled from "styled-components";
import { MENU_FOOTER_HIGHT } from "../params";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProgressContext } from "../App";

export default function FooterMenu() {
  const {numDoneHabitsDay, numHabitsDay} = useContext(ProgressContext);
  const progressValue = Math.ceil((numDoneHabitsDay/numHabitsDay) * 100);
  console.log(numDoneHabitsDay, numHabitsDay);

  return (
    <StyledFooterMenu>
      <Link to="/habitos">Hábitos</Link>

      <Link to="/hoje" className="progress">
        <CircularProgressbar
          value={progressValue}
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
            },
          }}
        />
      </Link>

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

  a.progress {
    position: relative;
    bottom: 20px;
    width: 91px;
    height: 91px;
  }
`;
