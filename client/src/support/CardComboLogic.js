//import Cards from "./cards.js";

class CardComboLogic {
  static faceCards = {
    ACE: 14,
    KING: 13,
    QUEEN: 12,
    JACK: 11,
  };

  //returns false or the best pair
  static checkPair(cards) {
    let seen = {};
    let pairs = [];
    for (let card of cards) {
      let cardValue = Number(card.value)
        ? card.value
        : `${CardComboLogic.faceCards[card.value]}`;
      if (seen[`${cardValue}`] === undefined) {
        seen[`${cardValue}`] = 1;
      } else {
        seen[`${cardValue}`] += 1;
        pairs.push(cardValue);
      }
    }

    if (pairs.length === 0) {
      return false;
    } else {
      let bestPair = 0;

      for (let currPair of pairs) {
        if (currPair > bestPair) {
          bestPair = currPair;
        }
      }

      return bestPair;
    }
  }

  //returns false or best triple pair
  static checkTriple(cards) {
    let seen = {};
    let pairs = [];
    for (let card of cards) {
      let cardValue = Number(card.value)
        ? card.value
        : `${CardComboLogic.faceCards[card.value]}`;
      if (seen[`${cardValue}`] === undefined) {
        seen[`${cardValue}`] = 1;
      } else {
        seen[`${cardValue}`] += 1;
        if (seen[`${cardValue}`] >= 3) {
          pairs.push(cardValue);
        }
      }
    }

    if (pairs.length === 0) {
      return false;
    } else {
      let bestPair = 0;

      for (let currPair of pairs) {
        if (currPair > bestPair) {
          bestPair = currPair;
        }
      }

      return bestPair;
    }
  }

  //returns false or string of the quads
  static checkQuads(cards) {
    let seen = {};
    let pairs = [];
    for (let card of cards) {
      let cardValue = Number(card.value)
        ? card.value
        : `${CardComboLogic.faceCards[card.value]}`;
      if (seen[`${cardValue}`] === undefined) {
        seen[`${cardValue}`] = 1;
      } else {
        seen[`${cardValue}`] += 1;
        if (seen[`${cardValue}`] >= 4) {
          pairs.push(cardValue);
        }
      }
    }

    if (pairs.length === 0) {
      return false;
    } else {
      let bestPair = 0;

      for (let currPair of pairs) {
        if (currPair > bestPair) {
          bestPair = currPair;
        }
      }

      return bestPair;
    }
  }

  //returns false or string pair of best two pair
  static checkTwoPair(cards) {
    let seen = {};
    let pairs = [];
    for (let card of cards) {
      let cardValue = Number(card.value)
        ? card.value
        : `${CardComboLogic.faceCards[card.value]}`;
      if (seen[`${cardValue}`] === undefined) {
        seen[`${cardValue}`] = 1;
      } else if (seen[`${cardValue}`] < 2) {
        seen[`${cardValue}`] += 1;
        pairs.push(cardValue);
      }
    }

    if (pairs.length <= 1) {
      return false;
    } else {
      let bestPair = 0;
      let secondBestPair = 0;

      for (let currPair of pairs) {
        if (currPair > bestPair) {
          secondBestPair = bestPair;
          bestPair = currPair;
        } else if (currPair > secondBestPair) {
          secondBestPair = currPair;
        }
      }

      return `${bestPair}, ${secondBestPair}`;
    }
  }

  //returns false or string pair of the best full house
  static checkFullHouse(cards) {
    let seen = {};
    let bestPair = 0;
    let bestTriple = 0;
    let hasPair = false;
    let hasTripe = false;

    for (let card of cards) {
      let cardValue = Number(card.value)
        ? Number(card.value)
        : CardComboLogic.faceCards[card.value];
      if (seen[`${cardValue}`] === undefined) {
        seen[`${cardValue}`] = 1;
      } else {
        seen[`${cardValue}`] += 1;
      }
    }

    for (let key in seen) {
      let value = seen[key];

      if (value === 3 && hasTripe === false) {
        hasTripe = true;
        bestTriple = key > bestTriple ? key : bestTriple;
      } else if (value >= 2 && hasPair === false) {
        hasPair = true;
        bestPair = key > bestPair ? key : bestPair;
      }
    }

    return hasPair && hasTripe ? `${bestPair}, ${bestTriple}` : false;
  }

  // return false or all possible straight
  static checkStraight(cards) {
    let newCards = cards.sort((a, b) => {
      let newA = Number(a.value) ? a.value : CardComboLogic.faceCards[a.value];
      let newB = Number(b.value) ? b.value : CardComboLogic.faceCards[b.value];

      return newA - newB;
    });

    let straight = [];
    let prev = Number(newCards[0].value)
      ? Number(newCards[0].value)
      : CardComboLogic.faceCards[newCards[0].value];

    for (let i = 1; i < newCards.length; i++) {
      let cardValue = Number(newCards[i].value)
        ? Number(newCards[i].value)
        : CardComboLogic.faceCards[newCards[i].value];
      if (cardValue === prev + 1 || (prev === 1 && cardValue === 13)) {
        straight.push(prev);
      } else if (cardValue === prev) {
        continue;
      } else {
        straight = [];
      }
      prev = cardValue;
    }
    straight.push(prev);

    if (straight.length < 5) {
      return false;
    } else {
      return straight;
    }
  }

