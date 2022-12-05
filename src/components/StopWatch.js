import React from "react";
import "../css/StopWatch.css";
import millisecondsToHuman, {
  elapsedTime,
  stopWatchTimer,
} from "../millisecondToHuman";
const INITIAL_STATE = {
  runningSince: 0,
  elapsed: 0,

  loopCount: 1,
  loops: [],
};
class Stopwatch extends React.Component {
  state = INITIAL_STATE;

  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 60);
  }
  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  handleStartTimer = () => {
    const now = Date.now();

    this.setState({
      runningSince: now,
    });
  };
  handleResetTimer = () => {
    this.setState({ ...INITIAL_STATE });
  };
  handlePauseTimer = () => {
    const now = Date.now();
    const lastElaspesed = now - this.state.runningSince;
    this.setState({
      runningSince: 0,
      elapsed: this.state.elapsed + lastElaspesed,
    });
  };
  handleAddLoop = (loop) => {
    this.handleLoopCount();
    this.setState((state) => {
      const loops = state.loops.concat(loop);
      return {
        loops,
      };
    });
  };
  handleLoopCount = () => {
    this.setState({
      loopCount: this.state.loopCount + 1,
    });
  };
  render() {
    const stopWatchTime = stopWatchTimer(
      elapsedTime(this.state.elapsed, this.state.runningSince)
    );
    const loopTimeStr = "#" + this.state.loopCount + " " + stopWatchTime;
    if (this.props.show) {
      return (
        <div className="container">
          <div>
            <div>
              <h1 className="time">{stopWatchTime}</h1>
            </div>
            <div>
              <StopWatch_button
                onStart={this.handleStartTimer}
                onReset={this.handleResetTimer}
                onPause={this.handlePauseTimer}
                runningSince={this.state.runningSince}
                loopTime={loopTimeStr}
                onClickLoop={this.handleAddLoop}
              />
            </div>
            <div>
              <StopWatch_loop_list loops={this.state.loops} />
            </div>
          </div>
        </div>
      );
    }
  }
}

class StopWatch_button extends React.Component {
  onClickPause = () => {
    if (this.props.runningSince > 0) {
      this.props.onPause();
    } else {
      this.props.onStart();
    }
  };
  onClickLoop = () => {
    if (this.props.runningSince > 0) {
      this.props.onClickLoop(this.props.loopTime);
    } else {
      this.props.onReset();
    }
  };
  render() {
    const btnTogglePauseStart = this.props.runningSince > 0 ? "Pause" : "Start";
    const btnToggleResetLoop = this.props.runningSince > 0 ? "Loop" : "Reset";
    return (
      <div className="btn_container">
        <button onClick={this.onClickPause}>{btnTogglePauseStart}</button>
        <button onClick={this.onClickLoop}>{btnToggleResetLoop}</button>
      </div>
    );
  }
}

class StopWatch_loop_list extends React.Component {
  render() {
    return (
      <div className="stopwatch_loop_container">
        <ul>
          {this.props.loops.map((loop) => (
            <li key={loop}>{loop}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Stopwatch;
