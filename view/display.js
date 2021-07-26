function displayMessage(message, element) {
	let datetime = new Date( message['dt'] );
	const timeZone = -(new Date() ).getTimezoneOffset() / 60;
	datetime.setHours(datetime.getHours() + timeZone);

	const time = datetime.toLocaleString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	});

	let messageUsernameElem = document.createElement("div");
	messageUsernameElem.classList.add("message-data-username");
	messageUsernameElem.innerHTML = message.username;

	let messageDatetimeElem = document.createElement("div");
	messageDatetimeElem.classList.add("message-data-time");
	messageDatetimeElem.innerText = time;

	let messageDataElem = document.createElement("div");
	messageDataElem.classList.add("message-data");
	messageDataElem.appendChild(messageUsernameElem);
	messageDataElem.appendChild(messageDatetimeElem);

	let messageTextElem = document.createElement("div");
	messageTextElem.classList.add("message-text");
	messageTextElem.innerHTML = message.msg;

	let messageElem = document.createElement("div");
	messageElem.classList.add("message");
	messageElem.appendChild(messageDataElem);
	messageElem.appendChild(messageTextElem);

	element.insertBefore(messageElem, element.firstChild);
	element.scrollTop = element.scrollHeight;
}

function setInputHeight(inputElem, inputHiddenElement, chatElem) {
	inputHiddenElement.style.width = chatElem.clientWidth - 32 + "px";

	const text = inputElem.value;
	inputHiddenElement.innerHTML = text;

	//take into account the width of the scrollbar
	if (inputHiddenElement.clientHeight > chatElem.clientHeight * 0.2) {
		inputHiddenElement.style.width = chatElem.clientWidth - 52 + "px";
		inputElem.style.overflowY = "scroll";
	} else
		inputElem.style.overflowY = "hidden";

	let lines = Math.round(inputHiddenElement.clientHeight / 28);

	if (text.slice(-1) == '\n')
		lines++;

	inputElem.style.height = lines * 28 + "px";
	inputElem.scrollTop = inputElem.scrollHeight;
}