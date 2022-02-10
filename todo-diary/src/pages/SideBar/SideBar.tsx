import { Link, useRouteMatch } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, Statuses, statusState } from "../../atoms";
import Category from "./Category";
import NewCategory from "./NewCategory";

const SideBarWrapper = styled.div`
  padding: 10px 0;
  grid-column: 1/2;
  display: flex;
  flex-direction: column;
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

const CategoryOl = styled.ol``;

function SideBar() {
  const to_doMatch = useRouteMatch(`/${Statuses.TO_DO.toLowerCase()}`);
  const doingMatch = useRouteMatch(`/${Statuses.DOING.toLowerCase()}`);
  const doneMatch = useRouteMatch(`/${Statuses.DONE.toLowerCase()}`);

  const setStatus = useSetRecoilState(statusState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setStatus(name as any);
  };

  const categories = useRecoilValue(categoryState);
  return (
    <SideBarWrapper>
      <Link to="/diary">
        <StatusBtn>캘린더</StatusBtn>
      </Link>
      <Link to={`/${Statuses.DOING.toLowerCase()}`}>
        <StatusBtn
          isActive={doingMatch !== null}
          name={Statuses.DOING}
          onClick={onClick}
        >
          오늘
        </StatusBtn>
      </Link>
      <Link to={`/${Statuses.TO_DO.toLowerCase()}`}>
        <StatusBtn
          isActive={to_doMatch !== null}
          name={Statuses.TO_DO}
          onClick={onClick}
        >
          추후
        </StatusBtn>
      </Link>
      <Link to={`/${Statuses.DONE.toLowerCase()}`}>
        <StatusBtn
          isActive={doneMatch !== null}
          name={Statuses.DONE}
          onClick={onClick}
        >
          완료
        </StatusBtn>
      </Link>
      <CategoryOl>
        {categories.map((category) => (
          <Category key={category.id} {...category} />
        ))}
      </CategoryOl>
      <NewCategory />
    </SideBarWrapper>
  );
}

export default SideBar;
