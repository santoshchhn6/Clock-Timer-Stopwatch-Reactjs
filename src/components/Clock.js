import React from "react";
import "../css/Clock.css";
import millisecondsToHuman, { date } from "../millisecondToHuman";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const d = new Date();
const localTimezone = d.getTimezoneOffset() * 60000;

class Clock extends React.Component {
  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }
  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  render() {
    if (this.props.show) {
      return (
        <div className="container">
          <div className="clock_container">
            <h1 className="time">
              {millisecondsToHuman(Date.now() - localTimezone)}
            </h1>
            <h2>{weekDays[d.getDay()]}</h2>
            <h3>{date(d)}</h3>
          </div>
        </div>
      );
    }
  }
}
export default Clock;
