import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  projectState,
  clickedTabState,
  selectedProjectId,
  toDoState,
  Statuses,
} from "../../atoms";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Menu,
  Item,
  useContextMenu,
  ItemParams,
  ItemProps,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

interface IForm {
  toDo: string;
}
interface RouteParams {
  projectId: string;
}

const InputWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  border-radius: 5px;
  background-color: #dcdde1;
  align-items: center;
`;

const Select = styled.select`
  width: 10%;
  border: none;
  background-color: transparent;
  :focus {
    outline: none;
  }
`;
const InputTodo = styled.input`
  width: 100%;
  border-style: none;
  padding: 15px;
  border-radius: 15px;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;
// interface RouteParams {
//   projectId: string;
// }

const DPBtn = styled.div`
  background-color: transparent;
  width: 30%;
  border: none;
  :hover {
    background-color: #b8b8b896;
  }
`;

function NewToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const clickedTab = useRecoilValue(clickedTabState);
  const projects = useRecoilValue(projectState);
  const [selectedPId, setSelectedPId] = useRecoilState(selectedProjectId);

  const [startDate, setStartDate] = useState(new Date());
  const handleDateClick = (date: Date) => {
    setStartDate(date);
  };

  const { projectId } = useParams<RouteParams>();
  if (projectId !== undefined) {
    setSelectedPId(Number(projectId));
  }

  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => {
      if (clickedTab.status === Statuses.DOING) {
        const today = new Date();
        return [
          {
            title: toDo,
            id: Date.now(),
            deadline: today,
            done: false,
            projectId: selectedPId,
          },
          ...oldToDos,
        ];
      } else if (clickedTab.status === Statuses.TO_DO) {
        if (projectId !== undefined) {
          return [
            {
              title: toDo,
              id: Date.now(),
              deadline: startDate,
              done: false,
              projectId: selectedPId,
            },
            ...oldToDos,
          ];
        }
        return [
          {
            title: toDo,
            id: Date.now(),
            done: false,
            projectId: selectedPId,
          },
          ...oldToDos,
        ];
      } else {
        const today = new Date();
        return [
          {
            title: toDo,
            id: Date.now(),
            deadline: today,
            done: true,
            projectId: selectedPId,
          },
          ...oldToDos,
        ];
      }
    });
    setValue("toDo", "");
  };

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPId(Number(event.currentTarget.value));
  };

  const MENU_ID = `SET_DEADLINE`;
  const { show } = useContextMenu({ id: MENU_ID });
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <InputWrapper>
        {projectId !== undefined ? (
          <>
            <DPBtn onClick={show}>{startDate.toDateString()}</DPBtn>
            <Menu id={MENU_ID}>
              <Item id="SELECT_DATE">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateClick}
                  minDate={new Date()}
                  inline
                />
              </Item>
            </Menu>
          </>
        ) : (
          <Select value={selectedPId} onChange={onChange}>
            {projects.map((project) => (
              <option value={project.id}>{project.text}</option>
            ))}
          </Select>
        )}

        {/* <Select value={selectedPId} onChange={onChange}>
          {projects.map((project) => (
            <option value={project.id}>{project.text}</option>
          ))}
        </Select> */}

        <InputTodo
          autoComplete="off"
          {...register("toDo", {
            required: "입력이 필요합니다",
          })}
          placeholder="할 일을 입력하세요"
        />
      </InputWrapper>
    </form>
  );
}

export default NewToDo;
