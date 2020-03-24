window.onload = initAll;

var cells = [
    "Hi, who just joined?",
    "Can you email that to everyone?",
    "_ you're on mute",
    "Uh, _, you're still sharing your screen...",
    "Sorry guys, I've got to jump to another call",
    "*sound of someone typing furiously*",
    "Sorry, I was on mute",
    "Is _ on the call?",
    "Can everyone go on mute?",
    "*super loud echo or feedback*",
    "Sorry, go ahead",
    "Sorry I'm late",
    "I'm sorry you cut out there",
    "Can we take this offline?",
    "I'll have to get back to you",
    "Can everyone see my screen?",
    "*crying baby or barking dog*",
    "I think there's some lag",
    "You cut out, can you repeat that?",
    "I think _ left the call",
    "Can you post that in the chat?",
    "Can you guys hear me?",
    "Is that your _ in the background?",
    "Your video is frozen",
    "*someone touches face*",
    "I disconnected",
    "I have to leave at _",
    "_ you go first",
];

function initAll() {
	document.getElementById("reload").onclick = newCard;
	newCard();
}

function newCard() {
    shuffle(cells);
	for (var i=0; i<24; i++) {
		setSquare(i);
	}
}

// Shuffles array in place
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function setSquare(thisSquare) {
	var currSquare = "square" + thisSquare;
    document.getElementById(currSquare).innerHTML = cells[thisSquare];
    document.getElementById(currSquare).classList.remove("active");
    document.getElementById(currSquare).onmousedown = toggleColor;
}

function toggleColor(evt) {
	if (evt) {
		var thisSquare = evt.target;
	} else {
		var thisSquare = window.event.srcElement;
	}
    thisSquare.classList.toggle("active");
	//checkWin();
}

function checkWin() {
	var winningOption = -1;
	var setSquares = 0;
	var winners = new Array(31,992,15360,507904,541729,557328,1083458,2162820,4329736,8519745,8659472,16252928);

	for (var i=0; i<24; i++) {
		var currSquare = "square" + i;
		if (document.getElementById(currSquare).className != "") {
			document.getElementById(currSquare).className = "pickedBG";
			setSquares = setSquares | Math.pow(2,i);
		}
	}

	for (var i=0; i<winners.length; i++) {
		if ((winners[i] & setSquares) == winners[i]) {
			winningOption = i;
		}
	}
	
	if (winningOption > -1) {
		for (var i=0; i<24; i++) {
			if (winners[winningOption] & Math.pow(2,i)) {
				currSquare = "square" + i;
				document.getElementById(currSquare).className = "winningBG";
			}
		}
	}
};