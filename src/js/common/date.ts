import { isAfter, isSameDay } from "date-fns";

export const isOnOrAfterToday = (d: Date) => {
  const now = new Date();
  const disputeIsLive = isAfter(d, now) || isSameDay(d, now);
  return disputeIsLive;
};
