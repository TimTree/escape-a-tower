var titler = document.getElementById("settingHeader");
var main = document.getElementById("main");
var copyright = document.getElementById("copyright");

var saveData = {
  counter: 0,
  checkpoint: 0,
  complete: 0,
  seenScenes: [],
  bestTime: null
};

var leaperMode = false;
var timerMode = false;
var tempSpawn = 0;
var creatorTime = 33.2;

var autoComplete = (function() {
    var counter = 0;
    return function() {
      if (counter < 3) {
        counter += 1;
        if (counter === 3) {
          saveData.complete = 1;
          save();
          imdone();
        }
      }
    };
})();

var scenes1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
var scenes2 = [20,21,22,23,24,25,26,27,28];
var scenes3 = [21,24,25,27,28,29,30,31,32,33,34,35];
var scenes4 = [36,37,38,39,40];
var scenes5 = [41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66];
var scenes6 = [67,68,69,70,71,78,79,80,81,82,83,84,85];
var scenes7 = [72,73,74,75,76,77];
var scenes8 = [86,87,88,89,90,91,92,93,94,95,96,97];
var scenes9 = [98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114];
var scenes10 = [100,103,109,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,180];
var scenes11 = [134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171];

if (supportsLocalStorage) {
  if (localStorage.getItem("escapeTowerSaveData")) {
    var parsedData = JSON.parse(localStorage.getItem("escapeTowerSaveData"));
    for (var i = 0; i < Object.keys(parsedData).length; i += 1) {
      if (saveData.hasOwnProperty(Object.getOwnPropertyNames(parsedData)[i])) {
        saveData[Object.keys(saveData)[Object.keys(saveData).indexOf(Object.getOwnPropertyNames(parsedData)[i])]]
        = parsedData[Object.keys(parsedData)[i]];
      }
    }
  }
}

function save() {
  if (supportsLocalStorage) {
    localStorage.setItem("escapeTowerSaveData", JSON.stringify(saveData));
  }
}

function changeEnclosure() {
  document.getElementById("titleHeader").style.display = "none";
  document.getElementById("topHeader").style.display = "block";
}

function loadit() {
  if (saveData.checkpoint === 0) {
    document.getElementById("titleselect").innerHTML = "<ul><li><a onclick='changeEnclosure();howtoplay()'><strong>How&nbsp;to&nbsp;Play</strong></a></li><wbr><li><a onclick='changeEnclosure();prologue()'><strong>New&nbsp;Game</strong></a></li></ul>";
  }
  if (saveData.checkpoint >= 1) {
    document.getElementById("titleselect").innerHTML = "<ul><li><a onclick='changeEnclosure();howtoplay()'><strong>How&nbsp;to&nbsp;Play</strong></a></li><wbr><li><a onclick='yousure()'><strong>New&nbsp;Game</strong></a></li><wbr><li><a onclick='changeEnclosure();loadgame()'><strong>Load&nbsp;Game</strong></a></li></ul>";
  }
  if (saveData.complete === 1) {
    document.getElementById("bonusfeatures").innerHTML = "<a onclick='changeEnclosure();bonus()'><strong>Bonus&nbsp;Features</strong></a>";
    document.getElementById("secret2").style.display="none";
  }
}

window.onload = function () { checkUnsupported(); loadit(); };

function loadgame() {
  var spawnVar;
  if (leaperMode || timerMode) {
    spawnVar = tempSpawn;
  } else {
    spawnVar = saveData.checkpoint;
  }
  if (spawnVar === 1) { s1(); }
  if (spawnVar === 2) { s20(); }
  if (spawnVar === 3) { s29(); }
  if (spawnVar === 4) { s42(); }
  if (spawnVar === 5) { s47(); }
  if (spawnVar === 6) { s71(); }
  if (spawnVar === 7) { s76(); }
  if (spawnVar === 8) { s90(); }
  if (spawnVar === 9) { s102(); }
  if (spawnVar === 10) { s121(); }
}

function yousure() {
  var b = window.confirm("Are you sure you want to start a new game? This will delete your current save data.");
  if (b === true) { changeEnclosure();prologue(); }
}

function howtoplay() {
  titler.innerHTML = "How to Play";
  var saveDataStep;
  if (supportsLocalStorage) {
    saveDataStep = "<li>The game automatically saves at each <span style='color:#008000;'>checkpoint</span>.<ul><li>You can erase your save data by clicking <a onclick='erase()'>here</a>.</li></ul></li>";
  } else {
    saveDataStep = "";
  }
  main.innerHTML = "<ul><li>Click on the choices you think will best continue the story.</li><li>Some choices lead to <span style='color:#FF0000;'>game over</span>'s.<ul><li>If this happens, you return to your latest <span style='color:#008000;'>checkpoint</span>.</li></ul></li><li>Try to reach <span style='color:#0000FF;'>the end</span> with the least amount of <span style='color:#FF0000;'>game over</span>'s.</li>" + saveDataStep + "</ul><div id='prologueselect'><ul><li><a onclick=imdone()>Main&nbsp;Menu</a></li></ul></div>";
  copyright.style.visibility = "hidden";
}

function unsupportedReason() {
  titler.innerHTML = "Unsupported Features";
  var noSaveSupport = "";
  var noTimer = "";
  var noIndexOf = "";
  var oldIE = "";
  var workarounds = "";
  if (!supportsLocalStorage) {
    noSaveSupport = "<li>No save support</li>";
  }
  if (!supportsTimer) {
    noTimer = "<li>No timer support</li>";
  }
  if (!supportsIndexOf) {
    noIndexOf = "<li>No Game Leaper support</li>";
  }
  if (oldIEMode) {
    oldIE = "<li>Old IE mode - condensed for 800x600 displays</li>";
  }
  if (noTimer === "" && noIndexOf === "" && oldIE === "") {
    workarounds = "<p>If your browser was released 2012 or newer, try these workarounds.</p><ul><li><strong>IE</strong> or <strong>Edge</strong>: Play the game online.</li><li> <strong>Safari</strong>: Play the game online or disable local file restrictions.</li><li><strong>Safari private browsing on iOS 10 or below</strong>: Turn off private browsing.</li></ul>";
  }
  main.innerHTML = "<p>Your browser will run Escape a Tower with the following limitations:</p><ul>"+noSaveSupport+noTimer+noIndexOf+oldIE+"</ul>"+workarounds+"<div id='prologueselect'><ul><li><a onclick=imdone()>Main&nbsp;Menu</a></li></ul></div>";
  copyright.style.visibility = "hidden";
}

function vhistory() {
  titler.innerHTML = "Version History";
  main.innerHTML = "<ul><li><strong>Version 2.5</strong> (released tba)<p>The biggest update since the conversion to Web. Escape a Tower version 2.5 features new post-game content, such as:</p><ul><li><strong>Game Leaper</strong> - Leap back to certain parts of the game to find secrets you may have missed.</li><li><strong>Beat the Creator</strong> - Use the new in-game timer to challenge my time.</li><li><strong>Escape a Tower Box Art</strong> - See box art I made for a psychology class.</li></ul><p>In addition, this update corrects grammatical errors, adds a few new game scenes, and includes a multitude of QOL/behind-the-scenes impovements.</p><p><a href='./assets/other/2.5ReleaseNotes.txt' target='_blank'>Click here</a> for the full release notes.</p><li><strong>Version 2.4.3</strong> (released Oct 25, 2018)<ul><li>Corrects grammatical errors</li><li>Updates links to Games by Tim</li><li>Removes deprecated appcache</li></ul></li><li><strong>Version 2.4.2</strong> (released Dec 1, 2016)<ul><li>Minor script changes</li></ul></li><li><strong>Version 2.4.1</strong> (released Nov 3, 2016)<ul><li>Fixes Javascript syntax errors</li></ul></li><li><strong>Version 2.4</strong> (released Feb 15, 2016)<ul><li>Lots of formatting improvements</li><li>Visual enhancements, including shadows and active selectors</li><li>Bug fixes</li></ul></li><li><strong>Version 2.3.2</strong> (released Oct 11, 2015)<ul><li>Now compatible with more ancient browsers, including Netscape</li><li>Formatting fix for Internet Explorer</li></ul></li><li><strong>Version 2.3.1</strong> (released Oct 10, 2015)<ul><li>Improves game scaling</li><li>Explains how to play with fewer words</li><li>The game is now playable on Safari private browsing mode.</li></ul></li><li><strong>Version 2.3</strong> (released Jun 21, 2014)<ul><li>Fixes HTML5 validation issues</li><li>Erasing save data now only deletes Escape a Tower data.</li><li>IE8 support</li></ul></li><li><strong>Version 2.2</strong> (released May 8, 2014)<ul><li>Formatting fixes for Firefox, Internet Explorer, and mobile devices.</li><li>Added the option to erase save data on the bottom of version history.</li><li>The file size has decreased.</li></ul></li><li><strong>Version 2.1</strong> (released Mar 8, 2014)<ul><li>Based on user feedback, I made a small modification to the first part of the game to make that section a little easier. It does NOT alter the solution; rather, it provides a hint towards the right direction.</li></ul></li><li><strong>Version 2.0</strong> (released Mar 4, 2014)<br>The classic PowerPoint game has been rewritten in HTML5. What does this mean for you?<ul><li>Escape a Tower is playable natively on a Web browser. The game loads more quickly, has a smaller file size, and best of all, you no longer need to download a file and open PowerPoint to play!</li><li>You can also play Escape a Tower on mobile devices, such as the iPhone, iPad, Nexus, Samsung Galaxy, you name it!</li><li>New save feature. If you exit the game before you beat it, you are now able to load the game from your nearest checkpoint!</li><li>The game now tracks how many Game Over's you get while playing, which is displayed at the end of the game.</li><li>Corrects some grammatical errors.</li></ul></li><p> <a href='./assets/other/PPThistory.txt' target='_blank'>Click here</a> for the PowerPoint version history.</p></ul><div class='center'><p><a onclick='bonus()'>Back to Bonus Features</a></p></div>";
  copyright.style.visibility = "hidden";
}

function erase() {
  var r = window.confirm("Are you sure you want to erase all save data? You cannot undo this.");
  if (r === true) {
    localStorage.removeItem("escapeTowerSaveData"); window.location.reload();
  }
}

function choices() {
  var i;
  var choiceContent = "";
  if (arguments.length === 1) {
    return "<ul id='moveon'><li onclick=" + arguments[0][1] + ">" + arguments[0][0] + "</li></ul>";
  } else {
    for (i = 0; i < arguments.length; i += 1) {
      choiceContent += "<li onclick=" + arguments[i][1] + "><span>" + arguments[i][0] + "</span></li>";
    }
    return "<ol type='A'>" + choiceContent + "</ol>";
  }
}

function gameOver() {
  var goBackWords;
  var spawnVar;
  if (leaperMode || timerMode) {
    spawnVar = tempSpawn;
  } else {
    spawnVar = saveData.checkpoint;
  }
  if (spawnVar === 1) {
    goBackWords = "Go back to beginning";
  } else {
    goBackWords = "Go back to checkpoint";
  }
  if (!leaperMode && !timerMode) {
    saveData.counter += 1;
    save();
  }
  return "<div class='center'><p><span class='gameover'>GAME OVER</span></p><p><a onclick='loadgame()'>(" + goBackWords + ")</a></p></div>";
}

function markCheckpoint(x) {
  if (leaperMode || timerMode) {
    tempSpawn = x;
  } else {
    saveData.checkpoint = x;
    save();
  }
}

function addScene(x) {
  if (supportsIndexOf) {
    if (saveData.seenScenes.indexOf(x) === -1) {
      document.getElementById("checkmarker").innerHTML = "";
      saveData.seenScenes.push(x);
      save();
    } else {
      if (leaperMode) {
        document.getElementById("checkmarker").innerHTML = "&#10003;";
      }
    }
  }
}

function prologue() {
  if (!leaperMode && !timerMode) {
    saveData.counter = 0;
    saveData.checkpoint = 0;
    save();
  }
  titler.innerHTML = "Prologue";
  main.innerHTML = "<p>It is a warm, sunny day, and you decide to take a stroll downtown. There, you decide to visit the video game store. To get to the store, you have to cross through a dark, narrow alley.</p><p>As you walk through the alley, a man dressed in black suddenly appears out of nowhere!</p><p><strong>&quot;BOO!&quot;</strong> he yells, making a mad sprint towards you.</p><p>Scared, you decide to make a big run for it, but you are no match for the man. You've been snatched!</p>"
  + "<div id='prologueselect'><ul><li><a onclick='prologue2()'>Continue</a></li><wbr><li><a onclick=s1()>Skip&nbsp;Prologue</a></li></ul></div>";
  copyright.style.visibility = "hidden";
}

function prologue2() {
  main.innerHTML = "<p>You try, and try to free yourself from the man's tight grip, but his hand won't budge! Soon, the man drags you into a ragged car, where he chains you and takes off. <em>This man is a kidnapper!</em></p><p><strong>&quot;You are now mine! MWA, HA HA!&quot;</strong> he hisses.</p><p>It is a long trip, and soon, you fall asleep. You then awaken to find yourself inside a prison cell of a tall, scary tower. Is this the kidnapper's home? Who knows? You want to get out of here...NOW! <em>Can you escape the tower?</em></p>"
  + "<div id='prologueselect'><ul><li><a onclick=s1()>Begin.</a></li></ul></div>";
}

function s1() {
  markCheckpoint(1);
  titler.innerHTML = "The Prison Cell";
  main.innerHTML = "<p>You are now inside the prison cell.</p><p><em>So what do you do?</em> Remember, your goal is to escape the tower.</p>"
  + choices(
    ["Try to open the prison door.", "s2()"],
    ["Jump off the window.", "s3()"],
    ["See what's inside the cabinet.", "s4()"],
    ["Do nothing.", "s5()"]
  );
  addScene(1);
  copyright.style.visibility = "hidden";
}

function s2() {
  main.innerHTML = "<p>You try to open the prison door. It's locked.</p><p><em>So now what?</em></p>"
  + choices(
    ["Try to open the door again.", "s6()"],
    ["Give up and jump off the window.", "s3()"],
    ["Give up and check the cabinet.", "s4()"],
    ["Cry.", "s7()"]
  );
  addScene(2);
}

function s3() {
  main.innerHTML = "<p>You try to jump off the window. The good news is, the window can open up, but as you jump off, you notice the bad news: you don't have a parachute.</p><p>As you fall, you think to yourself, &quot;What a stupid choice I made! Why in the world did I...&quot;</p><p>BOOM! You land on the ground, flat dead.</p>"
  + gameOver();
  addScene(3);
}

