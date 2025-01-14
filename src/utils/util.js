import dayjs from "dayjs";

// 오늘 날짜 포맷팅 함수
export const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// N일 후 날짜 포맷팅 함수
export const getFutureDateString = (days) => {
  const futureDate = dayjs().add(days, "day");
  return futureDate.format("YYYY-MM-DD");
};

// 날짜 차이 계산 함수
export const calculateTotalDays = (start, end, includeFirst) => {
  const days = dayjs(end).diff(dayjs(start), "day");
  return includeFirst ? days + 1 : days;
};
