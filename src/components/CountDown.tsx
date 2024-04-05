"use client";

import Countdown from "react-countdown";

const endingDate = new Date("2024-04-01");

const CountDown = () => {
  return (
    <Countdown
      className="font-bold text-5xl text-yellow-300"
      date={endingDate}
    />
  );
};

export default CountDown;
