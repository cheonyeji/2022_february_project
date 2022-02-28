import styled from "styled-components";
import DateComponent from "./DateComponent";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { diarySelectorByDate, diaryState } from "../../atoms";
import React, { useEffect, useState } from "react";

interface BodyProps {
  totalDate: number[];
  today: number;
  month: number;
  year: number;
}

enum emojis {
  happy = "😀",
  littleSad = "😥",
  sad = "😭",
  thinking = "🤔",
  upset = "😠",
}

interface IForm {
  diaryText: string;
}

function Body({ totalDate, today, month, year }: BodyProps) {
  const lastDate = totalDate.indexOf(1);
  const firstDate = totalDate.indexOf(1, 7);
  const findToday = totalDate.indexOf(today);
  const getMonth = new Date().getMonth() + 1;

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [clickedDate, setClickedDate] = useState(new Date());
  const setDiaryState = useSetRecoilState(diaryState);
  const [editing, setEditing] = useState(false);
  const [showDiary, setShowDiary] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [clickedEmoji, setClikcedEmoji] = useState<string>(emojis.happy);

  const targetDiary = useRecoilValue(
    diarySelectorByDate(clickedDate.toDateString())
  );

  const handleValid = ({ diaryText }: IForm) => {
    diaryText.replaceAll("<br>", "\r\n"); // textarea 줄바꿈 처리
    setDiaryState((prevDiaries) => {
      const targetIndex = prevDiaries.findIndex(
        (diary) => diary.date === clickedDate.toDateString()
      );

      if (targetIndex !== -1) {
        return [
          ...prevDiaries.slice(0, targetIndex),
          {
            text: diaryText,
            date: clickedDate.toDateString(),
            emoji: clickedEmoji,
          },
          ...prevDiaries.slice(targetIndex + 1),
        ];
      }

      return [
        ...prevDiaries,
        {
          text: diaryText,
          date: clickedDate.toDateString(),
          emoji: clickedEmoji,
        },
      ];
    });

    setValue("diaryText", "");
    setShowDiary(true);
    setEditing(false);
  };

  useEffect(() => {
    if (showModal === false) {
      setEditing(false);
      setShowDiary(false);
    } else if (targetDiary?.text && showModal) {
      setShowDiary(true);
      setEditing(false);
    } else {
      setEditing(true);
      setShowDiary(false);
    }
  }, [targetDiary?.text, showModal]);

  const onEmojiClick = (event: React.MouseEvent<HTMLLIElement>) => {
    setClikcedEmoji(event.currentTarget.innerText);
  };

  const onDelete = () => {
    setDiaryState((prevDiaries) => {
      const targetIndex = prevDiaries.findIndex(
        (diary) => diary.date === clickedDate.toDateString()
      );

      return [
        ...prevDiaries.slice(0, targetIndex),
        ...prevDiaries.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <Wrapper>
      <Modal isOpen={editing} onRequestClose={() => setShowModal(false)}>
        <TopNav>
          <TitleDate>{clickedDate.toDateString()}</TitleDate>
          <BtnClose onClick={() => setShowModal(false)}>✖</BtnClose>
        </TopNav>
        <EditWrapper>
          <Emojis>
            <Emoji
              key={emojis.happy}
              onClick={onEmojiClick}
              isActive={clickedEmoji === emojis.happy}
            >
              {emojis.happy}
            </Emoji>
            <Emoji
              key={emojis.littleSad}
              onClick={onEmojiClick}
              isActive={clickedEmoji === emojis.littleSad}
            >
              {emojis.littleSad}
            </Emoji>
            <Emoji
              key={emojis.sad}
              onClick={onEmojiClick}
              isActive={clickedEmoji === emojis.sad}
            >
              {emojis.sad}
            </Emoji>
            <Emoji
              key={emojis.thinking}
              onClick={onEmojiClick}
              isActive={clickedEmoji === emojis.thinking}
            >
              {emojis.thinking}
            </Emoji>
            <Emoji
              key={emojis.upset}
              onClick={onEmojiClick}
              isActive={clickedEmoji === emojis.upset}
            >
              {emojis.upset}
            </Emoji>
          </Emojis>
          <Form onSubmit={handleSubmit(handleValid)}>
            <DiaryInput
              {...register("diaryText")}
              placeholder={targetDiary?.text}
            />
            <Btn type="submit">✔</Btn>
          </Form>
        </EditWrapper>
      </Modal>

      <Modal isOpen={showDiary} onRequestClose={() => setShowModal(false)}>
        <TopNav>
          <TitleDate>{clickedDate.toDateString()}</TitleDate>
          <BtnClose onClick={() => setShowModal(false)}>✖</BtnClose>
        </TopNav>
        <EditWrapper>
          <DiarySpan>{targetDiary?.emoji}</DiarySpan>
          <DiarySpan>{targetDiary?.text}</DiarySpan>
          <Btn
            onClick={() => {
              setEditing(true);
              setShowDiary(false);
              setValue("diaryText", targetDiary?.text as any); // 수정이니까 예전값 받아오기
            }}
          >
            🖋
          </Btn>
          <Btn onClick={onDelete}>🗑</Btn>
        </EditWrapper>
      </Modal>

      <Days>
        {WEEKDAY.map((day, idx) => (
          <Day key={idx}>{day}</Day>
        ))}
      </Days>
      <Dates>
        {totalDate.map((date, idx) => (
          <DateComponent
            idx={idx}
            value={date}
            lastDate={lastDate}
            firstDate={firstDate}
            findToday={findToday === idx && month === getMonth && findToday}
            setClickedDate={setClickedDate}
            setShowModal={setShowModal}
            year={year}
            month={month}
          />
        ))}
      </Dates>
    </Wrapper>
  );
}

const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];

const Wrapper = styled.div``;

const TopNav = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Emojis = styled.ul`
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
`;

const Emoji = styled.li<{ isActive: boolean }>`
  padding: 3px 1px;
  font-size: 17px;
  cursor: pointer;
  background-color: ${(props) =>
    props.isActive ? "#ebe833a2" : "transparent"};
`;

const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleDate = styled.h2`
  font-weight: bold;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const BtnClose = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition-duration: 0.2s;
  :hover {
    background-color: #555555;
    color: white;
  }
`;

const Btn = styled.button`
  margin-top: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition-duration: 0.2s;
  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const DiaryInput = styled.textarea`
  font-family: inherit;
  resize: none;
  :focus {
    outline: none;
  }
`;

const DiarySpan = styled.span`
  white-space: pre-line; // textarea 줄바꿈
  margin-bottom: 5px;
`;

const Days = styled.div`
  display: flex;
  padding: 15px 0px;
`;

const Day = styled.li`
  width: calc(100% / 7);
  list-style: none;
  text-align: center;
  :nth-child(7n + 1) {
    color: #e84118;
  }
  :nth-child(7n) {
    color: #00a8ff;
  }
  font-weight: bold;
`;

const Dates = styled.div`
  display: flex;
  flex-flow: row wrap;
  border-top: 1px solid #616161;
  border-right: 1px solid #616161;
`;

export default Body;
