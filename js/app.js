/* starter page state*/
nextButton.disabled = true;
saveResultButton.disabled = true;
/*If there is no array in localstorage, it will be thrown there first,
It will be rendered later. If there is an array, it will be rendered directly.*/
if (localStorage.getItem("playerList") === null) {
  setLocalStorage("playerList", playerListArray);
  console.log("calsiti");
}
/* This function renders the array from localstorage at page opening */
renderPlayerList(getLocalStorage("playerList"));
/* Event list */
playGameButton.addEventListener("click", playGame);
nextButton.addEventListener("click", nextQuestion);
saveResultButton.addEventListener("click", saveGameResult);
addPlayer.addEventListener("click", addNewPlayer);
saveResultButton.addEventListener("submit", addNewPlayer);
