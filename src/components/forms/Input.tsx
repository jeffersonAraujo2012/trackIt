import styled from "styled-components";

interface IInputText {
  placeholder: string;
  type: "text" | "password" | "email";
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string;
  disabled: boolean;
}

export default function Input({
  placeholder,
  type,
  onChange,
  value,
  disabled,
}: IInputText) {
  return (
    <StyledInputText
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      required
      disabled={disabled}
    />
  );
}

const StyledInputText = styled.input`
  display: flex;
  align-items: center;

  width: 100%;
  height: 45px;
  margin-bottom: 6px;
  padding-left: 12px;

  background: ${props => props.disabled ? "#F2F2F2" : "#ffffff"};
  border: 1px solid #d5d5d5;
  border-radius: 5px;

  font-size: 19.976px;
  line-height: 25px;
  color: #666666;

  &::placeholder {
    color: #dbdbdb;
  }
`;
