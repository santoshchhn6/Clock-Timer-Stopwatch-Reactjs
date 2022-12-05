import React from "react";
class NavButton extends React.Component {
  state = {
    active: "clock",
  };
  onClickClock = () => {
    this.setState({ active: "clock" });
    this.props.showClock();
  };
  onClickTimer = () => {
    this.setState({ active: "timer" });
    this.props.showTimer();
  };
  onClickStopWatch = () => {
    this.setState({ active: "stopwatch" });
    this.props.showStopWatch();
  };
  render() {
    return (
      <div>
        <div className="btn_container">
          <button
            onClick={this.onClickClock}
            className={this.state.active === "clock" ? "active" : ""}
          >
            Clock
          </button>
          <button
            onClick={this.onClickTimer}
            className={this.state.active === "timer" ? "active" : ""}
          >
            Timer
          </button>
          <button
            onClick={this.onClickStopWatch}
            className={this.state.active === "stopwatch" ? "active" : ""}
          >
            StopWatch
          </button>
        </div>
      </div>
    );
  }
}

export default NavButton;
