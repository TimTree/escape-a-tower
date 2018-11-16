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
  if (Array.prototype.indexOf) {
    return true;
  } else {
    return false;
  }
}

var supportsLocalStorage = testLocalStorage();
var supportsIndexOf = testIndexOf();

function checkUnsupported() {
  if (!supportsLocalStorage) {
    document.getElementById("unsupported").innerHTML="Your browser doesn't support some of the game's features. <a onclick='changeEnclosure();unsupportedReason()'>Learn More</a>";
  }
}
