import { Helmet } from "react-helmet";
import { useRecoilValue } from "recoil";
import {
  projectState,
  clickedTabState,
  Statuses,
  toDoSelector,
} from "../atoms";
import styled from "styled-components";
import NewToDo from "../pages/ToDo/NewToDo";
import ToDo from "../pages/ToDo/ToDo";
import SideBar from "../pages/SideBar/SideBar";

const Container = styled.div`
  padding: 0px 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
`;

const ToDoWrapper = styled.div`
  grid-column: 2/6;
`;

const Header = styled.header`
  height: 10vh;
  padding: 10px 0;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: Bold;
  color: ${(props) => props.theme.accentColor};
`;

const ProjectText = styled.h2`
  margin: 10px 0;
`;
const TodoOl = styled.ol``;

let today_date = new Date();

function ToDos() {
  const toDos = useRecoilValue(toDoSelector);
  const clickedTab = useRecoilValue(clickedTabState);
  let title = "";
  if (clickedTab.status === Statuses.DOING) {
    title = `${today_date.getMonth() + 1}월 ${today_date.getDate()}일`;
  } else if (clickedTab.status === Statuses.TO_DO) {
    title = "추후";
  } else if (clickedTab.status === Statuses.DONE) {
    title = "완료";
  }

  const projects = useRecoilValue(projectState);
  return (
    <Container>
      <Helmet>
        <title>To Do w/ Diary</title>
      </Helmet>
      <SideBar />
      <ToDoWrapper>
        <Header>
          <Title>{title}</Title>
        </Header>
        {projects.map((project) => {
          const subToDos = toDos.filter(
            (todo) => todo.projectId === project.id
          );
          if (subToDos.length !== 0) {
            return (
              <>
                <ProjectText>{project.text}</ProjectText>
                <TodoOl>
                  {subToDos.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo} />
                  ))}
                </TodoOl>
              </>
            );
          } else {
            return null;
          }
        })}
        <NewToDo />
      </ToDoWrapper>
    </Container>
  );
}

export default ToDos;
