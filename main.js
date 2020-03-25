window.onload = initAll;

var cells = [
    // People in call
    "Hi, who just joined?",
    "Is _ on the call?",
    "Did _ leave the call?",
    // Screen sharing
    "Can everyone see my screen?",
    "Uh, _, you're still sharing your screen...",
    // Noise pollution
    "*sound of someone typing furiously*",
    "*super loud echo or feedback*",
    "*crying baby or barking dog*",
    "*ambulance or fire truck in the background",
    // Background items
    "What's that _ behind you?",
    "*someone shows their cat/dog*",
    // Mute issues
    "_ I think you're on mute, we can't hear you",
    "Sorry, I was on mute",
    "Can everyone go on mute?",
    // Quality issues
    "You cut out, can you repeat that?",
    "Sorry, can you hear me now?",
    "Your video is frozen",
    "I disconnected",
    "I'm going to try re-entering the call",
    // The leavers
    "I have to leave at _",
    "Sorry I have to hop off, you guys keep talking",
    // Awkward stuff
    "*small talk while waiting for last person*",
    "*awkward silence waiting for next person to speak*",
    // Latency issues
    "After interrupting each other: Sorry you go first",
    "I think there's some lag",
    "Sorry, go ahead",
    // Misc
    "Sorry I'm late",
    "I'll have to get back to you",
    "Can you post that in the chat/email it to everyone?",
    "I'll give it a couple more minutes before starting",
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
    document.getElementById("square24").classList.remove("winningBG");
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
        2**0|2**5|2**10|2**14|2**19,  //row 0
        2**1|2**6|2**11|2**15|2**20,  //row 1
        2**2|2**7|2**24|2**16|2**21,  //row 2
        2**3|2**8|2**12|2**17|2**22,  //row 3
        2**4|2**9|2**13|2**18|2**23,  //row 4
        2**0|2**1|2**2|2**3|2**4,     //col 0
        2**5|2**6|2**7|2**8|2**9,     //col 1
        2**10|2**11|2**24|2**12|2**13,//col 2
        2**14|2**15|2**16|2**17|2**18,//col 3
        2**19|2**20|2**21|2**22|2**23,//col 4
        2**0|2**6|2**24|2**17|2**23,  //diag 0
        2**19|2**15|2**24|2**8|2**4,  //diag 1
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