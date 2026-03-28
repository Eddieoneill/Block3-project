const fs = require("fs");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// {
//   card_name: "back",
//   card_number: "",
//   card_suit: "",
//   image: "https://deckofcardsapi.com/static/img/back.png",
// }
const numbers = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "JACK",
  "QUEEN",
  "KING",
  "ACE",
];
const suits = ["SPADES", "DIAMONDS", "CLUBS", "HEARTS"];
// https://res.cloudinary.com/dysl9gnls/image/upload/0_SPADES.png
const cardsObj = [];
// image: `https://deckofcardsapi.com/static/img/${number[0]}${suit[0]}.png`,
numbers.forEach((number) => {
  suits.forEach((suit) => {
    if (number === "JACK" && suits === "DIAMONDS") {
      cardsObj.push({
        code: number[0] + suit[0],
        value: number,
        suit: suit,
        image: `https://res.cloudinary.com/dysl9gnls/image/upload/v1774667216/JACK_DIAMONDS.png`,
      });
    } else {
      cardsObj.push({
        code: number[0] + suit[0],
        value: number,
        suit: suit,
        image: `https://res.cloudinary.com/dysl9gnls/image/upload/${number}_${suit}.png`,
      });
    }
  });
});

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("cards").del();
  await knex("cards").insert(cardsObj);
};
