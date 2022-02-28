import { Link, useRouteMatch } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  clickedTabState,
  Statuses,
  toDoState,
  IProject,
  selectedProjectId,
  projectState,
} from "../../atoms";
import {
  Menu,
  Item,
  useContextMenu,
  ItemParams,
  ItemProps,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ProjectLi = styled.li`
  padding: 5px 0;
  display: flex;
`;

const DeleteBtn = styled.button`
  background-color: transparent;
  border: none;
`;

const StatusBtn = styled.button<{ isActive?: boolean }>`
  height: 100%;
  width: 100%;
  display: block;
  border: none;
  cursor: pointer;
  text-align: left;
  margin-bottom: 20px;
  background-color: transparent;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid whitesmoke;
  :focus {
    outline: none;
  }
  padding: 5px 5px;
`;

type ItemData = any;
interface IForm {
  project: string;
}

function Project({ id, text }: IProject) {
  const MENU_ID = `CHANGE_PROJECTNAME_${id}`;
  const [edited, setEdited] = useState(false);
  const setSelectedProject = useSetRecoilState(selectedProjectId);
  const setProjects = useSetRecoilState(projectState);
  const setToDos = useSetRecoilState(toDoState);
  const setClickedTab = useSetRecoilState(clickedTabState);
  const projectMatch = useRouteMatch(`/projectId/${id}`);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const { show } = useContextMenu({ id: MENU_ID });

  const handleDelete = () => {
    setProjects((prevProjects) => {
      const targetIndex = prevProjects.findIndex(
        (project) => project.id === id
      );
      return [
        ...prevProjects.slice(0, targetIndex),
        ...prevProjects.slice(targetIndex + 1),
      ];
    });
    setToDos((prevToDos) => prevToDos.filter((toDo) => toDo.projectId !== id));
    setClickedTab({ projectId: 0, status: Statuses.DOING });
    setSelectedProject(1);
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setClickedTab({ projectId: Number(value) as any, status: Statuses.TO_DO });
  };

  const handleProjectClick = ({ data }: ItemParams<ItemProps, ItemData>) => {
    if (data !== 1) setEdited(true);
  };

  const handleValid = ({ project }: IForm) => {
    if (project.length !== 0) {
      setProjects((prevProjects) => {
        const targetIndex = prevProjects.findIndex(
          (project) => project.id === id
        );
        return [
          ...prevProjects.slice(0, targetIndex),
          { text: project, id },
          ...prevProjects.slice(targetIndex + 1),
        ];
      });
    }
    setValue("project", "");
    setEdited(false);
  };

  return (
    <ProjectLi onContextMenu={show}>
      {edited ? (
        <form onSubmit={handleSubmit(handleValid)}>
          <Input
            autoComplete="off"
            {...register("project")}
            placeholder={text}
          />
        </form>
      ) : (
        <>
          <Link to={`/projectId/${id}`}>
            <StatusBtn
              isActive={projectMatch !== null}
              name={text}
              value={id}
              onClick={onClick}
            >
              <span>{text}</span>
            </StatusBtn>
          </Link>

          <Menu id={MENU_ID}>
            <Item data={id} onClick={handleProjectClick}>
              프로젝트 수정
            </Item>
          </Menu>
        </>
      )}

      {id !== 1 ? (
        <DeleteBtn onClick={handleDelete}>
          <Link to={`/status/${Statuses.DOING.toLowerCase()}`}>✖</Link>
        </DeleteBtn>
      ) : null}

      {/* {id !== 1 ? (
        <Menu id={MENU_ID}>
          <Item data={id} onClick={handleProjectClick}>
            프로젝트 수정 {id} {text}
          </Item>
        </Menu>
      ) : null} */}
    </ProjectLi>
  );
}

export default Project;