function s4() {
  main.innerHTML = "<p>You check the cabinet. There are two drawers.</p><p><em>Which drawer do you open?</em></p>"
  + choices(
    ["The top one.", "s8()"],
    ["The bottom one.", "s9()"],
    ["I DON'T WANNA DO THIS!!!", "s1()"]
  );
  addScene(4);
}

function s5() {
  main.innerHTML = "<p>Well, ok then.</p><p>After a few hours, a witch chef enters your cell, handing over your lunch. The lunch <em>looks</em> like a piece of rubber. The witch leaves the room and closes the door. <em>Do you eat the lunch?</em></p>"
  + choices(
    ["Yes.", "s10()"],
    ["No. Instead, I throw the lunch out the window.", "s11()"],
    ["No. Instead, I complain about the lunch.", "s12()"]
  );
  addScene(5);
}

function s6() {
  main.innerHTML = "<p>Opening the door again brings in the same effect: it's locked.</p><p>Only this time, the kidnapper notices that you're trying to open the door. He storms into the prison cell with his gun, and without any notice, he shoots you. You're dead.</p>"
  + gameOver();
  addScene(6);
}

function s7() {
  main.innerHTML = "<p>Well, crying isn't the best thing to do. Your sobs are loud enough for the kidnapper to hear. He storms into the prison cell and sees you in the crying status.</p><p>&quot;Why did I kidnap a cry baby?&quot; the kidnapper thinks.</p><p>Then, without further notice, he grabs you (you're weak from crying) and throws you off the window, making you dead.</p>"
  + gameOver();
  addScene(7);
}

function s8() {
  main.innerHTML = "<p>You open the top drawer.</p><p>Unfortunately, a poisonous snake resides in there, and it bites you, poisoning you up to the point where you're irritated and eventually, dead.</p>"
  + gameOver();
  addScene(8);
}

function s9() {
  main.innerHTML = "<p>You open the bottom drawer. Inside, there appears to be a small piece of paper with handwriting on it. You read the note, and it states:</p><div style='font-family:Palatino Linotype,Times New Roman;'><p><em>To the witch chef,</p><p>Please provide a lunch to the prisoner each day. You may prepare whatever you want, as long as it does NOT kill the prisoner.</p><p>~The kidnapper</em></p></div><p>What now?</p>"
  + choices(
    ["Open the top drawer.", "s8()"],
    ["Wait for the lunch to arrive.", "s5()"]
  );
  addScene(9);
}

function s10() {
  main.innerHTML = "<p>You eat the lunch. Apparently, the rubber has an acid that brings you great strength for a little while! Because of this, you manage to bust the prison door open and escape the room!</p>"
  + choices(["Continue onward.", "s20()"])
  + "<p>(Note: As you escape the prison cell, your power disappears.)</p>";
  addScene(10);
}

function s11() {
  main.innerHTML = "<p>Uh oh. Throwing the lunch off the window was a bad idea, as when the lunch lands, it makes a HUGE explosion sound! (How did that happen?) The kidnapper hears it, and he storms into the prison cell.</p><p>&quot;You picky eater of nonsense!&quot; he yells to you.</p><p>And with that, he shoots you with his gun, making you dead.</p>"
  + gameOver();
  addScene(11);
}

function s12() {
  main.innerHTML = "<p>You start complaining about the lunch. The witch chef hears you and heads back in your cell.</p><p>&quot;What's wrong with the food?!&quot; asks the witch in an angry tone.</p><p><em>You reply:</em></p>"
  + choices(
    ["&quot;I hate you!&quot;", "s13()"],
    ["&quot;My lunch is a little cold.&quot;", "s14()"],
    ["&quot;I want to escape this tower. Can you help me?&quot;", "s15()"]
  );
  addScene(12);
}

function s13() {
  main.innerHTML = "<p>&quot;I hate you!&quot; you respond.</p><p>The witch fumes with anger.</p><p>&quot;YOU IDIOT!!!&quot; she rages. &quot;WATCH THE PAIN!!!&quot;</p><p>The witch uses a spell on you to paralyze you. Then, she tosses you off the window. You're dead.</p>"
  + gameOver();
  addScene(13);
}

function s14() {
  main.innerHTML = "<p>&quot;My lunch is a little cold,&quot; you respond.</p><p>&quot;Oh, really,&quot; the witch says. &quot;Fine! I'll heat it up for you!&quot;</p><p>The witch takes the lunch to heat it up. She forgets to close the prison door. <em>What do you do?</em></p>"
  + choices(
    ["Go through the door.", "s16()"],
    ["Wait for the lunch.", "s17()"]
  );
  addScene(14);
}

function s15() {
  main.innerHTML = "<p>&quot;I want to escape this tower. Can you help me?&quot; you respond.</p><p>Welp, you literally gave away your plan.</p><p>&quot;Escape the tower?&quot; the witch responds back. &quot;That's the one thing the kidnapper forbids. You're doomed!&quot;</p><p>The witch calls the kidnapper. The kidnapper shoots you with his gun without notice. You're dead.</p>"
  + gameOver();
  addScene(15);
}

function s16() {
  main.innerHTML = "<p>Boo-yah! You get past the prison door, and the witch doesn't notice!</p>You've escaped the room!</p>"
  + choices(["Continue onward.", "s20()"]);
  addScene(16);
}

function s17() {
  main.innerHTML = "<p>After the long wait, the witch returns with the heated lunch.</p>&quot;There. Happy?&quot; the witch miffs. &quot;I put a lot of hard work into this, so you better eat it!!!&quot;</p><p><em>What do you do?</em></p>"
  + choices(
    ["Eat the heated lunch.", "s18()"],
    ["Punch the witch.", "s19()"],
    ["I'm scared. Let's jump off the window.", "s3()"]
  );
  addScene(17);
}

function s18() {
  main.innerHTML = "<p>You eat the heated lunch.</p><p>You see, the lunch used to have an acid that brings you great strength, but heating up the lunch made the acid evaporate.</p><p>Also, the witch heated the lunch with poisonous coals, so after you finish the meal, you suffocate and fall dead.</p><p>&quot;Ha ha! Tricked you, tricked you!&quot; the witch laughs.</p>"
  + gameOver();
  addScene(18);
}

function s19() {
  main.innerHTML = "<p>You punch the witch.</p><p>The witch is stunned.</p><p>&quot;How dare you try to hurt me!&quot; she rages. <strong>&quot;WATCH THE PAIN!!!&quot;</strong></p><p>The witch uses a spell on you to paralyze you. Then, she tosses you off the window. You're dead.</p>"
  + gameOver();
  addScene(19);
}

function s20() {
  markCheckpoint(2);
  titler.innerHTML = "Staircase Area With Two Doors";
  main.innerHTML = "<p>The next area of the tower includes a giant staircase going down and two doors on each side of it. A sign stands next to the staircase. <em>What do you do?</em></p>"
  + choices(
    ["Go down the stairs.", "s21()"],
    ["Enter the left door.", "s22()"],
    ["Enter the right door.", "s23()"],
    ["Read the sign.", "s24(1)"]
  )
  + "<div class='center'><p><span class='checkpoint'>CHECKPOINT!</span></p><p>If you get a game over or leave from now on, you will return here until you reach another checkpoint.</p></div>";
  addScene(20);
  copyright.style.visibility = "hidden";
}

function s21() {
  titler.innerHTML = "The Staircase";
  main.innerHTML = "<p>Did you really think I'd make this adventure <em>that easy?</em> Well, I guess you did.</p><p>As you go down the stairs, you notice a giant spider blocking the staircase, and before you can run away, it captures and tangles you to the end of your life. Goodbye!</p>"
  + gameOver();
  addScene(21);
}

function s22() {
  main.innerHTML = "<p>You try to open the left door. It's locked. There's a key handle on this door, though. Where can you find a key?</p>"
  + choices(["Go back.", "s20()"]);
  addScene(22);
}

function s23() {
  titler.innerHTML = "Mysterious Library";
  main.innerHTML = "<p>You enter the right door. The door is not locked, so you manage to get in.</p><p>The room looks like a library of some kind. <em>Which book do you read?</em></p>"
  + choices(
    ["Read <em>The Book of Mysteries</em>.", "s26()"],
    ["Read <em>The Solution to Everything</em>.", "s27()"],
    ["Read <em>Wonders of the Tower</em>.", "s28(1)"],
    ["Leave the room.", "s20()"]
  );
  addScene(23);
}

function s24(instance) {
  var condMessage, condFunction;
  if (instance === 1) {
    condMessage = "<p><em>What do you do?</em></p>";
    condFunction = "s20()";
  } else {
    condMessage = "<p>You should go back now. Really, I insist.</p>";
    condFunction = "s32()";
  }
  main.innerHTML = "<p>You read the sign. The sign says:</p><p class='IEThing'><table style='margin:auto;background-color:#C6BC9C;border: 1px solid #766F4F;'><tr><td style='padding:9px 12px;'><span style='color:#C95000;font-family:tahoma, sans-serif;font-weight:700;'>WARNING: GIANT SPIDER AHEAD!!</span></td></tr></table></p>"
  + condMessage
  + choices(
    ["Go back.", condFunction],
    ["Go down the stairs anyway.", "s25()"]
  );
  addScene(24);
}

function s25() {
  titler.innerHTML = "The Staircase";
  main.innerHTML = "<p>Well, the sign actually is telling the truth.</p><p>As you go down the stairs, you see a giant spider blocking the staircase, and before you can run away, it captures and tangles you to the end of your life. Next time, listen to those signs!</p>"
  + gameOver();
  addScene(25);
}

function s26() {
  main.innerHTML = "<p>You read <em>The Book of Mysteries</em>. A section of the book states:</p><p><span style='font-family:Palatino Linotype,serif;'><em>&quot;I see a key, somewhere in the shadows of a library tower. Find it, and the mystery is solved.&quot;</em></span></p><p><em>Do you trust this book?</em></p>"
  + choices(
    ["Yes. Let's search in the shadows of this library.", "s29()"],
    ["No. Let's go back.", "s23()"]
  );
  addScene(26);
}

function s27() {
  main.innerHTML = "<p>You read <em>The Solution to Everything</em>.</p><p>Apparently, this book is used as a trick to end the lives of tower lurkers. As you open the book, a shard of light beams out, blinding you. Too bad!</p>"
  + gameOver();
  addScene(27);
}

function s28(instance) {
  var condMessage, condChoices;
  if (instance === 1) {
    condMessage = "<p>You read <em>Wonders of the Tower</em>. Parts of the book are shown here:</p>";
    condChoices = choices(
                  ["Ok, let's read <em>The Book of Mysteries</em> now.", "s26()"],
                  ["&quot; <em>The Solution to Everything</em> now.", "s27()"],
                  ["Let's go back now.", "s20()"]
                );
  } else {
    condMessage = "<p>So <em>Wonders of the Tower</em> does not give the way to use the key, but it does provide this:</p>";
    condChoices = choices(
                  ["No solution, eh? let's read <em>The Solution to Everything</em> then.", "s27()"],
                  ["Eh, let's leave the library.", "s32()"]
                );
  }
  main.innerHTML = condMessage+"<p><span style='font-family:Palatino Linotype,Times New Roman;'><em>&quot;Open chest 2 for a hidden surprise. Then traverse through corridors 1, 3, 2, and 4, in this order. Do not forget this.&quot;</em></span></p><p><em>This is rather interesting...</em></p>"
  + condChoices;
  addScene(28);
}

function s29() {
  markCheckpoint(3);
  titler.innerHTML = "Mysterious Library";
  main.innerHTML = "<p>You search in the shadows. Wow.</p><p>You find a key! For some reason, the book is indeed true.</p><p>Now what is this key useful for...?</p>"
  + choices(
    ["Let's read <em>The Solution to Everything</em> to find out!", "s27()"],
    ["Let's read <em>Wonders of the Tower</em> to find out!", "s28(2)"],
    ["Leave the library.", "s32()"]
  )
  + "<div class='center'><p><span class='checkpoint'>CHECKPOINT!</span></p></div>";
  addScene(29);
  copyright.style.visibility = "hidden";
}

function s32() {
  titler.innerHTML = "Staircase Area With Two Doors";
  main.innerHTML = "<p>You are back in the area with the staircase, the two doors, and the sign.</p><p><em>So now what?</em></p>"
  + choices(
    ["Go down the stairs.", "s21()"],
    ["Check the left door now.", "s34()"],
    ["Let's read that sign.", "s24(2)"]
  );
  addScene(30);
}

function s34() {
  titler.innerHTML = "Room of Chests";
  main.innerHTML = "<p>You check the left door. It's locked, but there's a key handle on this door. Since you have the key, you open the door and go inside!</p><p>In this room, there are three different treasure chests. <em>Which chest do you open?</em></p>"
  + choices(
    ["Chest 1", "s37()"],
    ["Chest 2", "s38()"],
    ["Chest 3", "s39(1)"],
    ["Get out of this room.", "s32()"]
  );
  addScene(31);
}

function s37() {
  main.innerHTML = "<p>You open chest 1. Um,</p><p><strong>A GIANT SNAKE COMES OUT OF THE CHEST AND EATS YOU UP!!!</strong></p><p>Too bad...</p>"
  + gameOver();
  addScene(32);
}

function s38() {
  main.innerHTML = "<p>You open chest 2.</p><p>Hey, there's something in here. It is a WOODEN SLINGSHOT!</p><p>This will be very useful later...</p>"
  + choices(
    ["Any other goodies? Let's check chest 1.", "s37()"],
    ["&quot; chest 3.", "s39(2)"],
    ["Leave the room.", "s40()"]
  );
  addScene(33);
}

function s39(instance) {
  var condChoices;
  if (instance === 1) {
    condChoices = choices(
                  ["Open chest 1.", "s37()"],
                  ["Open chest 2.", "s38()"],
                  ["Leave the room.", "s32()"]
                );
  } else {
    condChoices = choices(
                  ["Ok then. Let's check chest 1.", "s37()"],
                  ["Leave the room.", "s40()"]
                );
  }
  main.innerHTML = "<p>You open chest 3.</p><p>There is <em>nothing</em> inside this chest. Drat!</p>"
  + condChoices;
  addScene(34);
}

function s40() {
  titler.innerHTML = "The Staircase";
  main.innerHTML = "<p>You leave the room. You've already checked both doors already, so you go down the stairs.</p><p>A giant spider blocks the staircase, but since you now own a slingshot, you shoot the spider! You reach the bottom of the staircase!</p>"
  + choices(["Continue onward.", "s42()"]);
  addScene(35);
}

function s42() {
  markCheckpoint(4);
  titler.innerHTML = "The Corridors";
  main.innerHTML = "<p>Moving on, you see two different corridors.</p><p><em>Which one do you go through?</em></p>"
  + choices(
    ["Corridor 1", "s44()"],
    ["Corridor 2", "s43()"]
  )
  + "<div class='center'><p><span class='checkpoint'>CHECKPOINT!</span></p></div>";
  copyright.style.visibility = "hidden";
  addScene(36);
}

