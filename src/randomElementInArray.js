const conversationTopics =
  [
    'What`s your favourite now defunct airline?',
    'Would you rather an army of 100 bees or 2 polar bears?',
    'Which vegetable would you choose to be a super hero?',
    'what`s the best way to dispose of a body?',
    'How often do you wash your towels?',
    'what is the best thing?',
  ];

const getRandomIndex = (array) => {
  const randomNumber = Math.floor(Math.random() * (array.length - 1));
  console.log(array[randomNumber]);
  return array[randomNumber];
};

getRandomIndex(conversationTopics);

module.exports = {
  getRandomIndex,
  conversationTopics,
};
