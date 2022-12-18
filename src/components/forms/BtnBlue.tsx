import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

interface IBtnBlue {
  text: string;
  disabled: boolean;
  dataTest?: string;
}

export default function BtnBlue({ text, disabled, dataTest }: IBtnBlue) {
  return (
    <StyledBtnBlue disabled={disabled} data-test={dataTest}>
      {disabled ? (
        <ThreeDots
          height="45"
          width="80"
          radius="9"
          color="white"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
        />
      ) : (
        text
      )}
    </StyledBtnBlue>
  );
}

const StyledBtnBlue = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 45px;

  background: #52b6ff;
  border-radius: 4.63636px;
  border: none;

  font-size: 20.976px;
  line-height: 26px;
  text-align: center;
  color: white;

  cursor: pointer;

  &:disabled {
    opacity: 0.7;
  }
`;
