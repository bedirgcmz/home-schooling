/**
 * Varaibles
 */
/* The variable to follow the number of questions */
let questionNo = 1;
/* Variable that holds the number of correct answers */
let score = 0;
/* Variable showing correct answers to questions */
let correctAnswer;
/* Variable used for timer function */
let counter = 0;
/* The variable holding the setTimeout function */
let timer;
//import uuidv4 from "uuid/v4";

/**
 * Create random id;
 * @returns (id)
 */

let guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
};

/**
 * Play button click fonction
 */
const playGame = () => {
  counter = 0;
  score = 0;
  questionNo = 1;
  const number1 = Math.floor(Math.random() * 10 + 1);
  const number2 = Math.floor(Math.random() * 10 + 1);
  questionNumber.innerHTML = `S1) `;
  question.innerHTML = `${number1} x ${number2} = ?`;
  resultTextArea.innerHTML = "";
  playGameButton.disabled = true;
  saveResultButton.disabled = false;
  nextButton.disabled = false;
  nextButton.innerText = "Next";
  correctAnswer = number1 * number2;
  timer = setTimeout(forSetTimeOut, 10000);
};

/* This function will work in setTimeOut */
function forSetTimeOut() {
  counter++;
  if (counter > 10) {
    clearTimeout(timer);
  } else {
    clearTimeout(timer);
    timer = setTimeout(forSetTimeOut, 10000);
    answerPlayer = answer.value;
    questionNo++;
    if (questionNo == 10) {
      nextButton.innerText = "Finish";
    }
    if (answerPlayer == correctAnswer) {
      score++;
    }
    if (questionNo < 11) {
      const number3 = Math.floor(Math.random() * 10 + 1);
      const number4 = Math.floor(Math.random() * 10 + 1);
      questionNumber.innerHTML = `S${questionNo}) `;
      question.innerHTML = `${number3} x ${number4} = ?`;
      correctAnswer = number3 * number4;
    } else {
      resultTextArea.innerHTML = `Game over. Total score: ${score * 10}`;
      nextButton.disabled = true;
      playGameButton.disabled = false;
    }
  }
  answer.value = "";
}

/**
 * Next button click fonction
 */
const nextQuestion = () => {
  answerPlayer = answer.value;
  questionNo++;
  if (questionNo == 10) {
    nextButton.innerText = "Finish";
  }
  if (answerPlayer == correctAnswer) {
    score++;
  }
  if (questionNo < 11) {
    const number3 = Math.floor(Math.random() * 10 + 1);
    const number4 = Math.floor(Math.random() * 10 + 1);
    questionNumber.innerHTML = `S${questionNo}) `;
    question.innerHTML = `${number3} x ${number4} = ?`;
    correctAnswer = number3 * number4;
  } else {
    resultTextArea.innerHTML = `Game over. Total score: ${score * 10}`;
    nextButton.disabled = true;
    playGameButton.disabled = false;
  }
  counter++;
  clearTimeout(timer);
  timer = setTimeout(forSetTimeOut, 10000);
  answer.value = "";
};

/**
 *This function delete a player.
 */
const deletePlayer = (pPlayerId) => {
  console.log(pPlayerId);
  playerListArray = getLocalStorage("playerList");
  let newList = playerListArray.filter((player) => player.id !== pPlayerId);
  console.log(newList);
  setLocalStorage("playerList", newList);
  newList = getLocalStorage("playerList");
  renderPlayerList(newList);
  console.log(newList);
};

/**
 * Player list render function
 */
const renderPlayerList = (pArray) => {
  playerList.innerHTML = pArray
    .map((player) => {
      return `
        <tr>
        <td>${player.name}</td>
        <td>${player.surname}</td>
        <td id="player-score"><b>${player.score}</b></td>
        <td class="text-end"><button type="button" onclick="setPlayerNameSurname(${player.id})" class="btn btn-primary lets-play">Let's Play</button></td>
        <td class="delete"><i onclick="deletePlayer(
          ${player.id}
        )" class="fa-solid fa-trash-can text-danger"></i></td>      
        </tr>
      `;
    })
    .join("");
};

/**
 * save result score
 */
const saveGameResult = () => {
  if (playerName.innerText == "Not Determined") {
    swal(
      "Ooooovv!",
      "Hey, who are you? To save the game, you must first select its name! Use the 'Let's Play' button for this",
      "error"
    );
  }
  let totalScore = score * 10;
  playerListArray = getLocalStorage("playerList");
  const personPlaying = playerListArray.find(
    (player) => player.name + " " + player.surname === playerName.innerText
  );
  personPlaying.score = totalScore;
  setLocalStorage("playerList", playerListArray);
  renderPlayerList(playerListArray);
};
/**
 * Let's play button onclick event
 */
const setPlayerNameSurname = (event) => {
  playerListArray = getLocalStorage("playerList");
  const player = playerListArray.find((player) => player.id === event);
  playerName.innerHTML = `${player.name} ${player.surname}`;
};

/**
 * This function adds a new player.
 */
const addNewPlayer = () => {
  const newPlayer = {
    id: Date.now(),
    name: document.getElementById("name").value.trim(),
    surname: document.getElementById("surname").value.trim(),
    score: "",
  };
  playerListArray = getLocalStorage("playerList");
  playerListArray.push(newPlayer);
  setLocalStorage("playerList", playerListArray);
  playerListArray = getLocalStorage("playerList");
  renderPlayerList(playerListArray);
};

/**
 * music play and pause event
 */
function play() {
  mySong.play();
}
function pause() {
  mySong.pause();
}
/**
 * LocalStorage add and undo player list functions
 */
const setLocalStorage = (pStringKey, pArrar) => {
  localStorage.setItem(pStringKey, JSON.stringify(pArrar));
};
const getLocalStorage = (pStringKey) => {
  return JSON.parse(localStorage.getItem(pStringKey));
};
