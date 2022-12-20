import styled from "styled-components";

import { HistoryContext, IHabitHistory } from "../pages/Today";
import doneIcon from "../assets/images/done.svg";
import axios from "axios";
import { useContext, useState } from "react";
import { ProgressContext, UserContext } from "../App";
import { TailSpin } from "react-loader-spinner";

interface IHabitCardHistoryProps {
  habit: IHabitHistory;
}

interface ISHabitCardHistoryProps {
  done: boolean;
  currentSequence: number;
  highestSequence: number;
}

export default function HabitCardHistory({ habit }: IHabitCardHistoryProps) {
  const { name, done, currentSequence, highestSequence } = habit;
  const { user } = useContext(UserContext);
  const { auxHabit, setAuxHabit } = useContext(HistoryContext);
  const { numDoneHabitsDay, setNumDoneHabitsDay } = useContext(ProgressContext);
  const [loading, setLoading] = useState<boolean>(false);

  function doneHabitToggle() {
    setLoading(true);

    const config = {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    };

    if (!habit.done) {
      const promiseCheck = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`,
        {},
        config
      );
      promiseCheck.then((res) => {
        setNumDoneHabitsDay(numDoneHabitsDay + 1);
        setAuxHabit(!auxHabit);
      });
      promiseCheck.catch((error) => alert(error.response.data.message));
      promiseCheck.finally(() => setTimeout(()=>setLoading(false),500));
    } else {
      const promiseUncheck = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`,
        {},
        config
      );
      promiseUncheck.then((res) => {
        setNumDoneHabitsDay(numDoneHabitsDay - 1);
        setAuxHabit(!auxHabit);
      });
      promiseUncheck.catch((error) => alert(error.response.data.message));
      promiseUncheck.finally(() => setTimeout(()=>setLoading(false),500));
    }
  }

  return (
    <StyledHabitCardHistory
      done={done}
      currentSequence={currentSequence}
      highestSequence={highestSequence}
    >
      <div>
        <p>{name}</p>
        <p>
          Sequência atual: <span>{currentSequence} dias</span>
        </p>
        <p>
          Seu recorde: <span>{highestSequence} dias</span>
        </p>
      </div>
      <div onClick={doneHabitToggle}>
        {loading ? (
          <TailSpin
            height="40"
            width="40"
            color="white"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : (
          <img src={doneIcon} alt={done ? "Feito" : "A fazer"} />
        )}
      </div>
    </StyledHabitCardHistory>
  );
}

const StyledHabitCardHistory = styled.div<ISHabitCardHistoryProps>`
  display: flex;

  width: 100%;
  min-height: 94px;
  padding: 12px;
  margin-bottom: 10px;

  background: #ffffff;
  border-radius: 5px;

  & > div > p:first-child {
    font-size: 19.976px;
    line-height: 25px;
    margin-bottom: 10px;
  }

  & > div > p {
    font-size: 12.976px;
    line-height: 16px;
    color: #666666;
  }

  span {
    color: ${(props) =>
      props.currentSequence === props.highestSequence ? "#8FC549" : "#666666"};
  }

  div:nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 70px;
    margin-left: auto;

    border-radius: 5px;
    cursor: pointer;

    ${(props) =>
      props.done
        ? `background: #8FC549;`
        : `
          background: #ebebeb;
          border: 1px solid #e7e7e7;
          `}
  }
`;