function s43() {
  main.innerHTML = "<p>As you move on through the corridor, there is a wall blocking your path. Dead end!</p><p>But as you try to go back, a sensor detects you, and a laser starts beaming on you, burning you until you die.</p><p>Curse those dead ends!</p>"
  + gameOver();
  addScene(37);
}

function s44() {
  main.innerHTML = "<p>Corridor 1 leads onward down the tower. Looks like you went the right way!</p><p>But hold on. Now you see 3 different corridors. <em>Which one do you go through?</em></p>"
  + choices(
    ["Corridor 1", "s43()"],
    ["Corridor 2", "s43()"],
    ["Corridor 3", "s45()"]
  );
  addScene(38);
}

function s45() {
  main.innerHTML = "<p>Good job! Corridor 3 was the way to go!</p><p>But now you see 4 corridors! <em>Which way do you go?</em></p>"
  + choices(
    ["Corridor 1", "s43()"],
    ["Corridor 2", "s46()"],
    ["Corridor 3", "s43()"],
    ["Corridor 4", "s43()"]
  );
  addScene(39);
}

function s46() {
  main.innerHTML = "<p>Good job! You actually managed to choose the correct corridor again!</p><p>But now it gets bad. You guessed it: 5 corridors! <em>Which way do you go?</em></p>"
  + choices(
    ["Corridor 1", "s43()"],
    ["Corridor 2", "s43()"],
    ["Corridor 3", "s43()"],
    ["Corridor 4", "s47()"],
    ["Corridor 5", "s43()"]
  );
  addScene(40);
}

function s47() {
  markCheckpoint(5);
  titler.innerHTML = "The Corridors";
  main.innerHTML = "<p><strong>EXCELLENT!!!</strong> You succeed in going through all four corridors!</p><p>But don't celebrate yet; when you head for the door to leave the corridors once and for all, a man with a long beard stops you from your tracks!</p><p><strong>&quot;INTRUDAH!&quot;</strong> he shouts as he whips out his rifle.</p><p>The good news is, he puts his rifle down right when he sees you. Strange, huh?</p>"
  + choices(["Continue.", "s48()"])
  + "<div class='center'><p><span class='checkpoint'>CHECKPOINT!</span></p></div>";
  addScene(41);
  copyright.style.visibility = "hidden";
}

function s48() {
  titler.innerHTML = "The Corridors";
  main.innerHTML = "<p>&quot;Hmm...ya look innocent,&quot; he responds. &quot;I'll let ya through dis door if ya pass one of mah two games, Memory or Trivia.&quot;</p><p>This guy's offering a chance for you to escape the tower! What game do you play?</p>"
  + choices(
    ["Memory", "s51()"],
    ["Trivia", "s59()"],
    ["How do you play these games?", "s49()"],
    ["Forget about the games. Shoot this guy with your slingshot.", "s50()"]
  );
  addScene(42);
}

function s49() {
  titler.innerHTML = "How to Play Memory/Trivia";
  main.innerHTML = "<p>In <strong>Memory</strong>, the man will present you five of something. You will have to remember what these five things are and the order they show up.</p><p>When you're ready, the man will give you a quiz based on the five things, and you must get all the questions correct. If you don't, it's GAME OVER for you.</p><p>In <strong>Trivia</strong>, the man will give you five completely random questions, and you must answer them all correctly, or else it is a GAME OVER for you. All your answers must come from your own knowledge.</p><p>And don't even <em>think</em> about cheating on any of these games. You have been warned.</p>"
  + choices(["Understood.", "s48()"]);
  addScene(43);
}

function s50() {
  main.innerHTML = "<p>Well that was rude. It was also stupid as well. The slingshot is too weak to kill human beings. All you did is make the man angry.</p><p>&quot;So yer <strong><em>not</em></strong> innocent after all,&quot; he says. &quot;CURSE YA!!!&quot;</p><p>BAM! The man shoots you with his rifle, and you're dead. See ya!</p>"
  + gameOver();
  addScene(44);
}

function s51() {
  titler.innerHTML = "Memory Game";
  main.innerHTML = "<p>You decide to play Memory.</p><p>&quot;Alright den,&quot; the man says. &quot;Memorize da five things. Then I'll quiz ya on dem.&quot;</p><div class='center'><em>Da Five Things</em></div><br><div class='IEThing'><table style='margin:auto;background-color:#BBB7B9;border: 1px solid #7F7F7F;'><tr><td style='padding:6px 31px;'><span style='font-family:serif;'>Bee, Bo, Boo, Ba, Po</span></td></tr></table></div><p>&quot;And ya bettah not cheat!&quot; the man adds.</p>"
  + choices(["I am ready to go.", "s53()"]);
  addScene(45);
}

function s52() {
  main.innerHTML = "<p>&quot;Wrongity wrongity wrong!!&quot; shouts the man with the beard.</p><div class='center'><p><strong>&quot;U NO SMART. U DUMB. U R IDIOT!! ME KILL U!!!&quot;</strong></p></div><p>The man kills you with his rifle, which means...</p>"
  + gameOver();
  addScene(46);
}

function s53() {
  main.innerHTML = "<p>Ok. Let the quiz begin!</p><p>1. What's da 4th thing in da sequence?</p>"
  + choices(
    ["Bo", "s52()"],
    ["Po", "s52()"],
    ["Boo", "s52()"],
    ["Ba", "s54()"],
    ["Bee", "s52()"]
  );
  addScene(47);
}

function s54() {
  main.innerHTML = "<p>Correct. The man gives you the next question.</p><p>2. &quot;Boo&quot; is <em>when</em> in da sequence?</p>"
  + choices(
    ["1st", "s52()"],
    ["2nd", "s52()"],
    ["3rd", "s55()"],
    ["4th", "s52()"],
    ["5th", "s52()"]
  );
  addScene(48);
}

function s55() {
  main.innerHTML = "<p>Right on. The man provides you with another question.</p><p>3. Which of them things <em>AIN'T</em> in the sequence?</p>"
  + choices(
    ["Bee", "s52()"],
    ["Bah", "s56()"],
    ["Po", "s52()"],
    ["Bo", "s52()"],
    ["Boo", "s52()"]
  );
  addScene(49);
}

function s56() {
  main.innerHTML = "<p>You're getting it! The man now sees your intelligence, as he gives you the next question.</p><p>4. Da insect dat produces honey is <em>when</em> in da sequence?</p>"
  + choices(
    ["1st", "s57()"],
    ["2nd", "s52()"],
    ["3rd", "s52()"],
    ["4th", "s52()"],
    ["5th", "s52()"]
  );
  addScene(50);
}

function s57() {
  main.innerHTML = "<p>Almost done! You got it correct, and now it seems like the man is hoping you get this final question correct.</p><p>5. What's da 3rd and 2nd thing in da sequence, in dat order?</p>"
  + choices(
    ["Ba, Bo", "s52()"],
    ["Po, Bee", "s52()"],
    ["Bo, Boo", "s52()"],
    ["Boo, Bo", "s58()"],
    ["Bo, Ba", "s52()"]
  );
  addScene(51);
}

function s58() {
  main.innerHTML = "<p>&quot;Boo, Bo!&quot; you answer.</p><p>The man with the beard is amazed.</p><p>&quot;I can't believe it!&quot; the man says. &quot;Yer smart! Ya go through da door now!&quot;</p><p>The man steps out of the way for you to cross. Great job!</p><p>&quot;Across da door is an elevator,&quot; the man says. &quot;Get on it, and ya get to da bottah of da towah.&quot;</p>"
  + choices(["Go through the door.", "s71()"]);
  addScene(52);
}

function s59() {
  titler.innerHTML = "Trivia Game";
  main.innerHTML = "<p>You decide to play Trivia.</p><p>&quot;Alright den,&quot; the man says. &quot;Let's play da Trivia!&quot;</p><p>The first question is a test to prove you're not dumb.</p><p>1. Wat's 1+1?</p>"
  + choices(
    ["2", "s66()"],
    ["11", "s52()"],
    ["1+1", "s60()"],
    ["Window", "s52()"],
    ["I like pie.", "s62()"]
  );
  addScene(53);
}

function s60() {
  main.innerHTML = "<p>&quot;Very funny,&quot; the man replies, &quot;but I want ah <em>single number</em> answer.&quot;</p><p>Go again.</p>"
  + choices(
    ["2", "s66()"],
    ["11", "s52()"],
    ["1+1", "s61()"],
    ["Window", "s52()"],
    ["I like pie.", "s62()"]
  );
  addScene(54);
}

function s61() {
  main.innerHTML = "<p><strong>&quot;AHEM,&quot;</strong> shouts the man with the beard, <strong>&quot;I told ya, ah SINGLE NUMBER ANSWER!!!&quot;</strong></p><p>Before you can respond, the man shoots you with his rifle. You are dead.</p>"
  + gameOver();
  addScene(55);
}

function s62() {
  main.innerHTML = "<p>Look, I understand that you like pie, but do you <em>really</em> want this as your final answer?</p>"
  + choices(
    ["Yes, yes!", "s52()"],
    ["No, no!", "s65()"],
    ["Give me my pie.", "s63()"]
  );
  addScene(56);
}

function s63() {
  main.innerHTML = "<p>I don't have pie, okay? I just want to know whether or not this is your final answer. Answer me!</p>"
  + choices(
    ["Okay, sure.", "s52()"],
    ["LOL no.", "s65()"],
    ["ME WANT ME PIE NOW!!!!!", "s64()"]
  );
  addScene(57);
}

function s64() {
  main.innerHTML = "<p>(Sigh) Either you are in a pie craze or you just want to see what happens. Whatever the reason is, your little joke is going to end with a simple but powerful...</p>"
  + gameOver();
  addScene(58);
}

function s65() {
  main.innerHTML = "<p>Then what is your final answer?</p>"
  + choices(
    ["2", "s66()"],
    ["11", "s52()"],
    ["1+1", "s60()"],
    ["Window", "s52()"]
  );
  addScene(59);
}

function s66() {
  main.innerHTML = "<p>Correct. You're not dumb. Congratulations.</p><p>The man gives you the next question.</p><p>The second question is a test to prove you know about history.</p><p>2. Wat year did Christopher Columbus get to da North America?</p>"
  + choices(
    ["573 B.C.", "s52()"],
    ["1369 A.D.", "s52()"],
    ["1441 A.D.", "s52()"],
    ["1492 A.D.", "s67()"],
    ["1523 A.D.", "s52()"]
  );
  addScene(60);
}

function s67() {
  main.innerHTML = "<p>Keep it up! You know about history. The man lets you move on.</p><p>The third question is a test to prove you have grammar skills.</p><p>3. Wat punctuation mark do ya put on da blank of da following sentence:</p><p>Gimme two___thirds of ah pint ah milk!</p>"
  + choices(
    ["A slash (/)", "s52()"],
    ["A hyphen (-)", "s68()"],
    ["A space ( )", "s52()"],
    ["A comma (,)", "s52()"],
    ["Sir, this sentence has bad grammar.", "sirGrammar()"]
  );
  addScene(61);
}

function sirGrammar() {
  main.innerHTML = "<p>The man with the beard glowers at you.</p><p><strong>&quot;Er yea? WHER's MAH GRAMMAH MISTAKE?&quot;</p>"
  + choices(
    ["Gimme should be <em>Give me</em>, the two ah's should be <em>a</em> and <em>of</em> respectively.", "correctMansGrammar()"],
    ["On second thought, I take that back.", "s67()"]
  );
  addScene(62);
}

function correctMansGrammar() {
  main.innerHTML = "<p>The man with the beard unsettlingly ponders over your declaration. Is it true? Is the grammar of his livelihood actually a mess? Sweat pours over his body as he desperately resists the defeat of his own intelligence by a foreigner...</p><p><strong>&quot;AHA!&quot;</strong> he snickers. <strong>&quot;YA USED AH RUN-ON SENTENCE!!!&quot;</strong></p><p>You gulp as you realize you forgot to add the word <em>and</em> between your two independent clauses.</p><div class='center'><p><strong>&quot;U NO GOOD AT GRAMMAH. U FAIL TEST. ME NO TRUST U. ME KILL YOU!!&quot;</strong></p></div><p>The man kills you with his rifle, which means...</p>"
  + gameOver();
  addScene(63);
}

function s68() {
  main.innerHTML = "<p>Good one! You have grammar skills. The next question has arrived.</p><p>The fourth question is a test to prove you know about the elements.</p><p>4. Wat's da element name fer Sb?</p>"
  + choices(
    ["Subium", "s52()"],
    ["Antimony", "s69()"],
    ["Seaborgium", "s52()"],
    ["Tin", "s52()"],
    ["Arsenic", "s52()"]
  );
  addScene(64);
}

function s69() {
  main.innerHTML = "<p>Amazing! You know about the elements! Now for the final question.</p><p>The last question is a test to prove that you've been paying attention throughout this adventure.</p><p>5. Which chest did ya open to get da slingshot?</p>"
  + choices(
    ["Chest 1", "s52()"],
    ["Chest 2", "s70()"],
    ["Chest 3", "s52()"],
    ["Chest 467", "s52()"],
    ["The slingshot was not in a chest.", "s52()"]
  );
  addScene(65);
}

function s70() {
  main.innerHTML = "<p>&quot;Chest 2!&quot; you answer boldly.</p><p>The man with the beard is amazed.</p><p>&quot;Excellent, excellent!&quot; he exclaims. &quot;Ya truly are ah smart fella. Go through da door if ya wish.&quot;</p><p>The man steps out of the way for you to cross. Great job!</p><p>&quot;Across da door is an elevator,&quot; the man says. &quot;Get on it, and and ya get to da botta of da towah.&quot;</p>"
  + choices(["Go through the door.", "s71()"]);
  addScene(66);
}

function s71() {
  markCheckpoint(6);
  titler.innerHTML = "Outside the Elevator";
  main.innerHTML = "<p>You go through the door. The man with the beard was correct about there being an elevator. What he didn't tell you is that there are two different elevators. <em>Which elevator do you go into?</em></p>"
  + choices(
    ["The left elevator", "s72()"],
    ["The right elevator", "s73()"],
    ["Go back to see if the man can help you.", "s74()"]
  )
  + "<div class='center'><p><span class='checkpoint'>CHECKPOINT!</span></p></div>";
  addScene(67);
  copyright.style.visibility = "hidden";
}

function s72() {
  titler.innerHTML = "Left Elevator";
  main.innerHTML = "<p>You get on the left elevator. As you enter, you notice something very strange about the elevator you are in: there's no top (ceiling)!</p><p><em>Will you still go on this elevator?</em></p>"
  + choices(
    ["That looks fishy. I shall leave the elevator.", "s71()"],
    ["Push the button. We're going down anyway.", "s82()"]
  );
  addScene(68);
}

