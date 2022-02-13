import styled from "styled-components";

const StatusBtn = styled.button<{ isActive?: boolean }>`
  height: 100%;
  width: 100%;
  display: block;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: 10px 0px;
  margin-bottom: 20px;
  background-color: transparent;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;

interface ITabBtn {
  isActive?: boolean;
  text: string;
}

function TabButton({ isActive, text }: ITabBtn) {
  return <StatusBtn>{text}</StatusBtn>;
}

export default TabButton;
