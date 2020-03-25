window.onload = initAll;

var cells = [
    "Hi, who just joined?",
    "Can you email that to everyone?",
    "Uh, _, you're still sharing your screen...",
    "Sorry guys, I've got to jump to another call",
    "*sound of someone typing furiously*",
    "_ you're on mute",
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
	checkWin();
}

function checkWin() {
    var setSquares = 0;
    var winningSquares = 0;
    var winners = [
        2**0|2**5|2**10|2**14|2**19,//row 0
        2**1|2**6|2**11|2**15|2**20,//row 1
        2**2|2**7|2**24|2**16|2**21,//row 2
        2**3|2**8|2**12|2**17|2**22,//row 3
        2**4|2**9|2**13|2**18|2**23,//row 4
        2**0|2**1|2**2|2**3|2**4,//col 0
        2**5|2**6|2**7|2**8|2**9,//col 1
        2**10|2**11|2**24|2**12|2**13,//col 2
        2**14|2**15|2**16|2**17|2**18,//col 3
        2**19|2**20|2**21|2**22|2**23,//col 4
        2**0|2**6|2**24|2**17|2**23,//diag 0
        2**19|2**15|2**24|2**8|2**4,//diag 1
    ]

	for (var i=0; i<25; i++) {
		var currSquare = "square" + i;
		if (document.getElementById(currSquare).classList.contains("active")) {
			setSquares = setSquares | 2 ** i;
		}
	}

	for (var i=0; i<winners.length; i++) {
		if ((winners[i] & setSquares) == winners[i]) {
            winningSquares = winningSquares | winners[i];
		}
	}
	
    for (var i=0; i<25; i++) {
        currSquare = "square" + i;
        if (winningSquares & Math.pow(2,i)) {
            document.getElementById(currSquare).classList.add("winningBG");
        } else {
            document.getElementById(currSquare).classList.remove("winningBG");
        }
    }
};