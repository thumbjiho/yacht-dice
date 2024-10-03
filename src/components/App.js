// src/components/App.js
import React, { useState } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import calculateScores from "../utils/calculateScores";
import "../App.css";

const App = () => {
  const [currentPlayer, setCurrentPlayer] = useState("player1");
  const [rollCount, setRollCount] = useState(0);
  const [round, setRound] = useState(1);
  const [diceValues, setDiceValues] = useState([0, 0, 0, 0, 0]);
  const [lockedDice, setLockedDice] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [fixedScores, setFixedScores] = useState({ player1: {}, player2: {} });
  const [isRolling, setIsRolling] = useState(false);
  const [showManualControls, setShowManualControls] = useState(false);

  const switchTurn = () => {
    setCurrentPlayer((prevPlayer) =>
      prevPlayer === "player1" ? "player2" : "player1"
    );
    setRollCount(0);

    // 라운드 종료 체크
    if (currentPlayer === "player2") {
      setRound((prevRound) => prevRound + 1);
    }

    // 주사위 잠금 해제 및 값을 0으로 초기화
    setLockedDice([false, false, false, false, false]);
    setDiceValues([0, 0, 0, 0, 0]);
  };

  const handleDiceClick = (index) => {
    if (!lockedDice[index]) {
      setDiceValues((prevValues) =>
        prevValues.map((value, i) => (i === index ? (value % 6) + 1 : value))
      );
    }
  };

  const handleLockClick = (index) => {
    setLockedDice((prevLocked) =>
      prevLocked.map((locked, i) => (i === index ? !locked : locked))
    );
  };

  const handleResetClick = () => {
    setDiceValues([0, 0, 0, 0, 0]);
    setLockedDice([false, false, false, false, false]);
    setFixedScores({
      player1: {},
      player2: {},
    });
    setCurrentPlayer("player1");
    setRound(1);
    setRollCount(0);
  };

  const handleRandomClick = () => {
    if (rollCount >= 3 || isRolling || lockedDice.every((lock) => lock)) return;

    const rollDuration = 500;
    const intervalDuration = 10;

    setIsRolling(true);
    const rollDiceInterval = setInterval(() => {
      setDiceValues((prevValues) =>
        prevValues.map((value, i) =>
          lockedDice[i] ? value : Math.floor(Math.random() * 6) + 1
        )
      );
    }, intervalDuration);

    setTimeout(() => {
      clearInterval(rollDiceInterval);
      setDiceValues((prevValues) =>
        prevValues.map((value, i) =>
          lockedDice[i] ? value : Math.floor(Math.random() * 6) + 1
        )
      );
      setRollCount((prevCount) => prevCount + 1);
      setIsRolling(false);
    }, rollDuration);
  };

  const handleScoreClick = (category) => {
    if (isRolling || fixedScores[currentPlayer][category]) return;

    const newScores = calculateScores(diceValues);

    setFixedScores((prevScores) => ({
      ...prevScores,
      [currentPlayer]: {
        ...prevScores[currentPlayer],
        [category]: newScores[category],
      },
    }));
    switchTurn();
  };

  const scores = isRolling
    ? fixedScores[currentPlayer]
    : calculateScores(diceValues);

  const subtotal = (player) =>
    Object.keys(fixedScores[player])
      .filter((key) =>
        ["Aces", "Deuces", "Threes", "Fours", "Fives", "Sixes"].includes(key)
      )
      .reduce((acc, key) => acc + fixedScores[player][key], 0);

  const bonus = (player) => (subtotal(player) >= 63 ? 35 : 0);

  const total = (player) =>
    Object.values(fixedScores[player]).reduce((acc, score) => acc + score, 0) +
    bonus(player);

  const getWinner = () => {
    const player1Total = total("player1");
    const player2Total = total("player2");

    if (player1Total > player2Total) {
      return "Player 1 wins!";
    } else if (player2Total > player1Total) {
      return "Player 2 wins!";
    } else {
      return "It's a tie!";
    }
  };

  return (
    <div className="App">

      {round > 12 ? (
        <>
          <h2>{getWinner()}</h2>

          <ScoreTable
            currentPlayer={currentPlayer}
            scores={scores}
            fixedScores={fixedScores}
            handleScoreClick={handleScoreClick}
            subtotal={subtotal}
            bonus={bonus}
            total={total}
          />
          <button className="restart-button" onClick={handleResetClick}>
            Restart
          </button>
        </>
      ) : (
        <>
          <h3>Jojo's Yacht Dice, Round: {round}</h3>
          <ScoreTable
            currentPlayer={currentPlayer}
            scores={scores}
            fixedScores={fixedScores}
            handleScoreClick={handleScoreClick}
            subtotal={subtotal}
            bonus={bonus}
            total={total}
          />
          <div className="dice-container">
            {diceValues.map((value, index) => (
              <Dice
                key={index}
                value={value}
                onClick={() => handleDiceClick(index)}
                locked={lockedDice[index]}
                onLockClick={() => handleLockClick(index)}
                showManualControls={showManualControls}
              />
            ))}
          </div>
          <div className="button-container">
            <div className="roll-container">
              <h3>Rolls Left: {3 - rollCount}</h3>
              <button
                onClick={handleRandomClick}
                disabled={
                  rollCount >= 3 ||
                  isRolling ||
                  lockedDice.every((lock) => lock)
                }
              >
                Roll The Dice
              </button>
            </div>
            {/* <button className="restart-button" onClick={handleResetClick}>
              Restart
            </button>
            <button
              className="manual-controls-button"
              onClick={() => setShowManualControls(!showManualControls)}
            >
              Manual Controls
            </button> */}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
