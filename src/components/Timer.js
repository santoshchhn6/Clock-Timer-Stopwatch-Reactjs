import React from "react";
import "../css/Timer.css";
import { elapsedTime, pad, remainingTime } from "../millisecondToHuman";

const createOptions = (options) => {
  let opt = [];
  for (let i = 0; i < options; i++) {
    opt.push(<option value={i}>{pad(i.toString(), 2)}</option>);
  }
  return opt;
};

class Timer extends React.Component {
  state = {
    timerShow: false,
    hours: 0,
    minutes: 0,
    seconds: 0,
    waitTime: 0,
    runningSince: 0,
    elapsed: 0,
  };

  handleStartTimer = () => {
    if (
      this.state.hours !== 0 ||
      this.state.minutes !== 0 ||
      this.state.seconds !== 0
    ) {
      const waitTime =
        3600000 * this.state.hours +
        60000 * this.state.minutes +
        1000 * this.state.seconds;

      const now = Date.now();

      this.setState({
        timerShow: true,
        waitTime: waitTime,
        runningSince: now,
      });
    }
  };
  handleResetTimer = () => {
    this.setState({
      timerShow: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
      waitTime: 0,
      runningSince: 0,
      elapsed: 0,
    });
  };
  handlePauseTimer = () => {
    const now = Date.now();
    const lastElaspesed = now - this.state.runningSince;
    this.setState({
      runningSince: 0,
      elapsed: this.state.elapsed + lastElaspesed,
    });
  };
  handleSetHours = (hr) => {
    this.setState({ hours: hr });
  };
  handleSetMinutes = (min) => {
    this.setState({ minutes: min });
  };
  handleSetSeconds = (sec) => {
    this.setState({ seconds: sec });
  };
  render() {
    if (this.props.show) {
      if (this.state.timerShow) {
        return (
          <RunningTimer
            onResetTimer={this.handleResetTimer}
            onPauseTimer={this.handlePauseTimer}
            onStartTimer={this.handleStartTimer}
            waitTime={this.state.waitTime}
            elapsed={this.state.elapsed}
            runningSince={this.state.runningSince}
          />
        );
      } else {
        return (
          <TimerSelect
            onStartTimer={this.handleStartTimer}
            setHours={this.handleSetHours}
            setMinutes={this.handleSetMinutes}
            setSeconds={this.handleSetSeconds}
          />
        );
      }
    }
  }
}

class RunningTimer extends React.Component {
  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }
  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }
  onClickPause = () => {
    if (this.props.runningSince > 0) {
      this.props.onPauseTimer();
    } else {
      this.props.onStartTimer();
    }
  };
  render() {
    const btnTogglePauseStart = this.props.runningSince > 0 ? "Pause" : "Start";
    const timerStr = remainingTime(
      this.props.waitTime,
      elapsedTime(this.props.elapsed, this.props.runningSince)
    );

    return (
      <div className="container">
        <div>
          <div>
            <h1 className="time timer_clock">{timerStr}</h1>
          </div>
          <div className="btn_container">
            <button onClick={this.onClickPause}>{btnTogglePauseStart}</button>
            <button onClick={this.props.onResetTimer}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

class TimerSelect extends React.Component {
  render() {
    return (
      <div className="container">
        <div>
          <div>
            <select
              id="hr"
              onChange={(e) => this.props.setHours(e.target.value)}
            >
              {createOptions(24)}
            </select>
            <select
              id="min"
              onChange={(e) => this.props.setMinutes(e.target.value)}
            >
              {createOptions(60)}
            </select>
            <select
              id="sec"
              onChange={(e) => this.props.setSeconds(e.target.value)}
            >
              {createOptions(60)}
            </select>
          </div>
          <div className="btn_container">
            <button onClick={this.props.onStartTimer}>Start</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Timer;
