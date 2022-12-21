import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ProgressContext, UserContext } from "../App";
import HabitCardHistory from "../components/HabitCardHistory";

import { HEADER_HIGHT, MENU_FOOTER_HIGHT } from "../params";

interface ISToday {
  numDoneHabits: number;
}

export interface IHabitHistory {
  id: number;
  name: string;
  done: boolean;
  currentSequence: number;
  highestSequence: number;
}

export interface IHistoryContext {
  auxHabit: boolean;
  setAuxHabit: (auxHabit: boolean) => void;
}

export const HistoryContext = createContext<IHistoryContext>(
  {} as IHistoryContext
);

export default function Today() {
  const [habits, setHabits] = useState<IHabitHistory[]>([]);
  const [auxHabit, setAuxHabit] = useState<boolean>(false); // Just for force useEffect
  const { user } = useContext(UserContext);
  const { setNumDoneHabitsDay, setNumHabitsDay } = useContext(ProgressContext);

  const today = new Date();
  const todayName = today.toLocaleString("default", { weekday: "long" });
  todayName[0].toUpperCase();
  const todayDate = today.getDate() + "/" + (today.getMonth() + 1);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const promiseHabits = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );
    promiseHabits.then((res) => {
      const habits = res.data;
      setNumHabitsDay(habits.length);

      const doneHabits = habits.filter((habit: any) => habit.done);
      setNumDoneHabitsDay(doneHabits.length);
      setHabits(habits);
    });
    promiseHabits.catch((error) => alert(error.response.data.message));
  }, [auxHabit]);

  const numDoneHabits = habits.filter((habit) => habit.done).length;
  const numHabits = habits.length;
  const progressValue = ((numDoneHabits / numHabits) * 100).toFixed(0);

  return (
    <HistoryContext.Provider value={{ auxHabit, setAuxHabit }}>
      <StyledToday numDoneHabits={numDoneHabits}>
        <header>
          <h1>
            {todayName[0].toUpperCase() + todayName.substring(1)},&nbsp;
            {todayDate}
          </h1>
          <p>
            {numDoneHabits > 0
              ? `${progressValue}% dos hábitos concluídos`
              : "Nenhum hábito concluído ainda"}
          </p>
        </header>

        {habits.map((habit) => (
          <HabitCardHistory habit={habit} key={habit.id} />
        ))}
      </StyledToday>
    </HistoryContext.Provider>
  );
}

const StyledToday = styled.div<ISToday>`
  width: 100%;
  min-height: calc(100vh - ${HEADER_HIGHT} - ${MENU_FOOTER_HIGHT});
  margin-top: ${HEADER_HIGHT};
  margin-bottom: ${MENU_FOOTER_HIGHT};
  padding: 0 16px;
  padding-top: 28px;

  background-color: #e5e5e5;

  header {
    margin-bottom: 28px;
  }

  h1 {
    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
  }

  p {
    font-size: 17.976px;
    line-height: 22px;
    color: ${(props) => (props.numDoneHabits > 0 ? "#8FC549" : "#bababa")};
  }
`;
