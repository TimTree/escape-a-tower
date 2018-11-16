// Check Local Storage support
function testLocalStorage() {
  var doesItWork = 'test';
  try {
    localStorage.setItem(doesItWork, '1');
    localStorage.removeItem(doesItWork);
    if (!Object.keys) throw "error";
    return true;
  }
  catch (error) {
    return false;
  }
}

// Check indexOf support
function testIndexOf() {
  if (!Array.prototype.indexOf) {
    return false;
  } else {
    return true;
  }
}

// Check timer support (date.now)
function testTimerSupport() {
  if (!Date.now) {
    return false;
  } else {
    return true;
  }
}

var supportsLocalStorage = testLocalStorage();
var supportsIndexOf = testIndexOf();
var supportsTimer = testTimerSupport();

function checkUnsupported() {
  if (!supportsLocalStorage) {
    document.getElementById("unsupported").innerHTML="Your browser doesn't support some of the game's features. <a onclick='changeEnclosure();unsupportedReason()'>Learn More</a>";
  }
}
