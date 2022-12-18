import React, { useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { PRIMARY_COLOR } from "../../params";
import Input from "../forms/Input";
import BtnDay from "./BtnDay";
import BtnBlueMin from "../forms/BtnBlueMin";

import { UserContext } from "../../App";
import { HabitContext, IHabit } from "../../pages/Habits";

interface InsertHabitFormProp {
  setShow: (value: boolean) => void;
}

export default function InsertHabitForm({ setShow }: InsertHabitFormProp) {
  const [habitName, setHabitName] = useState<string>("");
  const [selectedsDays, setSelectedsDays] = useState<boolean[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useContext(UserContext);
  const { habits, setHabits } = useContext(HabitContext);

  const weekdays = [0, 1, 2, 3, 4, 5, 6];
  const letterWeekdays = "DSTQQSS"; //dom, seg, ter, qua ...

  function addHabit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const days = selectedsDays.map((value, index) => value && weekdays[index]);
    console.log(days);

    const newHabit = {
      name: habitName,
      days: days.filter((value) => !isNaN(Number(value))),
    };

    const config = {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    };

    const promiseAddHabit = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      newHabit,
      config
    );
    promiseAddHabit.then((res) => {
      setHabitName("");
      setSelectedsDays([]);
      setShow(false);
      setHabits([...habits, res.data]);
      console.log(res.data);
    });
    promiseAddHabit.catch((error) => alert(error.response.data.message));
    promiseAddHabit.finally(() => setLoading(false));
  }

  return (
    <StyledInsertHabitForm
      onSubmit={addHabit}
      data-test="habit-create-container"
    >
      <Input
        type="text"
        placeholder="nome do hábito"
        value={habitName}
        onChange={(e) => setHabitName(e.currentTarget.value)}
        disabled={loading}
        dataTest="habit-name-input"
      />

      <div>
        {weekdays.map((day) => (
          <BtnDay
            text={letterWeekdays[day]}
            selected={selectedsDays[day]}
            onClick={() => {
              const newSelectedDays = [...selectedsDays];
              newSelectedDays[day] = !newSelectedDays[day];
              setSelectedsDays(newSelectedDays);
            }}
            disabled={loading}
            key={day}
          />
        ))}
      </div>

      <div className="btnArea">
        <button
          type="button"
          onClick={() => setShow(false)}
          disabled={loading}
          data-test="habit-create-cancel-btn"
        >
          Cancelar
        </button>
        <BtnBlueMin text="Salvar" disabled={loading} dataTest="habit-create-save-btn" />
      </div>
    </StyledInsertHabitForm>
  );
}

const StyledInsertHabitForm = styled.form`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 180px;
  margin-top: 20px;
  padding: 18px;

  background: #ffffff;
  border-radius: 5px;

  .btnArea {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: auto;

    button {
      width: 84px;
      height: 35px;
      margin-left: 10px;

      border-radius: 4.63636px;
      border: none;

      font-size: 15.976px;
      line-height: 20px;
      text-align: center;
      cursor: pointer;
    }

    button:first-child {
      background: inherit;
      color: ${PRIMARY_COLOR};
    }

    button:last-child {
      background: ${PRIMARY_COLOR};
      color: white;
    }
  }
`;
