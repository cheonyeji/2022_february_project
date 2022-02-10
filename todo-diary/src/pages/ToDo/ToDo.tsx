import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, Statuses, toDoState } from "../../atoms";

const ToDoLi = styled.li`
  background-color: ${(props) => props.theme.listItemColor};
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 15px;
  color: ${(props) => props.theme.bgColor};
  display: flex;
  align-items: center; // 체크박스와 할일 아이템 중앙정렬
`;

const DeleteBtn = styled.button`
  background-color: transparent;
  border: none;
`;
function ToDo({ id, title, status, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    // 안한거로 변경
    if (!checked) {
      setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        const finalToDos = [
          ...oldToDos.slice(0, targetIndex),
          { title, id, status: Statuses.DOING, category },
          ...oldToDos.slice(targetIndex + 1),
        ];
        return finalToDos;
      });
    } else {
      setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        const finalToDos = [
          ...oldToDos.slice(0, targetIndex),
          { title, id, status: Statuses.DONE, category },
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
  return (
    <ToDoLi>
      <input
        type="checkbox"
        checked={status !== Statuses.DONE ? false : true}
        value={status}
        onChange={onChange}
      />
      <span>
        {title} / 카테고리 : {category}
      </span>
      <DeleteBtn onClick={handleDelete}>❌</DeleteBtn>
    </ToDoLi>
  );
}

export default ToDo;
