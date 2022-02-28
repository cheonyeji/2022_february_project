import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { projectState, IToDo, Statuses, toDoState } from "../../atoms";
import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
  ItemParams,
  ItemProps,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ToDoLi = styled.li`
  background-color: ${(props) => props.theme.listItemColor};
  padding: 10px;
  margin: 10px 0px;
  border-radius: 5px;
  color: ${(props) => props.theme.bgColor};
  display: flex;
  align-items: center; // 체크박스와 할일 아이템 중앙정렬
  span {
    flex: 1;
  }
`;

const EditBtn = styled.button`
  background-color: transparent;
  border: none;
  margin-right: 3px;
`;

const DeleteBtn = styled.button`
  background-color: transparent;
  border: none;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid whitesmoke;
  :focus {
    outline: none;
  }
  padding: 5px 5px;
  color: white;
`;

// Defined just for documentation purpose
type ItemData = any;

interface IForm {
  toDo: string;
}

function ToDo({ id, title, done, deadline, projectId }: IToDo) {
  const MENU_ID = `SET_PROPERTY_${id}`;
  const [edited, setEdited] = useState(false); // 수정모드인지 확인
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const projects = useRecoilValue(projectState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    // 안한거로 변경
    if (!checked) {
      setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        const finalToDos = [
          ...oldToDos.slice(0, targetIndex),
          { title, id, projectId, deadline, done: false },
          ...oldToDos.slice(targetIndex + 1),
        ];
        return finalToDos;
      });
    } else {
      setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        const finalToDos = [
          ...oldToDos.slice(0, targetIndex),
          { title, id, projectId, deadline, done: true },
          ...oldToDos.slice(targetIndex + 1),
        ];
        return finalToDos;
      });
    }
  };
  const handleDelete = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const finalToDos = [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
      return finalToDos;
    });
  };

  const { show } = useContextMenu({ id: MENU_ID });
  const handleItemClick = () => {
    const today = new Date();
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        { title, id, deadline: today, done, projectId },
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const handleProjectClick = ({ data }: ItemParams<ItemProps, ItemData>) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        {
          title,
          id,
          deadline,
          done,
          projectId: Number(data),
        },
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const onClickEditBtn = () => {
    setEdited(true);
  };

  const handleValid = ({ toDo }: IForm) => {
    if (toDo.length !== 0) {
      setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        return [
          ...oldToDos.slice(0, targetIndex),
          { title: toDo, id, deadline, done, projectId },
          ...oldToDos.slice(targetIndex + 1),
        ];
      });
    }
    setValue("toDo", "");
    setEdited(false);
  };

  const [startDate, setStartDate] = useState(new Date());
  const handleDateClick = (date: any) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        { title, id, deadline: date, done, projectId },
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
    setStartDate(date as any);
  };
  return (
    <ToDoLi onContextMenu={show}>
      <input
        type="checkbox"
        checked={done}
        // value={done}
        onChange={onChange}
      />

      {edited ? (
        <form onSubmit={handleSubmit(handleValid)}>
          <Input autoComplete="off" {...register("toDo")} />
        </form>
      ) : (
        <span>
          {title} {deadline?.toDateString()}
        </span>
      )}
      {edited ? null : (
        <>
          <EditBtn onClick={onClickEditBtn}>
            <MdModeEdit size={20} />
          </EditBtn>
          <DeleteBtn onClick={handleDelete}>
            <MdDeleteForever size={20} />
          </DeleteBtn>
        </>
      )}

      <Menu id={MENU_ID}>
        <Item onClick={handleItemClick} id={Statuses.DOING}>
          기한: 오늘
        </Item>
        <Submenu label="기한 설정">
          <Item id="SELECT_DATE">
            <DatePicker
              selected={startDate}
              onChange={(date) => handleDateClick(date)}
              minDate={new Date()}
              inline
            />
          </Item>
        </Submenu>
        <Separator />
        <Submenu label="프로젝트">
          {projects.map((category) => (
            <Item
              onClick={handleProjectClick}
              data={`${category.id}`}
              id={`${category.id}`}
            >
              {category.text}
            </Item>
          ))}
        </Submenu>
      </Menu>
    </ToDoLi>
  );
}

export default ToDo;
