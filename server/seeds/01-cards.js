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
  "ACE",
  "KING",
  "QUEEN",
  "JACK",
  "0",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];
const suits = ["SPADE", "DIAMOND", "CLUB", "HEART"];
// https://res.cloudinary.com/dysl9gnls/image/upload/0_SPADES.png
const cardsObj = [];
// image: `https://deckofcardsapi.com/static/img/${number[0]}${suit[0]}.png`,
suits.forEach((suit) => {
  numbers.forEach((number) => {
    // if (number === "JACK" && suits === "DIAMONDS") {
    //   cardsObj.push({
    //     code: number[0] + suit[0],
    //     value: number,
    //     suit: suit,
    //     image: `https://res.cloudinary.com/dysl9gnls/image/upload/JACK_DIAMOND.png`,
    //   });
    // } else {
    cardsObj.push({
      code: number[0] + suit[0],
      value: number,
      suit: suit,
      image: `https://res.cloudinary.com/dysl9gnls/image/upload/${number}_${suit}.png`,
    });
  });
});

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("cards").del();
  await knex("cards").insert(cardsObj);
};
