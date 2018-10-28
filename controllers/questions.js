// Controller for handling '/Questions' get requests
const Question = require('../models/questions.js');

const clockwork = require('clockwork')({ key: 'bda6f6f63cb6aca638e229783db06237c0d5f155' });

const conversationTopics =
  [
    'Whats your favourite now defunct airline?',
    'Would you rather an army of 100 bees or 2 polar bears?',
    'Which vegetable would you choose to be a super hero?',
    'whats the best way to dispose of a body?',
    'How often do you wash your towels?',
    'What is the best thing?',
    'What is your favourite source of fibre',
    'How does all this end?',
    'Lets talk dead celebrities and cars. Henry the VIII? Range Rover Sport HSE.',
  ];

const chatUps = [
  'Did you just fart? Because you blow me away!',
  'If you were a Transformer, youd be Optimus Fine.',
  'Whats your favorite silverware? Because I like to spoon!',
  'Are you O.K.? because its a long fall from heaven',
  'Are you a parking ticket? Cause you have got fine written all over you',
  'Hey, my name is Microsoft, can I crash at your place tonight',
  'You must be made of cheese, because youn are looking Gouda tonight',
  'If you were a phaser on Star Trek, Youd be set to stun',
];

const jokeTopics = [
  'How do you find Will Smith in the snow? Follow the fresh prints',
  'When is your door not actually a door? When its actually ajar',
  'What do you call a man who can’t stand? Neil',
  'What did the buffalo say when his son left? Bison',
  'Why shouldnt you write with a broken pencil? Because its pointless',
  'Want to hear a joke about a piece of paper? Never mind… Its tearable',
  'Why doesnt PacMan use Twitter? He doesnt like being followed',
  'Why does the keyboard work 24 hours? Because it has two shifts',
  'How many ears does Mr. Spock have? 3, the left ear, the right ear & the final front-ear',
];

const getRandomIndex = (array) => {
  const randomNumber = Math.floor(Math.random() * (array.length - 1));
  console.log(array[randomNumber]);
  return array[randomNumber];
};

const sendresponse = (phoneno, message) => {
  clockwork.sendSms({ To: phoneno, Content: message }, (error, resp) => {
    if (error) {
      console.log('Something went wrong', error);
    } else {
      console.log('Message sent to', resp.responses[0].to);
      console.log('MessageID was', resp.responses[0].id);
    }
  });
};
// POST a question

exports.createQuestion = (req, res) => {
  const question = new Question({
    questionId: req.body.questionId,
    question: req.body.question,
    category: req.body.category,
  });
  question.save((err, questionCreated) => {
    if (err) {
      res.send('POST request for creating a question failed.');
    }
    res.json(questionCreated);
  });
};

// GET all questions

exports.getAllQuestions = (req, res) => {
 Question.find({}, (err, questions) => {
   if (err) {
     res.json('Something went wrong, please try again.');
   }
   res.json(questions);
 });
};

// GET questions from parameters 

exports.getQuestions = (req, res) => {
  Question.find({}, (err, questions) => {
    if (err) {
      res.json('Something went wrong, please try again.');
    }
    let smsmsg = 'blank';
    let query = req.query.content;
    const validQuery = (thequery) => {
      let valid = false;
      thequery == 'Askalan convo' ? valid = true : console.log('not a convo');
      thequery == 'Askalan joke' ? valid = true : console.log('not a joke');
      thequery == 'Askalan chatup' ? valid = true : console.log('not a chat up');
      console.log(thequery);
      console.log(valid);
      return valid;
    };
    if (validQuery(query) === true) {
      smsmsg = query.toUpperCase();
      smsmsg == 'ASKALAN CONVO' ? sendresponse(req.query.from, getRandomIndex(conversationTopics)) : console.log('not a convo');
      smsmsg == 'ASKALAN JOKE' ? sendresponse(req.query.from, getRandomIndex(jokeTopics)) : console.log('not a joke');
      smsmsg == 'ASKALAN CHATUP' ? sendresponse(req.query.from, getRandomIndex(chatUps)) : console.log('not a chat up');
    } else {
      sendresponse(req.query.from, 'Umm hi.... you need to ask me for a joke or a conversation starter. Text Askalan convo, Askalan joke or Askalan chatup.');
    }
    res.json(questions);
  });
};
