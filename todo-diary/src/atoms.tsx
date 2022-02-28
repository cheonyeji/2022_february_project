import { atom, selector, selectorFamily } from "recoil";

/**
 * 오늘 / 추후/ 완료 선택하거나 프로젝트 선택된 경우로 나뉨
 */
export enum Statuses {
  "DOING" = "DOING",
  "DONE" = "DONE",
  "TO_DO" = "TO_DO",
}

interface IClickedTab {
  status: Statuses;
  projectId: number;
}

export const clickedTabState = atom<IClickedTab>({
  key: "status",
  default: { status: Statuses.DOING, projectId: 0 },
});

// select tag에 입력된 값 저장
export const selectedProjectId = atom<number>({
  key: "selectedProjectId",
  default: 1,
});

export interface IToDo {
  id: number;
  title: string;
  projectId: number;
  done: boolean;
  deadline?: Date;
}

export const toDoState = atom<IToDo[]>({
  key: "toDO",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const { status, projectId } = get(clickedTabState);
    // status 클릭, 모든 project 다 보여주기
    if (projectId === 0) {
      const today = new Date();
      switch (status) {
        case Statuses.DOING:
          return toDos.filter(
            (toDo) =>
              toDo.deadline?.toDateString() === today.toDateString() &&
              !toDo.done
          );
        case Statuses.TO_DO:
          return toDos.filter(
            (toDo) =>
              (toDo.deadline === undefined ||
                toDo.deadline?.toDateString() !== today.toDateString()) &&
              !toDo.done
          );
        case Statuses.DONE:
          return toDos.filter((toDo) => toDo.done === true);
      }
    }
    // cateogory 클릭, status 상관없이 보여주기
    else {
      return toDos.filter((toDo) => toDo.projectId === projectId);
    }
  },
});

export interface IProject {
  text: string;
  id: number;
}

export const projectState = atom<IProject[]>({
  key: "project",
  default: [{ text: "할일", id: 1 }],
});

export const projectSelectorById = selectorFamily({
  key: "projectSelectorById",
  get:
    (projectId) =>
    ({ get }) => {
      const projects = get(projectState);
      return projects.find((project) => project.id === Number(projectId))?.text;
    },
});

export const projectSelectorByText = selectorFamily({
  key: "projectSelectorById",
  get:
    (projectText) =>
    ({ get }) => {
      const projects = get(projectState);
      return projects.find((project) => project.text === projectText)?.id;
    },
});

export interface IDiary {
  text: string;
  date: string;
  emoji?: any;
}

export const diaryState = atom<IDiary[]>({
  key: "diary",
  default: [],
});

export const diarySelectorByDate = selectorFamily({
  key: "diarySelector",
  get:
    (paramDate) =>
    ({ get }) => {
      const diaries = get(diaryState);
      return diaries.find((diary) => diary.date === paramDate);
    },
});
