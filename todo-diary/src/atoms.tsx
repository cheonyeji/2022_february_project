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

export const statusState = atom<Statuses>({
  key: "status",
  default: Statuses.DOING,
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
    const status = get(statusState);
    return toDos.filter((toDo) => toDo.status === status);
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
