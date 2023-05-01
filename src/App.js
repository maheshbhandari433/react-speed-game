import React, { Component } from "react";
import Circle from "./components/CircleClick";
import Modal from "./components/Modal";
import "./App.css";

import click from "./sounds/click.mp3"
import start from "./sounds/start.mp3"
import end from "./sounds/end.mp3"

class App extends Component {

  clickSound = new Audio(click)
  startSound = new Audio(start)
  endSound = new Audio(end)

  state = {
    title: "Speed Game 2.0",
    score: 0,
    current: 0,
    rounds: 0,
    circles: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    pace: 1200,
    gameStart: false,
    showGameOver: false,
    timer: null,
  };

  clickHandler = (circle) => {
  
    if (circle.id === this.state.current) {
      this.setState((prevState) => ({
        score: prevState.score + 10,
        rounds: prevState.rounds - 1,
      }));
      this.clickSound.play()

    } else {
      this.endHandler();
    }
  };

  randomIntegerNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  pickNew = () => {
    this.setState({
      pace: this.state.pace-100
    })
    let nextActive;
    do {
      nextActive = this.randomIntegerNum(1, this.state.circles.length);
      if (this.state.rounds === 5) {
        this.endHandler();
      }
      /* console.log(nextActive)
      console.log(this.state.pace) */
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
      rounds: this.state.rounds + 1,
    }); 
  };

  startHandler = () => {
    
    this.startSound.play()
    this.setState({
      gameStart: true,
      timer: setInterval(this.pickNew, this.state.pace)
    });
  }

  endHandler = () => {
    this.endSound.play()
    this.setState({
      gameStart: false,
      showGameOver: true,
    });
    clearInterval(this.state.timer);
  };

  modalHandler = (e) => {
    this.setState({
      showGameOver: !this.state.showGameOver,
      score: 0,
      current: 0,
      rounds: 0,
    });
  };

  messageHandler = (score) => {
    let result = "";
    if (score === 0) {
      result = "Please try again 🤨";
    } else if (score <= 150) {
      result = "Nice try.";
    } else if (score <= 400) {
      result = "Nicely played.";
    } else {
      result = "Well done. Great score.";
    }
    return result;
  };

  render() {
    const isActive = this.state.current;

    const circlesList = this.state.circles.map((circle, i) => {
      return (
        <Circle
          key={circle.id}
          click={() => this.clickHandler(circle)}
          class={isActive === circle.id ? "circle active" : "circle"}
          clicksActive={this.state.gameStart ? "auto" : "none"}
        />
      );
    });

    return (
      <div className="app">
        <h1>{this.state.title}</h1>
        <p>Score: {this.state.score}</p>
        <div className="game-wrapper">{circlesList}</div>
        <button className={!this.state.gameStart ? "" : "hidden"}
                onClick={this.startHandler}>
          Start
        </button>
        <button className={!this.state.gameStart ? "hidden" : ""}
                onClick={this.endHandler}>
          End
        </button>
        {this.state.showGameOver && (
          <Modal score={this.state.score}
          click={this.modalHandler}
          message={this.messageHandler(this.state.score)} />
        )}
      </div>
    );
  }
}

export default App;