function s73() {
  titler.innerHTML = "Right Elevator";
  main.innerHTML = "<p>You get on the right elevator. When you enter, you immediately notice a horrible thing about the elevator you're in: there's no bottom (floor)!</p><p>It's too late. You tumble down and down the passageway of the elevator, feeling ashamed of yourself.</p><p>&quot;NOOOO!!!!&quot; you yell. &quot;I'm...&quot;</p><p>BOOM! You land on an electrical outlet, flat dead.</p>"
  + gameOver();
  addScene(69);
}

function s74() {
  titler.innerHTML = "The Corridors";
  main.innerHTML = "<p>You see if the man can help you on this challenge. As you open the door back to the corridors, you notice that the man with the beard has vanished! What gives?</p>"
  + choices(
    ["Go back.", "s71()"],
    ["Search for the man.", "s75()"]
  );
  addScene(70);
}

function s75() {
  main.innerHTML = "<p>You do not succeed at locating the man. Instead, you encounter some bad news. After failing to find the man all over the corridors, you find yourself back on the first corridor. This unfortunately means you have to traverse the corridors once again!</p>"
  + choices(["Dang it! Continue.", "s76()"]);
  addScene(71);
}

function s76() {
  markCheckpoint(7);
  titler.innerHTML = "The Corridors";
  main.innerHTML = "<p>Which corridor do you go through first?</p>"
  + choices(
    ["Corridor 1", "s78()"],
    ["Corridor 2", "s77()"]
  )
  + "<div class='center'><p><span class='checkpoint'>CHECKPOINT!</span></p></div>";
  addScene(72);
  copyright.style.visibility = "hidden";
}

function s77() {
  main.innerHTML = "<p>Looks like you forgot which corridors to go through, as you went the wrong way. The sensor at the dead end beams at you so you burn up to death. You are dead.</p>"
  + gameOver();
  addScene(73);
}

function s78() {
  main.innerHTML = "<p>Good. Now which corridor do you cross next?</p>"
  + choices(
    ["Corridor 1", "s77()"],
    ["Corridor 2", "s77()"],
    ["Corridor 3", "s79()"]
  );
  addScene(74);
}

function s79() {
  main.innerHTML = "<p>Great. Now which corridor do you cross next?</p>"
  + choices(
    ["Corridor 1", "s77()"],
    ["Corridor 2", "s80()"],
    ["Corridor 3", "s77()"],
    ["Corridor 4", "s77()"]
  );
  addScene(75);
}

function s80() {
  main.innerHTML = "<p>Excellent. Now which corridor do you cross next?</p>"
  + choices(
    ["Corridor 1", "s77()"],
    ["Corridor 2", "s77()"],
    ["Corridor 3", "s77()"],
    ["Corridor 4", "s81()"],
    ["Corridor 5", "s77()"]
  );
  addScene(76);
}

function s81() {
  main.innerHTML = "<p>Congratulations! You have traversed the corridors once again. You go through the door where the man made you play Memory or Trivia. Now you may continue the adventure from where you left off!</p>"
  + choices(["Glad that's over with. Let's resume.", "s71()"]);
  addScene(77);
}

function s82() {
  main.innerHTML = "<p>You press the button. Who cares about that nonexistent top of the elevator anyway?</p><p>The elevator moves down smoothly, and more smoothly, and even more smoothly, and...</p><p><strong>HALT!</strong></p><p>The elevator stops with a grinding halt. You are stuck! <em>What do you do?</em></p>"
  + choices(
    ["Yell for help.", "s83()"],
    ["Open the control panel of the elevator.", "s84()"],
    ["Do nothing.", "s85()"]
  );
  addScene(78);
}

function s83() {
  main.innerHTML = "<p>You yell for help. <strong>&quot;HELP!!&quot;</strong></p><p>Unfortunately, no one is able to hear you.</p>"
  + choices(
    ["(sigh) Open up that control panel then.", "s84()"],
    ["(sigh) Do nothing then.", "s85()"]
  );
  addScene(79);
}

function s84() {
  main.innerHTML = "<p>You open up the control panel.</p><p>By doing that, you find out what is wrong with the elevator: its battery no longer works!</p><p><em>What do you do?</em></p>"
  + choices(
    ["Fiddle around with the buttons of the control panel.", "s86()"],
    ["Attempt to remove the battery by hand.", "s87()"],
    ["Attempt to remove the battery by slingshot.", "s88()"]
  );
  addScene(80);
}

function s85() {
  main.innerHTML = "<p>You do nothing.</p><p>So here's what happens. You eventually get hungry and thirsty after a few hours, and since there's nothing in the elevator to help you with that, you subconsciously starve and dehydrate yourself.</p><p>Eventually, the hunger and thirst comes to a breaking point when eventually, you die.</p>"
  + gameOver();
  addScene(81);
}

function s86() {
  main.innerHTML = "<p>You fiddle around with the buttons of the control panel.</p><p>Well, that wasn't smart. You push so many buttons at once that eventually, you unknowingly press the red button, aka: the <em>Self-destruct</em> button.</p><p>The elevator goes...BOOM! You go...BOOM! You've now faced...DOOM!</p>"
  + gameOver();
  addScene(82);
}

function s87() {
  main.innerHTML = "<p>You try and try to remove the battery by hand, but it will not budge. Aw, man!</p>"
  + choices(
    ["Let's fiddle around with the buttons then.", "s86()"],
    ["Let's take this sucker out by slingshot then.", "s88()"]
  );
  addScene(83);
}

function s88() {
  main.innerHTML = "<p>There are two different ways to use the slingshot for this. <em>How so?</em></p>"
  + choices(
    ["Shoot it with a pellet.", "s89()"],
    ["Yank it out by using the sling.", "s90()"]
  );
  addScene(84);
}

function s89() {
  main.innerHTML = "<p>Shooting the battery with a pellet was a very bad idea. The battery breaks, and now you have no way to escape the elevator. You're doomed.</p>"
  + gameOver();
  addScene(85);
}

function s90() {
  markCheckpoint(8);
  titler.innerHTML = "Left Elevator";
  main.innerHTML = "<p>Y-Y-A-A-N-N-K-K-!-!</p><p>You did it! By using the sling of your slingshot, the battery slides off from the control panel.</p><p>After that, you look at the battery. There's a tiny label on it. It reads:</p><p class='IEThing'><table style='margin:auto;background-color:#E7E4E2;'><tr><td style='padding:6px;'><span style='font-family:\"arial narrow\", arial, sans-serif;'>Operates with any low viscosity fluid</span></td></tr></table></p><p><em>What do you do?</em></p>"
  + choices(
    ["Spit into the battery.", "s91()"],
    ["Injure yourself for blood to enter the battery.", "s92()"],
    ["What is viscosity?", "s93()"],
    ["Cry.", "s100()"]
  )
  + "<div class='center'><p><span class='checkpoint'>CHECKPOINT!</span></p></div>";
  addScene(86);
  copyright.style.visibility = "hidden";
}

function s91() {
  main.innerHTML = "<p>You spit into the battery. The battery now has a fluid in it. <em>Do you wish to put the battery into operation now?</em></p>"
  + choices(
    ["Yes.", "s95()"],
    ["No. Dump the spit and try something else.", "s90()"]
  );
  addScene(87);
}

function s92() {
  main.innerHTML = "<p>Before you injure yourself, let me ask you something. <em>Are you sure you really want to do this?</em></p>"
  + choices(
    ["Yes.", "s96()"],
    ["No.", "s90()"]
  );
  addScene(88);
}

function s93() {
  main.innerHTML = "<p>I can't tell you that. That would be <em>cheating</em>! And don't you dare look up the definition on a dictionary, or else!</p>"
  + choices(
    ["I hate you. Go back.", "s90()"],
    ["(Looks up the definition on the dictionary)", "s94()"]
  );
  addScene(89);
}

function s94() {
  main.innerHTML = "<p><span style='font-size:84pt;font-weight:700;display:block;text-align:center;'>&gt;:(</span></p>"
  + gameOver();
  addScene(90);
}

function s95() {
  main.innerHTML = "<p>You put the battery with the spit into the control panel and turn the battery on.</p><p>The bad news is, spit has an <em>abnormally high</em> viscosity. So as you sail down the elevator, it begins to shake and shake until...</p><p>ZAP!</p><p>Electrical waves start appearing all over the elevator, and when it hits you, you find yourself at a</p>"
  + gameOver();
  addScene(91);
}

function s96() {
  main.innerHTML = "<p><em>Where do you injure yourself then?</em></p>"
  + choices(
    ["The arm", "s97()"],
    ["The leg", "s98()"],
    ["The head", "s99()"]
  );
  addScene(92);
}

function s97() {
  main.innerHTML = "<p>You injure yourself in the arm.</p><p>Blood comes out of your arm. But unfortunately, not enough blood was able to enter the battery. Oh, well.</p>"
  + choices(
    ["Injure the leg then.", "s98()"],
    ["Injure the head then.", "s99()"],
    ["Try something else.", "s90()"]
  );
  addScene(93);
}

function s98() {
  main.innerHTML = "<p>You injure yourself in the leg.</p><p>Ouch!</p><p>Uh, oh. You've injured that leg so hard to the point you cannot move. To make matters worse, none of the blood makes it to the battery! Too bad.</p>"
  + gameOver();
  addScene(94);
}

function s99() {
  main.innerHTML = "<p>You injure yourself in the head.</p><p>That was so stupid! Now your brain hurts, and you cannot operate the way you should be operating! Before we get into any more nonsense, let's bring this over to a</p>"
  + gameOver();
  addScene(95);
}

function s100() {
  main.innerHTML = "<p>You cry because you don't know what to do. The sobs and tears of your crying eventually make its way over to the battery. You battery now has a fluid!</p><p><em>Do you wish to put the battery into operation now?</em></p>"
  + choices(
    ["Yes.", "s101()"],
    ["No. Dump the tears and try something else.", "s90()"]
  );
  addScene(96);
}

function s101() {
  main.innerHTML = "<p>You put the battery with the tears into the control panel and turn the battery on.</p><p>The good news is, tears have a viscosity low enough for the elevator to operate!</p><p>The elevator moves smoothly until it reaches the bottom of the tower. Great job!</p>"
  + choices(["Continue onward.", "s102()"])
  + "<p><strong>Note:</strong> No research was put into how elevators operate, so the following situation you just faced may not occur in reality.</p>";
  addScene(97);
}

function s102() {
  clearGameVars();
  markCheckpoint(9);
  titler.innerHTML = "Bottom of the Tower";
  main.innerHTML = "<p>You step outside the elevator to see a hallway with three doors. One of these doors is to the left, another is to the right, and the third door, aka: grand door, is at the end of the hallway. The grand door is the door to leave the tower. Also in the bottom floor is a strange looking floor.</p><p>Unfortunately, there are guards around the bottom of the tower, so escaping will not be easy.</p><p><em>So what do you do?</em></p>"
  + choices(
    ["Attempt to enter the left door.", "s103()"],
    ["Peek at what is inside the left door.", "s104(1)"],
    ["Attempt to enter the right door.", "s105()"],
    ["Peek at what is inside the right door.", "s106()"],
    ["Take a look at the strange floor.", "s107(1)"],
    ["Head on over to the grand door.", "s108()"]
  )
  + "<div class='center'><p><span class='checkpoint'>CHECKPOINT!</span></p></div>";
  addScene(98);
  copyright.style.visibility = "hidden";
}

function s103() {
  titler.innerHTML = "Guard Meeting Room";
  main.innerHTML = "<p>You manage to open the left door.</p><p>The left door leads to some sort of meeting room. Unfortunately, there are a whole bunch of guards in there!</p><p>&quot;Hey!&quot; says one of the guards. &quot;You're not a guard! We shall execute you now!&quot;</p><p>All the guards come with their guns, and they all shoot you until you are dead.</p>"
  + gameOver();
  addScene(99);
}

function s104(instance) {
  var condFunction1, condFunction2;
  if (instance === 1) {
    condFunction1 = "s102()";
    condFunction2 = "s103()";
  } else if (instance === 2) {
    condFunction1 = "s115()";
    condFunction2 = "s116()";
  } else {
    condFunction1 = "s121()";
    condFunction2 = "s126()";
  }
  main.innerHTML = "<p>You peek at what the left door contains. It looks like some sort of meeting room with a whole bunch of guards inside.</p>"
  + choices(
    ["Interesting. Go back.", condFunction1],
    ["Let's come on in.", condFunction2]
  );
  addScene(100);
}

function s105() {
  main.innerHTML = "<p>The right door is locked, but there are a set of numbers next to the handle. You can try to open the door by pressing a number, but do so at your own peril.</p><p class='IEThing'><table style='margin:auto;background-color:#CECFCB;border:1px solid #9E985C;'><tr><td style='padding:6px;'><span style='font-size:28pt;'><a onclick=s109()>1</a> | <a onclick=s109()>2</a> | <a onclick=s109()>3</a> | <a onclick=s109()>4</a> | <a onclick=s109()>5</a> | <a onclick=s109()>6</a> | <a onclick=s109()>7</a> | <a onclick=s110()>8</a> | <a onclick=s109()>9</a> | <a onclick=s109()>10</a></span></td></tr></table></p>"
  + choices(["Go back.", "s102()"]);
  addScene(101);
}

function s106() {
  main.innerHTML = "<p>But you can't do that, since there is no peep window on the right door!</p>"
  + choices(["Curses! Go back.", "s102()"]);
  addScene(102);
}

function s107(instance) {
  var condFunction;
  if (instance === 1) {
    condFunction = "s102()";
  } else if (instance === 2) {
    condFunction = "s115()";
  } else {
    condFunction = "s121()";
  }
  main.innerHTML = "<p>You take a look at the strange floor. It defnitely is strange. Here is what it looks like from top view.</p><p><table style='margin:auto;background-color:#AFA489;border:1px solid #766F4F;'><tr><td style='padding:11px;'><span style='font-size:28pt;font-family:times new roman;display:block;text-align:center;'>~*~<br>I ... II ... IV ... ___ ... XVI ... XXXII</span></td></tr></table></p>"
  + choices(["Go back.", condFunction]);
  addScene(103);
}

function s108() {
  main.innerHTML = "<p>You head on over to the grand door.</p><p>A guard by the door notices you and gets <strong>angry</strong> at you.</p><p>&quot;You are in <strong>huge</strong> trouble!!&quot; the guard says.</p><p>He shoots you until you are dead.</p>"
  + gameOver();
  addScene(104);
}

function s109() {
  main.innerHTML = "<p>You press a button to try to open the right door. A HUGE alarm goes off. The guards notice that, and they see you, so they shoot you off until you're dead. That ensures a simple but deadly</p>"
  + gameOver();
  addScene(105);
}

