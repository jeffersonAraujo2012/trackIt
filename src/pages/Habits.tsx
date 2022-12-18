import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../App";
import HabitCard from "../components/HabitCard";
import InsertHabitForm from "../components/InsertHabitForm";
import { HEADER_HIGHT, MENU_FOOTER_HIGHT } from "../params";

export interface IHabit {
  id: number;
  name: string;
  days: number[];
}

export interface IHabitContext {
  habits: IHabit[];
  setHabits: (habits: IHabit[]) => void;
}

export const HabitContext = createContext<IHabitContext>({} as IHabitContext);

export default function Habits() {
  const [showHabitForm, setShowHabitForm] = useState<boolean>(false);
  const [habits, setHabits] = useState<IHabit[]>([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const promiseHabits = axios({
      url: "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      method: "get",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    promiseHabits.then((res) => setHabits(res.data));
    promiseHabits.catch((error) => console.log(error.response.data.message));
  }, []);

  return (
    <HabitContext.Provider value={{ habits, setHabits }}>
      <StyledHabits>
        <header>
          <span>Meus hábitos</span>
          <button onClick={() => setShowHabitForm(true)}>+</button>
        </header>

        {showHabitForm && <InsertHabitForm setShow={setShowHabitForm} />}

        <div className="habits">
          {habits.map((habit) => {
            return <HabitCard hbt={habit} key={habit.id} />;
          })}
        </div>

        {habits.length === 0 && (
          <p>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </p>
        )}
      </StyledHabits>
    </HabitContext.Provider>
  );
}

const StyledHabits = styled.div`
  width: 100%;
  min-height: calc(100vh - ${HEADER_HIGHT} - ${MENU_FOOTER_HIGHT});
  margin-top: ${HEADER_HIGHT};
  margin-bottom: ${MENU_FOOTER_HIGHT};
  padding: 0 16px;

  background-color: #e5e5e5;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-top: 22px;

    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
  }

  header > button {
    width: 40px;
    height: 35px;

    background: #52b6ff;
    border-radius: 4.63636px;
    border: none;
    padding: 0;

    font-size: 26.976px;
    line-height: 34px;
    text-align: center;
    color: #ffffff;

    cursor: pointer;
  }

  & > p {
    margin-top: 28px;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
  }

  & > .habits {
    margin-top: 20px;
  }
`;
