import "./css/App.css";
import React from "react";
import NavButton from "./components/NavButton";
import Clock from "./components/Clock";
import Timer from "./components/Timer";
import Stopwatch from "./components/StopWatch";

class App extends React.Component {
  state = {
    showClock: true,
    showTimer: false,
    showStopWatch: false,
  };
  handleShowClock = () => {
    this.setState({
      showClock: true,
      showTimer: false,
      showStopWatch: false,
    });
  };
  handleShowTimer = () => {
    this.setState({
      showClock: false,
      showTimer: true,
      showStopWatch: false,
    });
  };
  handleShowStopWatch = () => {
    this.setState({
      showClock: false,
      showTimer: false,
      showStopWatch: true,
    });
  };
  render() {
    return (
      <div>
        <Clock show={this.state.showClock} />
        <Timer show={this.state.showTimer} />
        <Stopwatch show={this.state.showStopWatch} />
        <NavButton
          showClock={this.handleShowClock}
          showTimer={this.handleShowTimer}
          showStopWatch={this.handleShowStopWatch}
        />
      </div>
    );
  }
}

export default App;
