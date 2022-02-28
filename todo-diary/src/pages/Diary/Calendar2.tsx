import { useEffect, useState } from "react";
import styled from "styled-components";
import Body from "./Body";
import Header from "./Header";

function Calendar2() {
  let view = new Date();
  const viewYear = view.getFullYear();
  const viewMonth = view.getMonth() + 1;

  const [month, setMonth] = useState(viewMonth);
  const [year, setYear] = useState(viewYear);
  const [totalDate, setTotalDate] = useState<number[]>([]);

  const changeDate = (month: number) => {
    const prevLast = new Date(viewYear, month - 1, 0);
    const thisLast = new Date(viewYear, month, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const prevDates = []; // 이전날짜
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = []; // 다음날짜

    if (PLDay !== 6) {
      for (let i = 0; i < PLDay + 1; i++) {
        prevDates.unshift(PLDate - i);
      }
    }
    for (let i = 1; i < 7 - TLDay; i++) {
      if (i === 0) {
        return nextDates;
      }
      nextDates.push(i);
    }

    return prevDates.concat(thisDates, nextDates);
  };

  useEffect(() => {
    setTotalDate(changeDate(viewMonth));
  }, []);

  useEffect(() => {
    setTotalDate(changeDate(month));
  }, [month]);

  const [today, setToday] = useState(0);

  const goToday = () => {
    let TODAY = new Date().getDate();
    let goMonth = new Date().getMonth() + 1;
    setYear(new Date().getFullYear());
    setMonth(goMonth);
    setToday(TODAY);
  };

  return (
    <Wrapper>
      <Header
        year={year}
        month={month}
        setMonth={setMonth}
        setYear={setYear}
        goToday={goToday}
      />
      <Body totalDate={totalDate} today={today} month={month} year={year} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
`;

export default Calendar2;
