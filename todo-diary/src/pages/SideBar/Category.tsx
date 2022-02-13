import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  categoryState,
  clickedTabState,
  ICategory,
  selectedCategoryState,
  Statuses,
  toDoState,
} from "../../atoms";

const CategoryLi = styled.li`
  padding: 10px 0;
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
  padding: 10px 0px;
  margin-bottom: 20px;
  background-color: transparent;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;
function Category({ id, text }: ICategory) {
  const setSelectedCategory = useSetRecoilState(selectedCategoryState);
  const setCategories = useSetRecoilState(categoryState);
  const setToDos = useSetRecoilState(toDoState);
  const setClickedTab = useSetRecoilState(clickedTabState);
  const handleDelete = () => {
    setCategories((prevCategories) => {
      const targetIndex = prevCategories.findIndex(
        (category) => category.id === id
      );
      return [
        ...prevCategories.slice(0, targetIndex),
        ...prevCategories.slice(targetIndex + 1),
      ];
    });
    setToDos((prevToDos) => prevToDos.filter((toDo) => toDo.category !== text));
    setClickedTab({ category: "", status: Statuses.DOING });
    setSelectedCategory("할일");
  };
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setClickedTab({ category: name as any, status: Statuses.TO_DO });
  };
  return (
    <CategoryLi>
      <Link to={`/projectId/${text}`}>
        <StatusBtn name={text} onClick={onClick}>
          <span>{text}</span>
        </StatusBtn>
      </Link>
      {text !== "할일" ? (
        <DeleteBtn onClick={handleDelete}>
          <Link to={`/status/${Statuses.DOING.toLowerCase()}`}>✖</Link>
        </DeleteBtn>
      ) : null}
    </CategoryLi>
  );
}

export default Category;
