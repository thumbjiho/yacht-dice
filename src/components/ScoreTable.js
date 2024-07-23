// src/components/ScoreTable.js
import React from "react";

const ScoreTable = ({
  currentPlayer,
  scores,
  fixedScores,
  handleScoreClick,
  subtotal,
  bonus,
  total,
}) => {
  const formatCategory = (category) => {
    switch (category) {
      case "fourOfAKind":
        return "Four of a Kind";
      case "fullHouse":
        return "Full House";
      case "smallStraight":
        return "Small Straight";
      case "largeStraight":
        return "Large Straight";
      // 필요한 다른 케이스 추가
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  return (
    <>
      <div className="table-section">
        <table className="score-table">
          <thead>
            <tr>
              <th>Category</th>
              <th className={currentPlayer === "player1" ? "highlight" : ""}>
                Player 1
              </th>
              <th className={currentPlayer === "player2" ? "highlight" : ""}>
                Player 2
              </th>
            </tr>
          </thead>
          <tbody>
            {["ones", "twos", "threes", "fours", "fives", "sixes"].map(
              (category) => (
                <tr key={category}>
                  <td>{formatCategory(category)}</td>
                  <td
                    className={
                      (fixedScores.player1[category] !== undefined
                        ? "fixed"
                        : "") +
                      (currentPlayer === "player1" ? " highlight" : "")
                    }
                    onClick={() =>
                      currentPlayer === "player1" && handleScoreClick(category)
                    }
                  >
                    {fixedScores.player1[category] !== undefined
                      ? fixedScores.player1[category]
                      : currentPlayer === "player1"
                      ? scores[category]
                      : ""}
                  </td>
                  <td
                    className={
                      (fixedScores.player2[category] !== undefined
                        ? "fixed"
                        : "") +
                      (currentPlayer === "player2" ? " highlight" : "")
                    }
                    onClick={() =>
                      currentPlayer === "player2" && handleScoreClick(category)
                    }
                  >
                    {fixedScores.player2[category] !== undefined
                      ? fixedScores.player2[category]
                      : currentPlayer === "player2"
                      ? scores[category]
                      : ""}
                  </td>
                </tr>
              )
            )}
            <tr className="subtotal-row">
              <td>Subtotal</td>
              <td>{subtotal("player1")}</td>
              <td>{subtotal("player2")}</td>
            </tr>
            <tr className="bonus-row">
              <td>Bonus</td>
              <td>{bonus("player1")}</td>
              <td>{bonus("player2")}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="table-section">
        <table className="score-table">
          <tbody>
            {[
              "choice",
              "fourOfAKind",
              "fullHouse",
              "smallStraight",
              "largeStraight",
              "yacht",
            ].map((category) => (
              <tr key={category}>
                <td>{formatCategory(category)}</td>
                <td
                  className={
                    (fixedScores.player1[category] !== undefined
                      ? "fixed"
                      : "") + (currentPlayer === "player1" ? " highlight" : "")
                  }
                  onClick={() =>
                    currentPlayer === "player1" && handleScoreClick(category)
                  }
                >
                  {fixedScores.player1[category] !== undefined
                    ? fixedScores.player1[category]
                    : currentPlayer === "player1"
                    ? scores[category]
                    : ""}
                </td>
                <td
                  className={
                    (fixedScores.player2[category] !== undefined
                      ? "fixed"
                      : "") + (currentPlayer === "player2" ? " highlight" : "")
                  }
                  onClick={() =>
                    currentPlayer === "player2" && handleScoreClick(category)
                  }
                >
                  {fixedScores.player2[category] !== undefined
                    ? fixedScores.player2[category]
                    : currentPlayer === "player2"
                    ? scores[category]
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-section">
        <table className="score-table">
          <tbody>
            <tr className="total-row">
              <td>Total</td>
              <td>{total("player1")}</td>
              <td>{total("player2")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ScoreTable;