function s110() {
  main.innerHTML = "<p>You press the &quot;8&quot; button, As you do so, the right door unlocks, and you can now go inside!</p>"
  + choices(["Go inside the door.", "s111()"]);
  addScene(106);
}

function s111() {
  titler.innerHTML = "Storage Room";
  main.innerHTML = "<p>The door leads to a storage room that has tons of boxes. It looks like all the boxes are opened up with junk inside except for three boxes. One box is big, another is small, and the third is somewhere in between. <em>Which box do you open?</em></p>"
  + choices(
    ["The small box", "s112()"],
    ["The medium box", "s113()"],
    ["The big box", "s114()"]
  );
  addScene(107);
}

var smallbox = 0;
var bigbox = 0;

function s112() {
  smallbox = 1;
  main.innerHTML = "<p>You open the small box. Inside, you find a Guard Badge! You put the badge on.</p>";
  if (smallbox === 1 && bigbox === 1) {
    main.innerHTML += "<p>Now, with the guard badge and uniform, you look like a guard from the tower!</p>"
    + choices(
      ["Maybe I'll look even more like a guard if I open the medium box...", "s113()"],
      ["Leave the room.", "s121()"]
    );
  } else {
    main.innerHTML +=
    choices(
      ["I now want to open the medium box.", "s113()"],
      ["I now want to open the big box.", "s114()"],
      ["Leave the room.", "s115()"]
    );
  }
  addScene(108);
}

function s113() {
  main.innerHTML = "<p>You open the medium box. Inside, you find a gun! This can be incredibly useful somehow...</p><p>But then, a guard enters the storage room and sees you. He gets angry that you're fiddling around in here and shoots you. You try to shoot back, but your gun is not loaded! Sorry.</p>"
  + gameOver();
  addScene(109);
}

function s114() {
  bigbox = 1;
  main.innerHTML = "<p>You open the big box. Inside, you find a Guard Uniform! You put the uniform on.</p>";
  if (smallbox === 1 && bigbox === 1) {
    main.innerHTML += "<p>Now, with the guard badge and uniform, you look like a guard from the tower!</p>"
    + choices(
      ["Maybe I'll look even more like a guard if I open the medium box...", "s113()"],
      ["Leave the room.", "s121()"]
    );
  } else {
    main.innerHTML +=
    choices(
      ["I now want to open the small box.", "s112()"],
      ["I now want to open the medium box.", "s113()"],
      ["Leave the room.", "s115()"]
    );
  }
  addScene(110);
}

function s115() {
  titler.innerHTML = "Bottom of the Tower";
  main.innerHTML = "<p><em>Now what do you want to do?</em></p>"
  + choices(
    ["Attempt to enter the left door.", "s116()"],
    ["Peek at what is inside the left door.", "s104(2)"],
    ["Take a look at the strange floor.", "s107(2)"],
    ["Head on over to the grand door.", "s119()"],
    ["Head back to the storage room.", "s120()"]
  );
  addScene(111);
}

function s116() {
  titler.innerHTML = "Guard Meeting Room";
  main.innerHTML = "<p>You enter the left door. Inside is the guard meeting room. The guards aren't happy when they see you.</p><div id='guardsays'></div>"
  + choices(["Um, okay.", "s115()"]);
  if (smallbox === 1) {
    document.getElementById("guardsays").innerHTML = "<p>&quot;True guards don't wear just their badge!&quot; a guard says. &quot;Go back when you put on your uniform!&quot;</p><p>The guards escort you out of the room.</p>";
  }
  if (bigbox === 1) {
    document.getElementById("guardsays").innerHTML = "<p>&quot;True guards don't wear just their uniform!&quot; a guard says. &quot;Go back when you put on your badge!&quot;</p><p>The guards escort you out of the room.</p>";
  }
  addScene(112);
}

function s119() {
  main.innerHTML = "<p>You head on over to the grand door. The guard by the door sees you and gets <strong>angry</strong> at you.</p><div id='guardsays'></div>"
  + choices(["Um, okay.", "s115()"]);
  if (smallbox === 1) {
    document.getElementById("guardsays").innerHTML = "<p>&quot;A true guard wears their uniform!&quot; he yells. &quot;Now don't come back until that uniform is on!&quot;</p>";
  }
  if (bigbox === 1) {
    document.getElementById("guardsays").innerHTML = "<p>&quot;A true guard wears their badge!&quot; he yells. &quot;Now don't come back until that badge is on!&quot;</p>";
  }
  addScene(113);
}

function s120() {
  titler.innerHTML = "Storage Room";
  main.innerHTML = "<p>You head back to the storage room. Choose a box to open.</p>";
  if (smallbox === 1) {
    main.innerHTML +=
    choices(
      ["Open the medium box.", "s113()"],
      ["Open the big box.", "s114()"],
      ["Leave the storage room.", "s115()"]
    );
  }
  if (bigbox === 1) {
    main.innerHTML +=
    choices(
      ["Open the small box.", "s112()"],
      ["Open the medium box.", "s113()"],
      ["Leave the storage room.", "s115()"]
    );
  }
  addScene(114);
}

function s121() {
  clearGameVars();
  markCheckpoint(10);
  titler.innerHTML = "Bottom of the Tower";
  main.innerHTML = "<p><em>Now what do you want to do?</em></p>"
  + choices(
    ["Attempt to enter the left door.", "s126()"],
    ["Peek at what is inside the left door.", "s104(3)"],
    ["Take a look at the strange floor.", "s107(3)"],
    ["Head on over to the grand door.", "s138()"],
    ["Head back to the storage room.", "s122()"]
  )
  + "<div class='center'><p><span class='checkpoint'>CHECKPOINT!</span></p></div>";
  addScene(115);
  copyright.style.visibility = "hidden";
}

function s122() {
  titler.innerHTML = "Storage Room";
  main.innerHTML = "<p>What? Is there anything you missed?</p>"
  + choices(
    ["Open the medium box.", "s113()"],
    ["Leave the storage room.", "s121()"]
  );
  addScene(116);
}

function s126() {
  titler.innerHTML = "Guard Meeting Room";
  main.innerHTML = "<p>You enter the left door. Inside is the guard meeting room. Since you are wearing full uniform, the guards let you in.</p><p><em>What do you do in the room?</em></p>"
  + choices(
    ["Brew a cup of coffee with the coffee maker.", "s127(1)"],
    ["Take a look at the notice board.", "s128(1)"],
    ["Chat with a guard.", "s129()"],
    ["Sit on a lounge chair and relax.", "s135()"],
    ["Leave the room.", "s121()"]
  );
  addScene(117);
}

var coffeeCount = 0;
function s127(instance) {
  var condFunction;
  if (instance === 1) {
    condFunction = "s126()";
  } else {
    condFunction = "s133()";
  }
  var singleMultiple;
  var guardCommentary = "";
  coffeeCount += 1;
  if (coffeeCount === 1) {
    singleMultiple = "a";
  } else {
    singleMultiple = "another";
    if (coffeeCount === 3) {
      guardCommentary = "<p>&quot;You must really like that coffee,&quot; a guard says passing by.</p>";
    } else if (coffeeCount === 5) {
      guardCommentary = "<p>&quot;You ok, mate?&quot; another guard says. &quot;That's a LOT of coffee.&quot;</p>";
    } else if (coffeeCount === 8) {
      guardCommentary = "<p>You notice a few guards observing you from a distance.</p><p>&quot;How much more 'til this guard explodes?&quot; one of them mutters.</p>";
    } else if (coffeeCount === 11) {
      guardCommentary = "<p>Looks like you have a cult following, as several guards surround you in awe.</p><p>&quot;Someone, get da popcorn!&quot; a guard shouts.</p>";
    } else if (coffeeCount === 14) {
      guardCommentary = "<p>Every guard in the room's completely focused on you. All you hear are the sounds of popcorn.</p>";
    } else if (coffeeCount === 17) {
      condFunction = "seventeenCups()";
    }
  }
  main.innerHTML = "<p>You brew "+singleMultiple+" cup of coffee. Then you drink it. Ahh! That was one GREAT coffee!</p>" + guardCommentary
  + choices(["Go back.", condFunction]);
  addScene(118);
}

function seventeenCups() {
  main.innerHTML = "<p>Your 17th cup of coffee. Yup, that's it. After all, you <em>never</em> drink more than 17 cups of coffee on a given day.</p><p>Jaws drop as you triumphantly consume your final sip. Moments later, a rousing applause. Next thing you know, you're tossed in the air as guards wildly lob their popcorn as confetti.</p><p>All the commotion causes the kidnapper to barge in.</p>"
  + choices(["Continue.", "seventeenCups2()"]);
  addScene(119);
}

function seventeenCups2() {
  main.innerHTML = "<p>But the kidnapper doesn't reprimand you. Instead, his eyes glow like a child receiving a Christmas present.</p><p>&quot;So much caffeine! So awake! This guard's <strong>THE ONE</strong>!&quot; he squeals.<p>And so you're immediately hired as the tower's executive guard. Your salary's to die for, every guard loves you, and you get as much coffee to yourself as you'd like. All is well.</p>"
  + choices(["Continue.", "seventeenCups3()"]);
  addScene(120);
}

function seventeenCups3() {
  main.innerHTML = "<p>As great as this all is, you technically didn't escape the tower.</p><p>So unfortunately, you'll have to get a</p>"
  + gameOver();
  addScene(121);
}

function s128(instance) {
  var condFunction;
  if (instance === 1) {
    condFunction = "s126()";
  } else {
    condFunction = "s133()";
  }
  main.innerHTML = "<p class='IEThing'><table style='margin:auto;background-color:#EDDA70;border:1px solid #EDA93D;'><tr><td style='padding:6px;'><div style='color:#4195AE;font-family:arial;font-weight:700;'><div class='center' style='color:#FF6600;text-decoration:underline;'>NOTICE</div><ul><li>Remember that ALL GUARDS must wear their full uniform at all times while they're working. Anybody not obeying the rules will get kicked out of this room! NO EXCEPTIONS!</li><li>Remember that to leave the tower, you must show the guard your full uniform and insert the following code at the grand door: 7852</li><li>To open the door to the electrical room, insert the following code at the front: 3284</li><li>FREE coffee for all guards.</ul></div></td></tr></table></p>"
  + choices(["Go back.", condFunction]);
  addScene(122);
}

function s129() {
  main.innerHTML = "<p>You chat with a guard. The guard you talk to seems to be nice.</p><p>&quot;Hey there!&quot; he says. &quot;Name's Hugo. I'll give you a <em>secret</em> if you guess the side my coin lands on correctly.&quot;</p><p><em>Do you wish for a chance to hear the secret?</em></p>"
  + choices(
    ["You're on, Hugo!", "s130()"],
    ["Nah, no thanks.", "s126()"]
  );
  addScene(123);
}

function s130() {
  main.innerHTML = "<p>&quot;Okay,&quot; Hugo says. &quot;Heads or tails?&quot;</p>"
  + choices(
    ["Heads!", "s131()"],
    ["Tails!", "s132()"]
  );
  addScene(124);
}

function s131() {
  main.innerHTML = "<p>Hugo flips the coin. It lands on tails.</p><p>&quot;Sorry, but you lost,&quot; he says.</p>"
  + choices(["Well that stinks.", "s133()"]);
  addScene(125);
}

function s132() {
  main.innerHTML = "<p>Hugo flips the coin. It lands on tails. You win!</p><p>&quot;Ok, here's the secret,&quot; he says. &quot;Once you beat this game, <strong>click on the top-left corner of the main menu</strong>, and something cool will happen. Got that?&quot;</p>"
  + choices(["Gotcha.", "s133()"]);
  addScene(126);
}

function s133() {
  main.innerHTML = "<p><em>So what do you do now?</em></p>"
  + choices(
    ["Brew a cup of coffee with the coffee maker.", "s127(2)"],
    ["Take a look at the notice board.", "s128(2)"],
    ["Chat with a different guard.", "s134()"],
    ["Sit on a lounge chair and relax.", "s135()"],
    ["Leave the room.", "s121()"]
  );
  addScene(127);
}

function s134() {
  main.innerHTML = "<p>You chat with a different guard. This different guard does not seem to like you.</p><p>&quot;A real guard should not be socializing like this!&quot; he shouts. &quot;You must get to work now!&quot;</p><p>The guard then forces you to work on torturous activities, and since I'm too lazy to explain what really happens, I'll just give you a game over just because I want to.</p>"
  + gameOver();
  addScene(128);
}

function s135() {
  main.innerHTML = "<p>You sit at a lounge chair and relax. A guard spots you and tells you, &quot;That is not a way a guard acts! You are not a guard! Execute this person!&quot;</p><p>You are then executed, which means…</p>"
  + gameOver();
  addScene(129);
}

function s138() {
  main.innerHTML = "<p>You head on over to the grand door. The guard by the door sees you and approves your access to the grand door.</p><p>At the grand door, you see a giant number pad. In order to leave the tower, you must insert the correct code. <em>Are you ready to insert the number in?</em></p>"
  + choices(
    ["Yes I am.", "s139()"],
    ["No I am not.", "s121()"]
  );
  addScene(130);
}

function s139() {
  main.innerHTML = "<p>Enter the four numbers you think make the code.</p><div class='IEThing'><input id='pin' maxlength='4' type='text' style='margin:0 auto;display:block;text-align:center;font-size:24pt;width:100px;font-family:georgia;'></input><table style='margin:auto;background-color:#CECFCB;border:1px solid #9E985C;font-size:32pt;'><tr><td style='padding:8px 15px 3px 35px;'><a onclick=numpad(1)>1</a></td><td style='padding:8px 15px 3px 15px;'><a onclick=numpad(2)>2</a></td><td style='padding:8px 35px 3px 15px;'><a onclick=numpad(3)>3</a></td></tr><tr><td style='padding:3px 15px 3px 35px;'><a onclick=numpad(4)>4</a></td><td style='padding:3px 15px;'><a onclick=numpad(5)>5</a></td><td style='padding:3px 35px 3px 15px;'><a onclick=numpad(6)>6</a></td></tr><tr><td style='padding:3px 15px 3px 35px;'><a onclick=numpad(7)>7</a></td><td style='padding:3px 15px;'><a onclick=numpad(8)>8</a></td><td style='padding:3px 35px 3px 15px;'><a onclick=numpad(9)>9</a></td></tr><tr><td style='padding:3px 15px 8px 35px;'><a onclick=numpad(0)>0</a></td><td colspan='2'><a onclick='redo()' style='font-size:28pt;'>REDO</a></td></tr></table></div><div class='center' style='font-size:20pt;'><p style='margin:0.8em 0;'><a onclick=s140()>Enter code.</a></p></div>"
  + choices(["Go back.", "s121()"]);
  addScene(131);
}

