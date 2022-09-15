import { Habit, HabitRecord } from "@prisma/client";
import React from "react";
import Grid from "../components/grid";
import { prisma } from "../server/db/client";

type Props = {
  habits: (Habit & {
    records: HabitRecord[];
  })[];
};
const HabitsPage: React.FC<Props> = ({ habits }) => {
  return (
    <>
      {habits.map((h) => (
        <>
          <h2 key={h.id}>{h.name}</h2>
          <Grid
            records={h.records}
            color={h.name === "Alcohol" ? "#de2d26" : undefined}
          />
        </>
      ))}
    </>
  );
};

export default HabitsPage;

export const getServerSideProps = async () => {
  const habits = await prisma.habit.findMany({ include: { records: true } });
  return { props: { habits } };
};
