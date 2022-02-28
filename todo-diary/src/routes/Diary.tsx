import { Helmet } from "react-helmet";
import styled from "styled-components";
import Calendar2 from "../pages/Diary/Calendar2";
import SideBar from "../pages/SideBar/SideBar";

const Container = styled.div`
  padding: 0px 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
`;

const DiaryWrapper = styled.div`
  grid-column: 2/6;
`;

function Diary() {
  return (
    <Container>
      <Helmet>
        <title>To Do w/ Diary</title>
      </Helmet>
      <SideBar />
      <DiaryWrapper>
        <Calendar2 />
      </DiaryWrapper>
    </Container>
  );
}

export default Diary;
