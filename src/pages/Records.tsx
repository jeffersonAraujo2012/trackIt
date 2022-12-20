import styled from "styled-components";
import { HEADER_HIGHT, MENU_FOOTER_HIGHT } from "../params";

export default function Records() {
  return (
    <StyledRecords>
      <h1>Histórico</h1>
      <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
    </StyledRecords>
  );
}

const StyledRecords = styled.div`
  width: 100%;
  min-height: calc(100vh - ${HEADER_HIGHT} - ${MENU_FOOTER_HIGHT});
  margin-top: ${HEADER_HIGHT};
  margin-bottom: ${MENU_FOOTER_HIGHT};
  padding: 0 16px;
  padding-top: 28px;

  background-color: #e5e5e5;

  h1 {
    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
  }

  p {
    margin-top: 28px;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
  }
`;
