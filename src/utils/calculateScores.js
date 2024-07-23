const calculateScores = (diceValues) => {
  const countOccurrences = (value) =>
    diceValues.filter((dice) => dice === value).length;

  const scores = {
    Aces: countOccurrences(1) * 1,
    Deuces: countOccurrences(2) * 2,
    Threes: countOccurrences(3) * 3,
    Fours: countOccurrences(4) * 4,
    Fives: countOccurrences(5) * 5,
    Sixes: countOccurrences(6) * 6,
    choice: diceValues.reduce((sum, value) => sum + value, 0),
    fourOfAKind: 0,
    fullHouse: 0,
    smallStraight: 0,
    largeStraight: 0,
    yacht: 0,
  };

  const diceCounts = Array.from({ length: 6 }, (_, i) =>
    countOccurrences(i + 1)
  );

  // Four of a Kind
  if (diceCounts.some((count) => count >= 4)) {
    scores.fourOfAKind = diceValues.reduce((sum, value) => sum + value, 0);
  }

  // Full House
  if (diceCounts.includes(3) && diceCounts.includes(2)) {
    scores.fullHouse = diceValues.reduce((sum, value) => sum + value, 0);
  }

  // Small Straight (1-2-3-4, 2-3-4-5, 3-4-5-6)
  const uniqueValues = [...new Set(diceValues)].sort();
  const straights = [
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
  ];
  if (
    straights.some((straight) =>
      straight.every((num) => uniqueValues.includes(num))
    )
  ) {
    scores.smallStraight = 15;
  }

  // Large Straight (1-2-3-4-5, 2-3-4-5-6)
  const largeStraights = [
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6],
  ];
  if (
    largeStraights.some((straight) =>
      straight.every((num) => uniqueValues.includes(num))
    )
  ) {
    scores.largeStraight = 30;
  }

  // Yacht
  if (diceCounts.includes(5)) {
    scores.yacht = 50;
  }

  return scores;
};

export default calculateScores;
