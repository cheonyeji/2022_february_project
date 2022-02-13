import { Link, useRouteMatch } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, clickedTabState, Statuses } from "../../atoms";
import Category from "./Category";
import NewCategory from "./NewCategory";
import {
  MdWbSunny,
  MdWbTwighlight,
  MdCalendarToday,
  MdDoneAll,
} from "react-icons/md";
const SideBarWrapper = styled.div`
  padding: 10px 0;
  grid-column: 1/2;
  display: flex;
  flex-direction: column;
`;
const SideBarTabs = styled.ol``;
const SideBarTab = styled.li`
  display: flex;
  align-items: center;
  padding: 5px 0px;
  span {
    margin-left: 3px;
  }
`;
const CategoryOl = styled.ol``;
const StatusBtn = styled.button<{ isActive?: boolean }>`
  height: 100%;
  width: 100%;
  display: block;
  border: none;
  cursor: pointer;
  text-align: left;

  margin-bottom: 20px;
  background-color: transparent;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;
function SideBar() {
  const to_doMatch = useRouteMatch(`/status/${Statuses.TO_DO.toLowerCase()}`);
  const doingMatch = useRouteMatch(`/status/${Statuses.DOING.toLowerCase()}`);
  const doneMatch = useRouteMatch(`/status/${Statuses.DONE.toLowerCase()}`);
  const homeMatch = useRouteMatch("/");

  const setClickedTab = useSetRecoilState(clickedTabState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setClickedTab({ category: "", status: name as any });
  };
  const categories = useRecoilValue(categoryState);
  return (
    <SideBarWrapper>
      <SideBarTabs>
        <SideBarTab>
          <Link to="/diary">
            <StatusBtn>
              <MdCalendarToday />
              <span>캘린더</span>
            </StatusBtn>
          </Link>
        </SideBarTab>
        <SideBarTab>
          <Link to={`/status/${Statuses.DOING.toLowerCase()}`}>
            <StatusBtn
              isActive={doingMatch !== null || homeMatch?.isExact === true}
              name={Statuses.DOING}
              onClick={onClick}
            >
              <MdWbSunny />
              <span>오늘</span>
            </StatusBtn>
          </Link>
        </SideBarTab>
        <SideBarTab>
          <Link to={`/status/${Statuses.TO_DO.toLowerCase()}`}>
            <StatusBtn
              isActive={to_doMatch !== null}
              name={Statuses.TO_DO}
              onClick={onClick}
            >
              <MdWbTwighlight />
              <span>추후</span>
            </StatusBtn>
          </Link>
        </SideBarTab>
        <SideBarTab>
          <Link to={`/status/${Statuses.DONE.toLowerCase()}`}>
            <StatusBtn
              isActive={doneMatch !== null}
              name={Statuses.DONE}
              onClick={onClick}
            >
              <MdDoneAll />
              <span>완료</span>
            </StatusBtn>
          </Link>
        </SideBarTab>
        <hr />
        <CategoryOl>
          {categories.map((category) => (
            <Category key={category.id} {...category} />
          ))}
        </CategoryOl>
        <NewCategory />
      </SideBarTabs>
    </SideBarWrapper>
  );
}

export default SideBar;
