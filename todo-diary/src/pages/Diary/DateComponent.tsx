import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { diarySelectorByDate } from "../../atoms";

interface DateProps {
  idx: number;
  value: number;
  lastDate: number;
  firstDate: number;
  findToday: number | false;
  setClickedDate: (val: Date) => void;
  setShowModal: (val: boolean) => void;
  month: number;
  year: number;
}

interface IDateDiv {
  idx: number;
  lastDate: number;
  firstDate: number;
  findToday: number | false;
}

function DateComponent({
  idx,
  value,
  lastDate,
  firstDate,
  findToday,
  setClickedDate,
  setShowModal,
  month,
  year,
}: DateProps) {
  const targetDiary = useRecoilValue(
    diarySelectorByDate(new Date(year, month, value).toDateString())
  );

  const onDateClick = (date: number) => {
    setShowModal(true);
    setClickedDate(new Date(year, month, date));
  };
  return (
    <DateDiv
      idx={idx}
      lastDate={lastDate}
      firstDate={firstDate}
      findToday={findToday}
      onClick={() => onDateClick(value)}
    >
      <p>{value}</p>
      <span>{targetDiary?.text ? targetDiary.emoji : null}</span>
    </DateDiv>
  );
}

const DateDiv = styled.div<IDateDiv>`
  cursor: pointer;
  width: calc(100% / 7);
  border-bottom: 1px solid #616161;
  border-left: 1px solid #616161;
  text-align: right;
  height: 12vh;
  padding: 5px;
  :nth-child(7n + 1) {
    color: #e84118;
  }
  :nth-child(7n) {
    color: #00a8ff;
  }

  p {
    margin-bottom: 5px;
  }

  ${(props) =>
    props.idx < props.lastDate && `color: #969696; span {opacity:.5;}`};
  ${(props) =>
    props.firstDate > 0 &&
    props.idx > props.firstDate - 1 &&
    `
    color: #969696; span {opacity:.5;}
  `};

  ${(props) => props.findToday && `span {background-color: #e5ff00a4;}`}
`;

export default DateComponent;