function numpad(text) {
  if (document.getElementById('pin').value.length < 4) {
    document.getElementById('pin').value += text;
  }
}

function redo() {
  document.getElementById('pin').value = "";
}

function s140() {
  var x = document.getElementById("pin").value;
  if (x === "7852") {
    setTimeout(function () {
      titler.innerHTML = "Correct!";
      var endContinue;
      if (timerMode) {
        clearInterval(inTime);
        document.getElementById("restart").innerHTML = "";
        var pbOrNot = "";
        if (saveData.bestTime === null || currentTime < saveData.bestTime) {
          if ((currentTime < creatorTime) && (saveData.bestTime === null || saveData.bestTime > creatorTime)) {
            pbOrNot = "<p><strong>YOU BEAT THE GAME CREATOR!!!</strong></p>";
          } else {
            pbOrNot = "<p><strong>That's a new personal best!</strong></p>";
          }
          saveData.bestTime = currentTime;
          save();
        } else {
          endContinue = "<hr><p><a onclick='clearTimer()'>Continue.</a></p>";
        }
        endContinue = "<hr><p>Your time: "+secondsToDisplayedTime(currentTime)+"</p>"+pbOrNot+"<p><a onclick='clearTimer()'>Continue.</a></p>";
      } else {
        endContinue = "<p><a onclick='credits()'>Continue.</a></p>";
      }
      main.innerHTML = "<p>YEAH! Congratulations! The great, extraordinary grand door opens! Lights pop out, fresh air reveals itself, and best of all, <strong>you, yes you, can finally escape the tower!</strong></p><p>You step out the door in great delight, and when you see the fresh, green outdoors, you think to yourself, &quot;I did it! I did it with all I could!&quot;</p><p>And it's true. You officially win the game (that is, if you didn't cheat)!</p><div class='center'><p><span class='theend'>THE END!</span></p>"+endContinue+"</div>";
      addScene(132);
    }, 500);
  } else {
    setTimeout(function () {
      titler.innerHTML = "Wrong!";
      main.innerHTML = "<p>You entered the wrong number!</p><p>Alarms ring, cowbells shriek, and the guard that guards the grand door is <strong>SUPER ANGRY</strong> at you!</p><p><strong>&quot;YOU!&quot;</strong> he screams. <strong>&quot;YOU ARE NOT A TRUE GUARD!!!!!!! HOW DARE YOU TRY TO ESCAPE, PRISONER!!!!!!!&quot;</strong></p><p>BAM, BAM, BAM! With three shots taken, you are taken out and dead for good.</p>"
      + gameOver();
      addScene(133);
    }, 500);
  }
}

function credits() {
  var gameOverCountText = "";
  var singleplural;
  var bonusFeaturesText = "";
  if (!leaperMode) {
    if (saveData.counter === 1) {
      singleplural = "over";
    } else {
      singleplural = "overs";
    }
    gameOverCountText = "<p>You beat the game with " + saveData.counter + " game " + singleplural + ".</p>";
  }
  if (saveData.complete === 0) {
    bonusFeaturesText = "<hr><p>You've unlocked the <strong>Bonus Features</strong> for beating the game!</p>";
  }
  titler.innerHTML = "Credits";
  main.innerHTML = "<div class='center'><p><span style='font-size:20pt;'><span style='color:#184EC6;'>Escape</span> <span style='color:#9E8E5C;'>a</span> Tower</span></p><p><strong>Game Creator</strong><br><em>Timothy Hsu</em></p><p><strong>Software Used</strong><br><em>PowerPoint (v1.0-1.7)<br>Notepad/TextEdit (v2.0-2.1)<br>Notepad++ (v2.2-2.4.2)<br>Atom (v2.4.3+)<br>GitHub (v2.2+)</em></p><p><strong>Special Thanks</strong><br><em>My family<br>Jeremy Lee<br>Kaizad Taraporevala<br>Michael Wu<br>Make School</em></p><p>&copy;2010-2018 Timothy Hsu</p>"+gameOverCountText+bonusFeaturesText+"<p><a onclick='leaveGame()'>Main Menu</a></p></div>";
  markCheckpoint(0);
  saveData.complete = 1;
  save();
  clearGameVars();
  addScene(180);
}

function clearGameVars() {
  smallbox = 0;
  bigbox = 0;
  coffeeCount = 0;
}

function bonus() {
  titler.innerHTML = "Bonus Features";
  main.innerHTML = "<p>Select a bonus feature from here.</p><ul id='moveon'><li onclick='qa()'>Q&A</li><li onclick='gameLeaper()'>Game Leaper</li><li onclick='beatcreator()'>Beat the Creator</li><li onclick='gamequiz()'>Game Quiz</li><li onclick='boxart()'>Escape a Tower Box Art</li><li onclick='vhistory()'>Version History</li><li onclick='recgames()'>Recommended Games</li><li onclick='bonusEverywhere()'>Bonus Features Everywhere</li></ul><div class='center'><p><span id ='prologueselect'><a onclick='imdone()'>Main&nbsp;Menu</a></span></p></div>";
  copyright.style.visibility = "hidden";
  document.getElementById("theTime").innerHTML = "";
}

function qa() {
  titler.innerHTML = "Q&#38;A";
  main.innerHTML = "<p><strong>Q: What inspired you to make this game?</strong><p><p>A: It all started with the game <a href='http://www.neopets.com/' target='_blank'>Neopets</a>. On Neopets, users could create <a href='http://www.jellyneo.net/?go=adventure_generator' target='_blank'>Neoadventures</a>, text-based games that had choices, dead ends, and finish lines. As a kid who enjoyed writing stories, I was intrigued by this concept and created several neoadventures (before I deleted my Neopets account due to addiction).</p><p><strong>Q: Why did you make this game?</strong></p><p>A: One night at my grandparents' house, I felt the urge to write another neoadventure-like game. Since I no longer had my Neopets account, I cut some printer paper and created my new game using cards. Somehow, the first idea I had involved escaping a tower.</p><p>As I demoed the then-unnamed game, my mom suggested I remake the game on the computer. So I opened up Microsoft Word to complete the task. Along the way, I learned about hyperlinks, which let me click text to jump to other pages. That's when I thought, &quot;there has to be a better way to make this game than with Word.&quot; Naturally, I chose PowerPoint since I liked fullscreen and the ability to design the game with slides. I finished the first version of Escape a Tower by Thanksgiving 2010.</p><p><strong>Q: This game used to be on PowerPoint?</strong></p><p>A: Indeed it did. In fact, I created several PowerPoint games since this one. Who knew you could use PowerPoint beyond presentations?</p>In 2014, I converted Escape a Tower to the Web so people could play the game on their phones. I also added game over counting and save support, which would have been harder to implement on PowerPoint.<p>If you're curious, you can download the latest PowerPoint version <a href='https://timtree.github.io/download/escape-tower/?ver=1.7' target='_blank'>here</a>.</p><p><strong>Q: How long did it take to create this game?</strong></p><p>A: A LOT of time, and counting. While the original version from 2010 took about ten hours to create, I revised the game multiple times since. (Check out the version history to see for yourself.) Since I may update the game again, I could never give a definitive answer.</p><p><strong>Q: Will there ever be a sequel to Escape a Tower?</strong></p><p>A: Maybe. The planned sequel would be called <em>Journey to Home</em>, which is about navigating back home after escaping the tower. Problem is, I'm having trouble motivating myself to develop it. It's an extremely ambitious project, and there's a lot of obstacles I'll have to face with development. There's still hope though, so stay tuned.</p><p><strong>Q: I want to make a game like this. Any advice?</strong></p><p>A: Glad to hear that. Here are three tips you can keep in mind.</p><ul><li><strong>Keep the story simple.</strong> I'd rather jump straight to the action than have to think about what's going on.</li><li><strong>The shorter the paragraphs, the better.</strong> Who likes reading huge blocks of text? Break off longer paragraphs so it's easier to absorb the plot.</li><li><strong>Make it fun to lose.</strong> Losing may not be ideal, but funny text more than makes up for it. If done right, players will <em>want</em> to lose to get a good laugh.</li></ul><p><strong>Q: What else do you like to do other than make video games?</strong></p><p>A: I enjoy <em>playing</em> video games, as well as doodling, running, and cycling.</p><p><strong>Q: How can I give you feedback on this game?</strong></p><p>A: You can either let me know in person (if you know me) or you can post a comment on my <a href='https://www.gamesbytim.com/2011/08/escape-tower-more-info.html' target='_blank'>Website</a>. Thanks for your time to comment!</p><div class='center'><p><a onclick='bonus()'>Back to Bonus Features</a></p></div>";
}

var totalScenesSeen = 0;
function gameLeaper() {
  titler.innerHTML = "Game Leaper";
  var content;
  if (supportsIndexOf) {
    var scenes1Display = calculateGameLeaperScore(scenes1);
    var scenes2Display = calculateGameLeaperScore(scenes2);
    var scenes3Display = calculateGameLeaperScore(scenes3);
    var scenes4Display = calculateGameLeaperScore(scenes4);
    var scenes5Display = calculateGameLeaperScore(scenes5);
    var scenes6Display = calculateGameLeaperScore(scenes6);
    var scenes7Display = calculateGameLeaperScore(scenes7);
    var scenes8Display = calculateGameLeaperScore(scenes8);
    var scenes9Display = calculateGameLeaperScore(scenes9);
    var scenes10Display = calculateGameLeaperScore(scenes10);
    var scenes11Display = calculateGameLeaperScore(scenes11);
    var totalScenes;
    if (totalScenesSeen < totalSceneCount()) {
      totalScenes = "<p style='font-weight:700;font-size:150%;color:#808080;'>Total Scenes: "+totalScenesSeen+"/"+totalSceneCount()+"</p>";
    } else {
      totalScenes = "<p style='font-weight:700;font-size:150%;color:#008000;'>&#10003; Total Scenes: "+totalScenesSeen+"/"+totalSceneCount()+" &#10003;</p>";
    }
    content = "<ol id='moveon'><li onclick='enableLeapMode();s1()'>The Prison Cell "+scenes1Display+"</li><li onclick='enableLeapMode();s20()'>Staircase Area With Two Doors "+scenes2Display+"</li><li onclick='enableLeapMode();s29()'>Mysterious Library "+scenes3Display+"</li><li onclick='enableLeapMode();s42()'>The Corridors "+scenes4Display+"</li><li onclick='enableLeapMode();s47()'>Memory or Trivia "+scenes5Display+"</li><li onclick='enableLeapMode();s71()'>Outside the Elevator "+scenes6Display+"</li>"+scenes7Display+"<li onclick='enableLeapMode();s90()'>Left Elevator "+scenes8Display+"</li><li onclick='enableLeapMode();s102()'>Bottom of the Tower "+scenes9Display+"</li><li onclick='enableLeapMode();s121()'>Bottom of the Tower 2 "+scenes10Display+"</li>"+scenes11Display+"</ol><div class='center'>"+totalScenes+"</div>";
  } else {
    content = "<hr><p>Your browser doesn't support the Game Leaper.</p>"
  }
  main.innerHTML = "<p>Now that you've beaten Escape a Tower, you can leap back to any checkpoint you've reached. <strong>Try to find every scene in the game!</strong></p>"+content+"<div class='center'><p><a onclick='bonus()'>Back to Bonus Features</a></p></div>";
  totalScenesSeen = 0;
}

function calculateGameLeaperScore(sceneNum) {
  var score = 0;
  for (var i=0;i<sceneNum.length;i+=1) {
    if (saveData.seenScenes.indexOf(sceneNum[i]) > -1) {
      score+=1;
    }
  }
  totalScenesSeen+=score;
  if (sceneNum === scenes7) {
    if (score === 0) {
      return "<li style='cursor:auto;color:#000;'>???</li>"
    } else {
      if (score === sceneNum.length) {
        return "<li onclick='enableLeapMode();s76()'>The Corridors (again) "+"<span style='color:#008000;font-weight:700;'>("+score+"/"+sceneNum.length+")</span></li>";
      } else {
        return "<li onclick='enableLeapMode();s76()'>The Corridors (again) "+"<span style='color:#808080;font-weight:700;'>("+score+"/"+sceneNum.length+")</span></li>";
      }
    }
  }
  else if (sceneNum === scenes11) {
    if (score === 0) {
      return "<li style='cursor:auto;color:#000;'>???</li>"
    } else {
      if (score === sceneNum.length) {
        return "<li onclick='enableLeapMode();secret()'>The Secret Area "+"<span style='color:#008000;font-weight:700;'>("+score+"/"+sceneNum.length+")</span></li>";
      } else {
        return "<li onclick='enableLeapMode();secret()'>The Secret Area "+"<span style='color:#808080;font-weight:700;'>("+score+"/"+sceneNum.length+")</span></li>";
      }
    }
  }
  else if (score === sceneNum.length) {
    return "<span style='color:#008000;font-weight:700;'>("+score+"/"+sceneNum.length+")</span>";
  } else {
    return "<span style='color:#808080;font-weight:700;'>("+score+"/"+sceneNum.length+")</span>";
  }
}

function totalSceneCount() {
  return scenes1.length+scenes2.length+scenes3.length+scenes4.length+scenes5.length+scenes6.length+scenes7.length+scenes8.length+scenes9.length+scenes10.length+scenes11.length;
}

function enableLeapMode() {
  leaperMode = true;
  document.getElementById("leaper").style.display = "block";
  clearGameVars();
}

function disableLeapMode() {
  leaperMode = false;
  document.getElementById("leaper").style.display = "none";
  document.getElementById("checkmarker").innerHTML = "";
  clearGameVars();
}

function gamequiz() {
  titler.innerHTML = "Game Quiz";
  main.innerHTML = "<p>Questions related to the game will appear. When you think you have an answer, click on the Reveal the Answer button. There will be 6 questions.</p><ul id='moveon'><li onclick='playquiz()'>Play Game Quiz</li></ul><div class='center'><p><a onclick='bonus()'>Back to Bonus Features</a></p></div>";
}

function playquiz() {
  main.innerHTML = "<p>1. Where did you find the slingshot?</p><p><div id='answer'><a onclick='reveal1()'>Reveal the answer.</a></div></p>";
}

function reveal1() {
  document.getElementById("answer").innerHTML = "<p>Answer: Room of Chests</p><p><a onclick='playquiz2()'>Next Question</a></p>";
}

function playquiz2() {
  main.innerHTML = "<p>2. What is inside the top drawer at the prison cell?</p><p><div id='answer'><a onclick='reveal2()'>Reveal the answer.</a></div></p>";
}

function reveal2() {
  document.getElementById("answer").innerHTML = "<p>Answer: A poisonous snake</p><p><a onclick='playquiz3()'>Next Question</a></p>";
}

