-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HabitRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "completedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "habitId" TEXT NOT NULL,
    CONSTRAINT "HabitRecord_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HabitRecord" ("completedAt", "habitId", "id") SELECT "completedAt", "habitId", "id" FROM "HabitRecord";
DROP TABLE "HabitRecord";
ALTER TABLE "new_HabitRecord" RENAME TO "HabitRecord";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
