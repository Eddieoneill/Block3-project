const shaffleDeck = () => {
  let result = "";
  const testArr = [];

  for (let i = 0; i < 52; i++) {
    testArr.push(i);
  }

  while (testArr.length > 0) {
    let randomIndex = Math.floor(Math.random() * testArr.length);

    if (testArr.length === 1) {
      result += `${testArr.splice(randomIndex, 1)}`;
    } else {
      result += `${testArr.splice(randomIndex, 1)},`;
    }
  }

  return result;
};

module.exports = shaffleDeck;
