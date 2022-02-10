import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  categoryState,
  selectedCategoryState,
  statusState,
  toDoState,
} from "../../atoms";

interface IForm {
  toDo: string;
}

const InputWrapper = styled.div`
  display: flex;
  background-color: #dcdde1;
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
  padding: 20px;
  border-radius: 15px;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

function NewToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const status = useRecoilValue(statusState);
  const categories = useRecoilValue(categoryState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState
  );
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { title: toDo, id: Date.now(), status, category: selectedCategory },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.currentTarget.value);
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <InputWrapper>
        <Select value={selectedCategory} onChange={onChange}>
          {categories.map((category) => (
            <option value={category.text}>{category.text}</option>
          ))}
        </Select>
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