  // return false or stright suit
  static checkFlush(cards) {
    let seen = {};

    for (let card of cards) {
      let cardSuit = card.suit;
      if (seen[`${cardSuit}`] === undefined) {
        seen[`${cardSuit}`] = 1;
      } else {
        seen[`${cardSuit}`] += 1;
      }
    }

    for (let suit in seen) {
      let count = seen[`${suit}`];
      if (count >= 5) {
        return suit;
      }
    }

    return false;
  }

  // returns false or object
  static checkStraightFlush(cards) {
    let straight = CardComboLogic.checkStraight(cards);
    let flashSuit = CardComboLogic.checkFlush(cards);
    let checkSuit = [];
    if (straight === false || flashSuit === false) {
      return false;
    } else {
      straight = new Set(straight);
    }

    for (let card of cards) {
      card.value = Number(card.value)
        ? Number(card.value)
        : CardComboLogic.faceCards[card.value];
      if (straight.has(Number(card.value)) && card.suit === flashSuit) {
        checkSuit.push({ value: card.value, suit: card.suit });
      }
    }

    if (checkSuit.length < 5) {
      return false;
    } else {
      return checkSuit;
    }
  }

  static checkRoyalStraightFlush(cards) {
    let straight = CardComboLogic.checkStraight(cards);
    let flashSuit = CardComboLogic.checkFlush(cards);
    let checkSuit = [];
    let highCards = new Set();

    highCards.add(10);
    for (let num in CardComboLogic.faceCards) {
      highCards.add(CardComboLogic.faceCards[num]);
    }

    if (straight === false || flashSuit === false) {
      return false;
    } else {
      straight = new Set(straight);
    }

    for (let card of cards) {
      card.value = Number(card.value)
        ? Number(card.value)
        : CardComboLogic.faceCards[card.value];
      if (
        straight.has(card.value) &&
        card.suit === flashSuit &&
        highCards.has(card.value)
      ) {
        checkSuit.push({ value: card.value, suit: card.suit });
      }
    }

    return checkSuit.length >= 5;
  }

  static highCard(cards) {
    let highestCard = 0;

    for (let card of cards) {
      card.value = Number(card.value)
        ? Number(card.value)
        : CardComboLogic.faceCards[card.value];
      if (card.value > highestCard) {
        highestCard = card.value;
      }
    }

    for (let key in CardComboLogic.faceCards) {
      if (CardComboLogic.faceCards[key] === highestCard) {
        return key;
      }
    }

    return highestCard;
  }
  static getBestCombo(cards1, cards2, player) {
    let combinedCards = [];

    cards1.forEach((card) => combinedCards.push(card));
    cards2.forEach((card) => combinedCards.push(card));

    if (CardComboLogic.checkRoyalStraightFlush(combinedCards) !== false) {
      return [
        `${player} got Royal Flush!`,
        CardComboLogic.checkRoyalStraightFlush(combinedCards),
      ];
    } else if (CardComboLogic.checkStraightFlush(combinedCards) !== false) {
      return [
        `${player} got Straight Flush!`,
        CardComboLogic.checkStraightFlush(combinedCards),
      ];
    } else if (CardComboLogic.checkQuads(combinedCards) !== false) {
      return [`${player} got Quads!`, CardComboLogic.checkQuads(combinedCards)];
    } else if (CardComboLogic.checkFullHouse(combinedCards) !== false) {
      return [
        `${player} got Full House!`,
        CardComboLogic.checkFullHouse(combinedCards),
      ];
    } else if (CardComboLogic.checkFlush(combinedCards) !== false) {
      return [`${player} got Flush!`, CardComboLogic.checkFlush(combinedCards)];
    } else if (CardComboLogic.checkStraight(combinedCards) !== false) {
      return [
        `${player} got Straight!`,
        CardComboLogic.checkStraight(combinedCards),
      ];
    } else if (CardComboLogic.checkTriple(combinedCards) !== false) {
      return [
        `${player} got Three of a Kind!`,
        CardComboLogic.checkTriple(combinedCards),
      ];
    } else if (CardComboLogic.checkTwoPair(combinedCards) !== false) {
      return [
        `${player} got Two Pair!`,
        CardComboLogic.checkTwoPair(combinedCards),
      ];
    } else if (CardComboLogic.checkPair(combinedCards) !== false) {
      return [`${player} got a Pair!`, CardComboLogic.checkPair(combinedCards)];
    } else {
      return [
        `${player} got ${CardComboLogic.highCard(cards1)} High!`,
        CardComboLogic.highCard(cards1),
      ];
    }
  }
}

let cards1 = [
  {
    value: "JACK",
    suit: "HEARTS",
  },
  {
    value: "10",
    suit: "CLUB",
  },
];
let cards2 = [
  {
    value: "6",
    suit: "CLUB",
  },
  {
    value: "10",
    suit: "HEARTS",
  },
  {
    value: "KING",
    suit: "HEARTS",
  },
  {
    value: "QUEEN",
    suit: "CLUB",
  },
  {
    value: "9",
    suit: "CLUB",
  },
];

//console.log(CardComboLogic.getBestCombo(cards1, cards2));
export default CardComboLogic;
