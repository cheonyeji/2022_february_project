import styled from "styled-components";

interface HeaderProps {
  year: number;
  month: number;
  setMonth: (val: number) => void;
  setYear: (val: number) => void;
  goToday: () => void;
}

function Header({ year, month, setMonth, setYear, goToday }: HeaderProps) {
  const onPrevBtnClick = () => {
    if (month - 1 < 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };
  const onNextBtnClick = () => {
    if (month + 1 > 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };
  return (
    <Wrapper>
      <YearMonth>
        {year}년 {month}월
      </YearMonth>
      <Btns>
        <Btn onClick={onPrevBtnClick}>&lt;</Btn>
        <Btn onClick={() => goToday()}>Today</Btn>
        <Btn onClick={onNextBtnClick}>&gt;</Btn>
      </Btns>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0px;
`;

const YearMonth = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const Btns = styled.div``;

const Btn = styled.button`
  margin: 0 5px;
  border: none;
  background-color: transparent;
  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

export default Header;
