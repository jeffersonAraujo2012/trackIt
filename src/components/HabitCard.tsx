import styled from "styled-components";
import axios from "axios";
import { useContext } from "react";

import BtnDay from "./InsertHabitForm/BtnDay";

import deleteIcon from "../assets/images/delete.svg";
import { HabitContext, IHabit } from "../pages/Habits";
import { UserContext } from "../App";

interface IHabitCardProps {
  hbt: {
    id: number;
    name: string;
    days: number[];
  };
}

export default function HabitCard({ hbt }: IHabitCardProps) {
  const letterWeekdays: string = "DSTQQSS"; //dom, seg, ter, qua ...
  const { user } = useContext(UserContext);
  const { habits, setHabits } = useContext(HabitContext);
  const {id, name, days} = hbt;

  function deleteHabit(): void {
    const HEADER_AUTH = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const res = window.confirm(
      "Você realmente deseja deletar permanentemente este hábito?"
    );

    if (res) {
      const promiseDelHabit = axios.delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
        HEADER_AUTH
      );
      promiseDelHabit.then(() => {
        const newHabits = habits.filter((habit) => habit.id !== id);
        setHabits(newHabits);
      });
      promiseDelHabit.catch((error) => alert(error.response.data.message));
    }
  }

  return (
    <StyledHabitCard data-test="habit-container">
      <p data-test="habit-name">{name}</p>
      <div>
        {letterWeekdays.split("").map((letter, index) => (
          <BtnDay text={letter} selected={days.includes(index)} key={index} />
        ))}
      </div>
      <img
        src={deleteIcon}
        alt={`Deletar hábito: ${name}`}
        onClick={deleteHabit}
        data-test="habit-delete-btn"
      />
    </StyledHabitCard>
  );
}

const StyledHabitCard = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  min-height: 91px;
  margin-bottom: 10px;
  padding: 15px;

  background: #ffffff;
  border-radius: 5px;

  p {
    margin-bottom: 8px;

    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
  }

  img {
    position: absolute;
    top: 10px;
    right: 10px;

    width: 13px;
    height: 15px;

    cursor: pointer;
  }
`;
