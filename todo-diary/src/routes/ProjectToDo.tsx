import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { projectSelectorById, toDoSelector } from "../atoms";
import SideBar from "../pages/SideBar/SideBar";
import NewToDo from "../pages/ToDo/NewToDo";
import ToDo from "../pages/ToDo/ToDo";

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

const TodoOl = styled.ol``;

interface RouteParams {
  projectId: string;
}

function ProjectToDo() {
  const toDos = useRecoilValue(toDoSelector);
  const { projectId } = useParams<RouteParams>();
  const projectName = useRecoilValue(projectSelectorById(projectId));
  return (
    <Container>
      <Helmet>
        <title>To Do w/ Diary</title>
      </Helmet>
      <SideBar />
      <ToDoWrapper>
        <Header>
          <Title>{projectName}</Title>
        </Header>
        <TodoOl>
          {toDos.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </TodoOl>
        <NewToDo />
      </ToDoWrapper>
    </Container>
  );
}

export default ProjectToDo;
