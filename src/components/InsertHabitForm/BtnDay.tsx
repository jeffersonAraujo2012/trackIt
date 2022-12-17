import React from "react";
import styled from "styled-components";

interface IBtnDayProp {
  text: string;
  selected: boolean;
  onClick: () => void;
}

interface ISBtnDayProp {
  selected: boolean;
  onClick: () => void;
}

export default function BtnDay({ text, selected, onClick }: IBtnDayProp) {
  return (
    <StyledBtnDay type="button" selected={selected} onClick={onClick}>
      {text}
    </StyledBtnDay>
  );
}

const StyledBtnDay = styled.button<ISBtnDayProp>`
  width: 30px;
  height: 30px;
  margin-right: 4px;

  border-radius: 5px;

  font-size: 19.976px;
  line-height: 25px;

  cursor: pointer;

  ${(props) =>
    props.selected
      ? `
      background: #CFCFCF;
      border: 1px solid #CFCFCF;
      color: white
      `
      : `
      background: #ffffff;
      border: 1px solid #d5d5d5;
      color: #dbdbdb;
      `}
`;