function playquiz3() {
  main.innerHTML = "<p>3. What special perk do guards get? (listed on notice board)</p><p><div id='answer'><a onclick='reveal3()'>Reveal the answer.</a></div></p>";
}

function reveal3() {
  document.getElementById("answer").innerHTML = "<p>Answer: Free coffee</p><p><a onclick='playquiz4()'>Next Question</a></p>";
}

function playquiz4() {
  main.innerHTML = "<p>4. What is the code to escape the tower?</p><p><div id='answer'><a onclick='reveal4()'>Reveal the answer.</a></div></p>";
}

function reveal4() {
  document.getElementById("answer").innerHTML = "<p>Answer: 7852</p><p><a onclick='playquiz5()'>Next Question</a></p>";
}

function playquiz5() {
  main.innerHTML = "<p>5. There are 2 ways to complete the prison cell section of the game. What are they?</p><p><div id='answer'><a onclick='reveal5()'>Reveal the answer.</a></div></p>";
}

function reveal5() {
  document.getElementById("answer").innerHTML = "<p>Answer: Eat the lunch the witch gives you OR escape the cell while the witch is heating up your lunch.</p><p><a onclick='playquiz6()'>Next Question</a></p>";
}

function playquiz6() {
  main.innerHTML = "<p>6. What happens if you read <em>The Solution to Everything?</em></p><p><div id='answer'><a onclick='reveal6()'>Reveal the answer.</a></div></p>";
}

function reveal6() {
  document.getElementById("answer").innerHTML = "<p>Answer: A shard of light beams out.</p><p><a onclick='bonus()'>Back to Bonus Features</a></p>";
}

function beatcreator() {
  titler.innerHTML = "Beat the Creator";
  var commentary = "<p><em>Can you beat this time?</em> If you can, go ahead and call yourself the true champion of this game. Give it a shot!</p>";
  var content;
  if (supportsTimer) {
    var yourPB = "";
    if (typeof saveData.bestTime === "number") {
      if (saveData.bestTime < creatorTime) {
        commentary = "<p>Wait, <em>you BEAT my time?!</em> Never have I been more jealous in my life...</p>";
        yourPB = "<div style='font-size:120%;margin-bottom:1em;'>Personal Best: <span style='font-weight:700;color:#008000;'>"+secondsToDisplayedTime(saveData.bestTime)+"</span></div>";
      } else {
        yourPB = "<div style='font-size:120%;margin-bottom:1em;'>Personal Best: "+secondsToDisplayedTime(saveData.bestTime)+"</div>";
      }
    }
    content = "<div class='center'><div style='font-weight:700;font-size:150%;margin:1em 0 0.5em 0;'><a onclick='startTimer()'>Start Game</a></div>"+yourPB+"</div>";
  } else {
    content = "<hr><p>Your browser doesn't support the built-in timer. You can still use a stopwatch with these guidelines.</p><li>Start the stopwatch when you click on New Game.</li><li>Stop the stopwatch as soon as you see The End.</li><li>Don't cheat. That means no Game Leaper, JavaScript Console, etc.</li><li>Good luck, and have fun.</li></ul>";
  }
  main.innerHTML = "<p>I, the creator, can beat Escape a Tower in just <strong>"+secondsToDisplayedTime(creatorTime)+".</strong></p>"+commentary+content+"<div class='center'><p><a onclick='bonus()'>Back to Bonus Features</a></p></div>";
  document.getElementById("theTime").innerHTML = secondsToTime(0);
}

var currentTime;
var inTime;
var offset;

function startTimer() {
  timerMode = true;
  document.getElementById("restart").innerHTML = "<a title='Restart' onclick='clearTimer();'>&#x21bb;</a> ";
  currentTime = 0;
  inTime = setInterval(stopwatch,100);
  offset = Date.now();
  prologue();
}

function clearTimer() {
  timerMode = false;
  clearInterval(inTime);
  currentTime = 0;
  document.getElementById("restart").innerHTML = "";
  clearGameVars();
  beatcreator();
}

function stopwatch() {
  currentTime = Math.round((currentTime + stopwatch2()/1000)*10)/10;
  document.getElementById("theTime").innerHTML = secondsToTime(currentTime);
}

function stopwatch2() {
  var now = Date.now(),
  d = now - offset;
  offset = now;
  return d;
}

function secondsToTime(totalSeconds) {
  var minutes = parseInt(totalSeconds/60);
  var seconds = (totalSeconds - 60 * minutes).toFixed(1);
  if (seconds < 10) {
    return minutes + ":0" + seconds;
  } else {
    return minutes + ":" + seconds;
  }
}

function secondsToDisplayedTime(totalSeconds) {
  if (totalSeconds > 60) {
    return secondsToTime(totalSeconds);
  } else {
    return totalSeconds.toFixed(1) + " seconds";
  }
}

function boxart() {
  titler.innerHTML = "Escape a Tower Box Art";
  main.innerHTML = "<p>For a college psychology class, I studied how video game box art can persuade people to purchase games. It turns out many games have different box art for American and Japanese audiences.</p><p>American box art tends to invoke action and aggression to stimulate people's minds (Barratt & GamesRadar Staff, 2013; Gaston, 2014). Japanese box art, on the other hand, usually focuses on artistic qualities (Carlson, 2014; Haske, 2014).</p><p>To illustrate this finding, I drafted potential box art for Escape a Tower. To the left, the American version, and to the right, the Japanese version.</p><div class='center'><p><img src='./assets/img/TowerBoxArtUS.png' alt='Escape a Tower box art American' style='width:47%;max-width:300px;margin-right:2%;'><img src='./assets/img/TowerBoxArtJP.png' alt='Escape a Tower box art Japanese' style='width:47%;max-width:300px;'></p></div><p>For the American box art, I added an evocative kidnapper and a determined protagonist to showcase action. For the Japanese box art, I emphasized the tower for artistic purposes. <em>Which box art do you prefer?</em></p><p><strong>Works Cited</strong></p><div style='font-size:75%;text-indent:-7%;margin-left:7%;overflow-wrap: break-word;'><p>Barratt, C., & GamesRadar Staff. (2013, August 02). Japanese box art that's a billion times better than ours. Retrieved from <a href='https://www.gamesradar.com/why-japanese-box-art-is-better/' target='_blank'>https://www.gamesradar.com/why-japanese-box-art-is-better/</a></p><p>Carlson, A. (2014, June 28). Video Game Box Art: America Is Getting Trounced By Japan. Retrieved from <a href='https://www.hardcoregamer.com/2014/06/28/video-game-box-art-america-is-getting-trounced-by-japan/91580/' target='_blank'>https://www.hardcoregamer.com/2014/06/28/video-game-box-art-america-is-getting-trounced-by-japan/91580/</a></p><p>Gaston, M. (2014, April 28). Why is Kirby always angry in the US? Nintendo explains. Retrieved from <a href='https://www.gamespot.com/articles/why-is-kirby-always-angry-in-the-us-nintendo-explains/1100-6419263/' target='_blank'>https://www.gamespot.com/articles/why-is-kirby-always-angry-in-the-us-nintendo-explains/1100-6419263/</a></p><p>Haske, S. (2014, February 01). The Coolest International Video Game Box Art. Retrieved from <a href='https://www.complex.com/pop-culture/2014/02/coolest-international-video-game-box-art/' target='_blank'>https://www.complex.com/pop-culture/2014/02/coolest-international-video-game-box-art/</a></p></div><p><div class='center'><p><a onclick='bonus()'>Back to Bonus Features</a></p></div>";
}

function recgames() {
  titler.innerHTML = "Recommended Games";
  main.innerHTML = "<p>If you liked Escape a Tower, consider playing the following games.</p><p><strong>Escape the Tower</strong></p><p>A game with (almost) the same exact name! <a href='http://www.gamershood.com/escape_the_tower.htm' target='_blank'>In this neat little Flash game</a>, you will need to rummage around a single room solving a complex puzzle in order to open the door.</p><p><strong>Visual novels</strong></p><p>Like this game, visual novels offer text-based storylines and difficult choices. Find out more on <a href='https://www.renpy.org' target='_blank'>renpy.org</a> and the <a href='https://www.reddit.com/r/visualnovels' target='_blank'>visual novels subreddit</a>.</p><p>I recommend playing <a href='https://hanakogames.com/magical_diary.shtml' target='_blank'>Magical Diary</a> and <a href='https://en.wikipedia.org/wiki/Ace_Attorney' target='_blank'>Phoenix Wright: Ace Attorney</a>.</p><p>Note: Some visual novels have adult content. Check the game's rating before you play!</p><p><strong>Choose Your Own Adventure books</strong></p><p><a href='https://www.cyoa.com' target='_blank'>These classic books</a> have plenty of endings and entertainment. If you find any at your library, give them a try!</p><p><strong>Dunnet</strong></p><p>If you're on a Mac, there's a text adventure game built in your OS. Type the following command in Terminal...</p><blockquote>emacs -batch -l dunnet</blockquote><p>...then go nuts.</p><div class='center'><p><a onclick='bonus()'>Back to Bonus Features</a></p></div>";
}

function bonusEverywhere() {
  titler.innerHTML = "Bonus Features Everywhere";
  main.innerHTML = "<div id='secretDemo'><div>Right here ->&nbsp;&nbsp;</div><div id='secretDemoShape'></div></div><p>Want to quickly unlock the bonus features on other browsers/devices?</p><p>On those browsers/devices, <strong>click the top-right corner of the main menu three times.</strong></p><div class='center'><p><a onclick='bonus()'>Back to Bonus Features</a></p></div>";
}

var isHugo;
function secret() {
  titler.innerHTML = "The Secret Area that No One Should Know About";
  copyright.style.visibility = "hidden";
  if (saveData.complete === 1) {
    main.innerHTML = "<p>&quot;<strong>WHAT?!</strong> You FOUND MY <strong>SECRET AREA?!</strong> HOW DARE YOU?! YOU ARE IN <strong>HUGE TROUBLE!!!</strong></p><p>&quot;How in the WORLD did you FIND THIS PLACE???&quot;</p>"
    + choices(
      ["A guard in the tower told me about it.", "secret9()"],
      ["I just randomly clicked and found it.", "secret2()"],
      ["I peeked at the source code.", "secret7()"],
      ["Um, I got to get out of this creepy place.", "leaveGame()"]
    );
    addScene(134);
  }
  else {
    main.innerHTML = "<p>&quot;Um, I'm still setting up this place. Come back here once you've completed the game at least once.&quot;</p>"
    + choices(["Er, ok...", "leaveGame()"]);
  }
}

function secret2() {
  main.innerHTML = "<p>&quot;Well, I admire your skills in random clicking, but <strong>YOU REALLY SHOULDN'T BE DOING THAT!!!</strong> WHY DID YOU DO THAT??!!&quot;</p>"
  + choices(
    ["It was an accident, really.", "secret3()"],
    ["<span style='font-size:10pt;'>I learned that there are people out there who love to put in secret things in their stuff, so I went and tried it everywhere and eventually found this finger pointing to some invisible link so I clicked on it and then you were barking at me, so now I'm telling the truth and you're still barking at me, so what in the world-Oh what in the world am I supposed to do? What am I supposed to do? I really want you to understand so I don't have to discuss this ridiculously long reason again and again and again and again and forever going until I eventually pass out and faint so I have to go to the hospital and a whole bunch of bad things happen and then I die and go to a graveyard that I really don't want to be in! GAAHHH! It hurts my brain so much by saying all that things!!!! Curse my horrible intelligence by saying it so long that even I didn't understand!</span>", "secret4()"]
  );
  addScene(135);
}

function secret3() {
  main.innerHTML = "<p>&quot;An ACCIDENT?&quot; (Looks at you directly in the eye) &quot;<strong>YOU'RE SMILING!</strong> I SAW THAT! YOU'RE GUILITY! I'M GONNA KICK YOU OUT!&quot;</p><p>To make a long story short, you get kicked out.</p>"
  + choices(["Back to main menu", "leaveGame()"]);
  addScene(136);
}

function secret4() {
  main.innerHTML = "<p>&quot;I don't CARE about all that <strong>LONG, NERDY TALK!</strong> GIVE ME A <em>LEGIT</em> REASON, <strong>NOW!!!</strong>&quot;</p>"
  + choices(
    ["In other words, I was curious.", "secret5()"],
    ["<span style='font-size:10pt;'>Well, if you wanted me to explain this reason simpler, I don't think I can do that. I am too used to saying things in this ridiculously small font that it would be a nightmare if I don't see the whole page filled up like madness, so that is why I have to say all this stuff in a long and long and random thing that sometimes, I don't know what the heck I am saying, so in order to restore my painful remorse, I jump up in the air three times in a row and breathe on my forehead until I'm filled with so much fresh-filled oxygen that I can inflate my way up to the sky and go to outer space and look at all the planets and breathe all my oxygen so that someday, I can be the first person to survive in space without an air tank, oh would that be awesome! I will be rich and famous and be crazy cool! Yee-haw! Woo-yeah! I am as happy as a fine goat lying in the valleys of a poor land of destiny! It definitely rocks. You should try it. Trust me, it feels as good as drinking juice. Juice is good.</span>", "secret6()"]
  );
  addScene(137);
}

function secret5() {
  main.innerHTML = "<p>&quot;Did you know that <strong>curiosity killed the cat?</strong> Well this time, <strong>CURIOSITY KILLED YOU!!!</strong>&quot;</p><p>The person gets a knife out, and you die.</p>"
  + choices(["Back to main menu", "leaveGame()"]);
  addScene(138);
}

function secret6() {
  main.innerHTML = "<p><span style='font-size:10pt;'>&quot;Your long and somewhat random and nerdy and boring and funny and unmethodical and hilarious and silly talk is really crazy and I think you should shut up before I cut your eyeballs out and throw them off the secret area and LOL at you like you are such a sucker! Seriously, why do you enjoy talking a lot? It must take skill to do so, because it is so long for everyone else to talk in such a tiny font. How on Earth do you do it? Was it from your family genes? How about alleles? Is it dominant or recessive? I need a Punnett square to find out! Please give me a Punnett square! Oh please, will you? It will be so nice for you to do so so that maybe I will get out my guilt and fly away to Unicorn Land! UNICORNS! They are cute and fluffy and so magical...I want to marry one someday! It will be so romantic, and then we have kids and those kids would look so weird and people laugh at me, but I am a brave person and I will overcome...</span></p><p>&quot;Wait a sec, <strong>I'M INFECTED!!!</strong>&quot;</p><p>To make a long story short, you get kicked out.</p>"
  + choices(["Back to main menu", "leaveGame()"]);
  addScene(139);
}

