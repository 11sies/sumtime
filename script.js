// return true if string contains only digits
function isDigits(x) {
  return x.match(/[^0-9]/) == null;
}

function isTimestamp(x) {
  if (! x.includes(":")) {
    return false;
  }
  let noColon = x.replace(/:/g, "");
  if (! isDigits(noColon)) {
    return false;
  }
  return true;
}

// convert a timestamp into seconds
function convertToSec(x) {
  let splitX = x.split(":");
  for (i in splitX) {
    splitX[i] = parseInt(splitX[i]);
  }
  // convert splitX into ints pls
  if (splitX.length == 2) { // mm:ss
    splitX[0] *= 60;        // convert minutes into seconds
  } else {                  // hh:mm:ss
    splitX[0] *= 3600;      // convert hours into seconds
    splitX[1] *= 60;        // convert minutes into seconds
  }
  let total = 0;
  for (i in splitX) {
    total += splitX[i];
  }
  return total;
}

function padding(num) {
  return num.toString().padStart(2, "0");
}

// convert a given time in seconds to a timestamp
function convertToTimestamp(x) {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  if (x >= 3600) {
    hours = Math.floor(x / 3600);
    x = x % 3600;
  }
  if (x >= 60) {
    minutes = Math.floor(x / 60);
    x = x % 60;
  }
  seconds = x;
  let result = "";
  if (hours > 0) {
    result += hours + ":";
  }
  return result + padding(minutes) + ":" + padding(seconds);
}

function go() {
  let form = document.getElementsByClassName("userinput")[0];
  let intext = form.value;
  let textArray = intext.split(/[\s]/); // split on whitespace
  timestampArr = [];
  let i;
  for (i in textArray) {
    if (isTimestamp(textArray[i])) {
      timestampArr.push(textArray[i]);
    }
  }
  
  seconds = [];
  let j;
  for (j in timestampArr) {
    let sec = convertToSec(timestampArr[j]);
    seconds.push(sec);
  }

  let totalSeconds = 0;
  for (i in seconds) {
    totalSeconds += seconds[i];
  }
  let totalTime = convertToTimestamp(totalSeconds);
  document.getElementsByClassName("output")[0].style.visibility = "visible";
  document.getElementsByClassName("total")[0].innerHTML = totalTime;
  document.getElementsByClassName("numStamps")[0].innerHTML = timestampArr.length;
}