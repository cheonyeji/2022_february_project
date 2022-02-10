import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, ICategory } from "../../atoms";

const CategoryLi = styled.li`
  padding: 10px 0;
`;

const DeleteBtn = styled.button`
  background-color: transparent;
  border: none;
`;

function Category({ id, text }: ICategory) {
  const setCategories = useSetRecoilState(categoryState);
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
  };
  return (
    <CategoryLi>
      <Link to={`/${text}`}>
        <span>{text}</span>
      </Link>
      {text !== "할일" ? <DeleteBtn onClick={handleDelete}>✖</DeleteBtn> : null}
    </CategoryLi>
  );
}

export default Category;