function secret7() {
  main.innerHTML = "<p>&quot;Really, <em>huh?</em> Well if you did that, you just did something HORRIBLE that I, yes I, consider to be the incorrigible, awful <strong>CHEATING!!! <em>GET OUT OF HERE!!!</em></strong>&quot;</p>"
  + choices(
    ["No way! (Shoot the person with your slingshot)", "secret8()"],
    ["Yeah, gotta go.", "leaveGame()"]
  );
  addScene(140);
}

function secret8() {
  main.innerHTML = "<p>&quot;OH, SO YOU REALLY THINK I WOULD DIE WITH A <strong>PUNY SLINGSHOT?!</strong> TAKE A LOOK AT WHAT <strong>I HAVE!!!</strong>&quot; (takes out a knife from the pocket)</p><p>To make a long story short, you die.</p>"
  + choices(["Back to main menu", "leaveGame()"]);
  addScene(141);
}

function secret9() {
  main.innerHTML = "<p>&quot;REALLY, huh? Well I don't BELIEVE that <strong>MUMBO JUMBO!!! YOU MUST BE LYING!!!</strong>&quot;</p>"
  + choices(
    ["No, I'm not! Go...go check for yourself!", "secretWho()"],
    ["I DID LIE! (cries) Please forgive me.", "secret10()"],
    ["Leave before anything else happens.", "leaveGame()"]
  );
  addScene(142);
}

function secret10() {
  main.innerHTML = "<p>(Stares at you) &quot;Oh, alright, <strong>CRY BABY</strong>, I forgive you. <strong>NOW GET OUT!</strong>&quot;</p>"
  + choices(
    ["Get out.", "leaveGame()"],
    ["Can I play with you?", "secret11()"]
  );
  addScene(143);
}

function secret11() {
  main.innerHTML = "<p>&quot;ABSOLUTELY NOT! <strong>NOW PLEASE GET OUT!</strong>&quot;</p>"
  + choices(
    ["Get out.", "leaveGame()"],
    ["But we can have fun! We can have a tea party, play hide-and-seek, have a pillow fight, and...", "secret12()"]
  );
  addScene(144);
}

function secret12() {
  main.innerHTML = "<p>&quot;<strong>OH THAT'S IT! I CAN'T TAKE THIS PAIN ANYMORE!!!</strong>&quot;</p><p>To make a long story short, you get kicked out.</p>"
  + choices(["Back to main menu", "leaveGame()"]);
  addScene(145);
}

function secretWho() {
  main.innerHTML = "<p>&quot;Hmmmm......&quot; (stares at you directly in the eyes) &quot;Well FINE! But <strong>WHICH GUARD TOLD YOU ABOUT THIS???</strong>&quot;</p>"
  + choices(
    ["Martha!", "secretMartha()"],
    ["Hugo!", "secretHugo()"],
    ["The man with the beard!", "secretManBeard()"]
  );
  addScene(146);
}

function secretMartha() {
  main.innerHTML = "<p>&quot;Heh heh...I know 100% you're lying...</p><p><strong>&quot;'CAUSE THERE AIN'T NO GUARD NAMED MARTHA!!!</strong>&quot;</p>"
  + choices(
    ["Aww man, you got me!", "secretMarthaAwwMan()"],
    ["Jokes on you, 'cause <em>AIN'T NO</em> really means <em>YES THERE IS</em>!", "secretMarthaAint()"]
  );
  addScene(147);
}

function secretMarthaAwwMan() {
  main.innerHTML = "<p>&quot;Ha, thought so!</p><p>&quot;Man, that felt <em>great</em>. <strong>I CAUGHT SOMEONE LYING RED-HANDED!!</strong> Oh I'm so AWESOME, I should be a <strong>LAWYER</strong> someday! Ah, the <em>money</em> I'd get for my <strong>sheer</strong> lie-checking <em>brilliance</em>! <strong><em>MONEY MONEH MONAY!!</em></strong> Hallelujah, <strong>HOLLYWOOD!!!</strong> ...&quot;</p>"
  + choices(["Leave before anything worse happens.", "leaveGame()"]);
  addScene(148);
}

function secretMarthaAint() {
  main.innerHTML = "<p>(groan) &quot;So you're one of <strong>THOSE PEOPLE</strong>...&quot;</p><p>To make a long story short, you get kicked out.</p>"
  + choices(["Back to main menu", "leaveGame()"]);
  addScene(149);
}

function secretHugo() {
  isHugo = true;
  main.innerHTML = "<p>&quot;<strong>Hugo</strong>, eh? Man, I can't <em>stand</em> that guy! <strong>I'M GONNA HUNT HUGO DOWN!!!</strong>&quot;</p><p>The person leaves the secret area to confront Hugo.</p>"
  + choices(["Continue.", "secret13()"]);
  addScene(150);
}

function secretManBeard() {
  isHugo = false;
  main.innerHTML = "<p>&quot;<strong>The man with the beard</strong>, eh? Yeah, there's <em>something</em> about that guy. <strong>I'M GONNA HUNT HIM DOWN!!!</strong>&quot;</p><p>The person leaves the secret area to confront the man with the beard.</p>"
  + choices(["Continue.", "secret13()"]);
  addScene(151);
}

function secret13() {
  var condFunction;
  if (isHugo) {
    condFunction = "secret30()";
  } else {
    condFunction = "secretManBeardAftermath()";
  }
  main.innerHTML = "<p>Now that you're alone, What do you do?</p>"
  + choices(
    ["Dance around the secret area like a maniac.", "secret14()"],
    ["Take a look inside the lone drawer.", "secret20()"],
    ["Scream, &quot;DON'T LEAVE! I LOVE YOU!&quot;", "secret24()"],
    ["Stay in the secret area silently and patiently.", condFunction]
  );
  addScene(152);
}

function secret14() {
  main.innerHTML = "<p>You bounce around, clap about, and squeal mindlessly to your heart's content. Everything feels good until...</p><p><strong>CRACK!</strong></p><p>Oh, snap. You pause what you're doing to investigate what happened. It turns out a vase broke from all that jiggling.</p><p>You're screwed. Or are you?</p>"
  + choices(
    ["Quickly gather all the pieces of the vase and hide them.", "secret15()"],
    ["Leave the broken vase be and hope for the best.", "secret16()"],
    ["Run away.", "secret17()"]
  );
  addScene(153);
}

function secret15() {
  main.innerHTML = "<p>You pick up any signs of the vase and hide the pieces in every pocket you have. As soon as you finish, the person comes back.</p><p>&quot;HEY, what happened to my VASE?&quot; (stares at you, notices your stuffed pockets) &quot;AHA! <strong>YOU STOLE IT! I THOUGHT I TRUSTED YOU! FEEL THE PAIN!</strong>&quot; (pulls out pocket knife)</p><p>To make a long story short, you die.</p>"
  + choices(["Back to main menu", "leaveGame()"]);
  addScene(154);
}

function secret16() {
  main.innerHTML = "<p>Eventually, the person returns.</p><p>&quot;Oh shoot, WHAT HAPPENED TO MY <strong>VASE??!!</strong>&quot; (stares blankly at you) &quot;<strong>IT'S ALL YOUR FAULT, IDIOT!!!</strong>&quot;</p><p>Before you can respond, the person kicks you out.</p>"
  + choices(["Back to main menu", "leaveGame()"]);
  addScene(155);
}

function secret17() {
  main.innerHTML = "<p>You try to escape the premises. Unfortunately, that's when the person returns.</p><p>&quot;Um, what are YOU trying to do? Are you <strong>hiding something?</strong>&quot;</p>"
  + choices(
    ["Yeah, I just broke your vase and now I'm trying to escape so I don't get in trouble, so...", "secret18()"],
    ["No...I, um, just realized I have, you know, other commitments.", "secret19()"]
  );
  addScene(156);
}

function secret18() {
  main.innerHTML = "<p>&quot;Well, at least you're being honest. But still, <strong>YOU BROKE MY VASE, IDIOT!!!</strong>&quot;</p><p>To make a long story short, you get kicked out.</p>"
  + choices(["Back to main menu", "leaveGame()"]);
  addScene(157);
}

function secret19() {
  main.innerHTML = "<p>&quot;<em>Really,</em> huh? <strong>Alright then.</strong>&quot;</p><p>The person lets you leave, and you escape. Let's just hope nothing bad happens once the person sees the broken vase, shall we?</p>"
  + choices(["Back to main menu", "leaveGame()"]);
  addScene(158);
}

function secret20() {
  main.innerHTML = "<p>You look inside the lone drawer. It's slightly opened.</p><p>Wow! There's a whole bunch of <em>personal things</em> in here, like a wallet, an ID card, pictures of the person doing embarrassing things, a piece of paper with the person's e-mail password written on it, and so many other things. Hmm...</p>"
  + choices(
    ["Take the wallet and go.", "secret21()"],
    ["Take the entire drawer and go.", "secret22()"],
    ["Close the drawer. That would be mean to take something.", "secret23()"]
  );
  addScene(159);
}

function secret21() {
  main.innerHTML = "<p>You take the wallet out of the drawer and flee the scene. Somehow, you manage not to get caught.</p><p>Once the coast is clear, you open up the wallet and find...25 cents. That's something, but <em>was this really the right thing to do?</em></p>"
  + choices(["Back to main menu", "leaveGame()"]);
  addScene(160);
}

function secret22() {
  main.innerHTML = "<p>You take the entire drawer and leave.</p><p>Right as you take the drawer out, the person comes back. Uh, oh.</p><p>&quot;<strong>WHAT ARE YOU DOING INTRUDING MY BELONGINGS? I LEAVE AND NOW THIS HAPPENS?! GET OUT!</strong>&quot;</p><p>To make a long story short, you get kicked out.</p>"
  + choices(["Back to main menu", "leaveGame()"]);
  addScene(161);
}

function secret23() {
  main.innerHTML = "<p>You close the drawer. You are right about the mean thing anyways.</p><p>The person comes back and notices the drawer that has been closed.</p><p>&quot;<strong>HEY! I DON'T REMEMBER MY DRAWER BEING <em>COMPLETELY</em> CLOSED! GET OUT!!!</strong>&quot;</p>"
  + choices(["Get out before things get worse.", "leaveGame()"]);
  addScene(162);
}

function secret24() {
  main.innerHTML = "<p>You hear the person running back to the secret area.</p><p>&quot;<strong>I AM BUSY RIGHT NOW! PLEASE SHUT UP!!!</strong>&quot;</p>"
  + choices(
    ["But I love you so much!", "secret25()"],
    ["Perhaps I should leave now.", "leaveGame()"]
  );
  addScene(163);
}

function secret25() {
  main.innerHTML = "<p>&quot;What? REALLY? You <em>REALLY LOVE ME?</em>&quot;</p>"
  + choices(
    ["Of course I do! Let's go on a date.", "secret27()"],
    ["Just kidding! Obviously not!", "secret26()"]
  );
  addScene(164);
}

function secret26() {
  main.innerHTML = "<p>&quot;YOU KNOW HOW MUCH I HATE YOU? <strong>I just want to kill you...NOW!!!</strong>&quot;</p><p>To make a long story short, you die when the knife is taken out.</p>"
  + choices(["Back to main menu", "leaveGame()"]);
  addScene(165);
}

function secret27() {
  var whichGuard;
  if (isHugo) {
    whichGuard = "Hugo";
  } else {
    whichGuard = "the man with the beard";
  }
  main.innerHTML = "<p>&quot;A date? Well, I'm going to talk to "+whichGuard+" about the situation regarding you entering this place. Can't do it right now.&quot;</p>"
  + choices(
    ["Oh, come on! We'll have a great time! Forget about "+whichGuard+".", "secret28()"],
    ["Fine. I hate you then.", "secret29()"]
  );
  addScene(166);
}

function secret28() {
  var whichGuard;
  if (isHugo) {
    whichGuard = "Hugo";
  } else {
    whichGuard = "the man with the beard";
  }
  main.innerHTML = "<p>&quot;But I can't forget about "+whichGuard+", and you know what? You shouldn't be <strong>PEER-PRESSURING</strong> me to do things either. <strong>GET OUT!</strong>&quot;</p><p>You get kicked out.</p>"
  + choices(["Back to main menu", "leaveGame()"]);
  addScene(167);
}

function secret29() {
  main.innerHTML = "<p>&quot;If you hate me, then you really should GET OUT OF MY SECRET AREA.&quot;</p><p>You head on out, feeling indifferent.</p>"
  + choices(["Back to main menu", "leaveGame()"]);
  addScene(168);
}

function secret30() {
  main.innerHTML = "<p>It is nice that you are waiting patiently for the person to come back. The person comes back.</p><p>&quot;Yup, Hugo confessed. Had to give him <em>the talk</em> as well, but I think he understands not to mention this place again. <em>Sorry for yelling at you.</em></p><p>&quot;Anyway, this is my secret place, and I want my privacy here. Can you please leave now?&quot;</p>"
  + choices(
    ["Leave the secret area. Let's respect the person.", "leaveGame()"],
    ["Nope, because I am evil.", "secret31()"]
  );
  addScene(169);
}

function secretManBeardAftermath() {
  main.innerHTML = "<p>It is nice that you are waiting patiently for the person to come back. The person comes back.</p><p>&quot;Ugh, I couldn't <em>find</em> the man with the beard! That guy <em>really</em> is <strong>something</strong>...</p><p>&quot;Anyway, <strong>you're off the hook</strong>. But this IS my secret place, and I want my privacy here. Can you please leave now?&quot;</p>"
  + choices(
    ["Leave the secret area. Let's respect the person.", "leaveGame()"],
    ["Nope, because I am evil.", "secret31()"]
  );
  addScene(170);
}

function secret31() {
  main.innerHTML = "<p>&quot;<strong>Well, you're leaving anyway!</strong>&quot;</p><p>You get kicked out by the person without further notice.</p>"
  + choices(["Back to main menu", "leaveGame()"]);
  addScene(171);
}

function leaveGame() {
  if (leaperMode) {
    disableLeapMode();
    gameLeaper();
  } else {
    imdone();
  }
}

function imdone() {
  document.getElementById("titleHeader").style.display = "block";
  document.getElementById("topHeader").style.display = "none";
  main.innerHTML = "<div id='secret' onclick='changeEnclosure();secret()'></div><div id='secret2' onclick='autoComplete()'></div><div class='center'><p style='margin-bottom:0.7em;'><span style='font-size:24pt;'><span style='color:#C95000;'>An <span style='color:#00A000;'><strong>Adventure Game</strong></span> by</span></span></p><p style='margin-top:0.7em;'><span style='color:#660066;font-family:verdana,\"DejaVu Sans\",sans-serif;font-size:24pt;'>Timothy Hsu</span></p><div id='em'><div id='titleselect'></div><div id='bonusfeatures'></div></div></div>";
  copyright.style.visibility = "visible";
  loadit();
}
