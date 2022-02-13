import React, { useEffect, useState } from "react";
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
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { useForm } from "react-hook-form";

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

const MENU_ID = "SET_PROPERTY";
// Defined just for documentation purpose
type ItemData = any;

interface IForm {
  toDo: string;
}

function ToDo({ id, title, status, category }: IToDo) {
  const [edited, setEdited] = useState(false); // 수정모드인지 확인
  const { register, handleSubmit, setValue } = useForm<IForm>();
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

  const onClickEditBtn = () => {
    setEdited(true);
  };

  const handleValid = ({ toDo }: IForm) => {
    if (toDo.length !== 0) {
      setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        return [
          ...oldToDos.slice(0, targetIndex),
          { title: toDo, id, status, category },
          ...oldToDos.slice(targetIndex + 1),
        ];
      });
    }
    setValue("toDo", "");
    setEdited(false);
  };

  return (
    <ToDoLi onContextMenu={show}>
      <input
        type="checkbox"
        checked={status !== Statuses.DONE ? false : true}
        value={status}
        onChange={onChange}
      />

      {edited ? (
        <form onSubmit={handleSubmit(handleValid)}>
          <Input autoComplete="off" {...register("toDo")} />
        </form>
      ) : (
        <span>
          {title} (프로젝트 : {category})
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
