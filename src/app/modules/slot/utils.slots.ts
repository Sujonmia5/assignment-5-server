/* eslint-disable prefer-const */
import { TSlot } from "./interface.slot";

const minuteToTime = (time: number): string => {
  const hours = Math.floor(time / 60);
  const minute = time % 60;
  return `${hours.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
};

export const makeSlots = (payload: TSlot) => {
  const { room, startTime, endTime, date } = payload;

  const slotDuration = 60;
  const [startHours, startMinute] = startTime.split(":").map(Number);
  const [endHours, endMinute] = endTime.split(":").map(Number);
  const totalStartTime = startHours * 60 + startMinute;
  const totalEndTime = endHours * 60 + endMinute;

  const totalDuration = totalEndTime - totalStartTime;

  const slotCount = Math.ceil(totalDuration / slotDuration);
  let slots = [];
  for (let i = 0; i < slotCount; i++) {
    const slotStartTime = totalStartTime + i * 60;
    const slotEndTime = Math.min(slotStartTime + slotDuration, totalEndTime);
    const startTime = minuteToTime(slotStartTime);
    const endTime = minuteToTime(slotEndTime);
    slots.push({
      room,
      startTime,
      endTime,
      date,
    });
  }
  return slots;
};
