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

const cardsObj = [];

numbers.forEach((number) => {
  suits.forEach((suit) => {
    objs.push({
      card_name: number + suit,
      card_number: number,
      card_suit: suit,
      image: `https://deckofcardsapi.com/static/img/${number}${suit}.png`,
    });
  });
});

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("cards").del();
  await knex("cards").insert(cardsObj);
};
