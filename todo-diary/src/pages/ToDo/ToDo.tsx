import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, IToDo, Statuses, toDoState } from "../../atoms";
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

const MENU_ID = "SET_PROPERTY";
// Defined just for documentation purpose
type ItemData = any;

function ToDo({ id, title, status, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoryState);
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

  const { show } = useContextMenu({ id: MENU_ID });
  const handleItemClick = ({ event }: ItemParams<ItemProps, ItemData>) => {
    switch (event.currentTarget.id) {
      case Statuses.TO_DO:
        setToDos((oldToDos) => {
          const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
          return [
            ...oldToDos.slice(0, targetIndex),
            { title, id, status: Statuses.TO_DO, category },
            ...oldToDos.slice(targetIndex + 1),
          ];
        });
        break;
      case Statuses.DOING:
        setToDos((oldToDos) => {
          const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
          return [
            ...oldToDos.slice(0, targetIndex),
            { title, id, status: Statuses.DOING, category },
            ...oldToDos.slice(targetIndex + 1),
          ];
        });
        break;
      case Statuses.DONE:
        setToDos((oldToDos) => {
          const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
          return [
            ...oldToDos.slice(0, targetIndex),
            { title, id, status: Statuses.DONE, category },
            ...oldToDos.slice(targetIndex + 1),
          ];
        });
        break;
    }
  };

  const handleCategoryClick = ({ event }: ItemParams<ItemProps, ItemData>) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        { title, id, status, category: event.currentTarget.innerText },
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <ToDoLi onContextMenu={show}>
      <input
        type="checkbox"
        checked={status !== Statuses.DONE ? false : true}
        value={status}
        onChange={onChange}
      />
      <span>
        {title} (프로젝트 : {category})
      </span>
      <DeleteBtn onClick={handleDelete}>❌</DeleteBtn>

      <Menu id={MENU_ID}>
        <Item onClick={handleItemClick} id={Statuses.DOING}>
          기한: 오늘
        </Item>
        <Item onClick={handleItemClick} id={Statuses.TO_DO}>
          기한: 추후
        </Item>
        <Item onClick={handleItemClick} id={Statuses.DONE}>
          기한: 완료
        </Item>
        <Separator />
        <Submenu label="프로젝트">
          {categories.map((category) => (
            <Item onClick={handleCategoryClick} id={`${category.id}`}>
              {category.text}
            </Item>
          ))}
        </Submenu>
      </Menu>
    </ToDoLi>
  );
}

export default ToDo;
