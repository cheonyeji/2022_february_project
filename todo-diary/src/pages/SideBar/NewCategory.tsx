import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState } from "../../atoms";

interface IForm {
  category: string;
}

const Input = styled.input`
  width: 100%;
  border-style: none;
  padding: 10px 10px;
  background-color: #8854d024;
  &:focus {
    outline: none;
  }
`;

function NewCategory() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setCategory = useSetRecoilState(categoryState);
  const handleValid = ({ category }: IForm) => {
    setCategory((prevCategories) => [
      { text: category, id: Date.now() },
      ...prevCategories,
    ]);
    setValue("category", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <Input
        autoComplete="off"
        {...register("category", {
          required: "프로젝트 이름을 입력해주세요",
        })}
        placeholder="프로젝트 추가"
      />
    </form>
  );
}

export default NewCategory;
