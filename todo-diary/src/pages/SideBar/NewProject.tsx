import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { projectState } from "../../atoms";

interface IForm {
  project: string;
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

function NewProject() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setProjects = useSetRecoilState(projectState);
  const handleValid = ({ project }: IForm) => {
    setProjects((prevProjects) => [
      { text: project, id: Date.now() },
      ...prevProjects,
    ]);
    setValue("project", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <Input
        autoComplete="off"
        {...register("project", {
          required: "프로젝트 이름을 입력해주세요",
        })}
        placeholder="프로젝트 추가"
      />
    </form>
  );
}

export default NewProject;
