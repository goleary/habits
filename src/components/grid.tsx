import { HabitRecord } from "@prisma/client";
import React from "react";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);

const GRID_GAP = 2;
type Props = {
  color?: string;
  records: HabitRecord[];
};

const Grid: React.FC<Props> = ({ color = "#40c463", records }) => {
  const weeks: number[][] = Array.from({ length: dayjs().week() - 1 }, () =>
    new Array(7).fill(0)
  );
  let thisWeek = 0;
  let thisMonth = 0;
  let thisYear = 0;
  weeks.push(new Array(dayjs().day()).fill(0));
  records.forEach((r) => {
    const d = dayjs(r.completedAt);
    // stfu
    weeks[d.week() - 1][d.day() - 1] = weeks[d.week() - 1][d.day() - 1] + 1;
    if (d.week() === dayjs().week()) {
      thisWeek++;
    }
    if (d.month() === dayjs().month()) {
      thisMonth++;
    }
    if (d.year() === dayjs().year()) {
      thisYear++;
    }
  });

  return (
    <div>
      <p>{thisWeek} times this week</p>
      <p>{thisMonth} times this month</p>
      <p>{thisYear} times this year</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: GRID_GAP,
          padding: 16,
        }}
      >
        {weeks.map((w, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: GRID_GAP,
            }}
          >
            {w.map((n, i) => {
              let backgroundColor;
              if (n === 0) {
                backgroundColor = "#ebedf0";
              } else {
                backgroundColor = color;
              }
              return (
                <div
                  key={i}
                  style={{
                    backgroundColor,
                    height: 10,
                    width: 10,
                    borderRadius: 2,
                  }}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
