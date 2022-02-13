import { atom, selector } from "recoil";

export enum Statuses {
  "DOING" = "DOING",
  "DONE" = "DONE",
  "TO_DO" = "TO_DO",
}

export interface IToDo {
  id: number;
  title: string;
  status: Statuses;
  category: string;
}

interface IClickedTab {
  status: Statuses;
  category: string;
}

export const clickedTabState = atom<IClickedTab>({
  key: "status",
  default: { status: Statuses.DOING, category: "" },
});

export const selectedCategoryState = atom<string>({
  key: "selectedCategory",
  default: "할일",
});

export const toDoState = atom<IToDo[]>({
  key: "toDO",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const { status, category } = get(clickedTabState);
    // status 클릭, 모든 category 다 보여주기
    if (category === "") {
      return toDos.filter((toDo) => toDo.status === status);
    }
    // cateogory 클릭, status 상관없이 보여주기
    else {
      return toDos.filter((toDo) => toDo.category === category);
    }
  },
});

export interface ICategory {
  text: string;
  id: number;
}

export const categoryState = atom<ICategory[]>({
  key: "category",
  default: [{ text: "할일", id: Date.now() }],
});
