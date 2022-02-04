import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  padding: 10px 0;
`;

const TodayDate = styled.h1`
  font-size: 48px;
  font-weight: Bold;
  color: ${(props) => props.theme.accentColor};
`;

const TodoList = styled.ol``;

const TodoItem = styled.li`
  background-color: ${(props) => props.theme.listItemColor};
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 15px;
  color: ${(props) => props.theme.bgColor};
`;

const InputTodo = styled.input`
  width: 100%;
  border-style: none;
  padding: 20px;
  border-radius: 15px;
  background-color: #dcdde1;
  &:focus {
    outline: none;
  }
`;

const todos = [
  {
    id: 0,
    title: "할일1",
    done: false,
  },
  {
    id: 1,
    title: "할일2",
    done: false,
  },
];

let today_date = new Date();

function Todo() {
  const [newTodo, setNewTodo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setNewTodo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("입력값 : ", newTodo);
    setNewTodo("");
  };
  return (
    <Container>
      <Header>
        <TodayDate>
          {today_date.getMonth() + 1}월 {today_date.getDate()}일
        </TodayDate>
      </Header>
      <TodoList>
        {todos.map((todo) => (
          <TodoItem key={todo.id}>
            <input type="checkbox" />
            {todo.title}
          </TodoItem>
        ))}
      </TodoList>
      <form onSubmit={onSubmit}>
        <InputTodo
          value={newTodo}
          onChange={onChange}
          type="text"
          placeholder="할일을 입력하세요"
        />
      </form>
    </Container>
  );
}

export default Todo;
