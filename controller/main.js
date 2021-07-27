let elements = {};
let checkboxes = {};

let messages = {};
let lastMessageId = 0;
const requestDelay = 200;

function init() {
	elements = {
		'nameInput': document.querySelector(".name-input"),
		'chatInput': document.querySelector(".chat-input"),
		'chatHiddenInput': document.querySelector(".chat-input-hidden"),
		'chat': document.querySelector(".chat"),
		'messages': document.querySelector(".messages")
	};

	checkboxes = {
		'screen': {
			'nameInput': document.querySelector("#screen-name-input-radio"),
			'chat': document.querySelector("#screen-chat-radio")
		}
	};

	initEvents();
	resize();
	getMessages();
}

function initEvents() {
	elements.nameInput.onkeydown = async (event) => {
		if (event.keyCode == 13) {
			const name = elements.nameInput.value;
			const result = await request("setName", {'username': name});

			if (result)
				checkboxes.screen.chat.checked = true;
        }   
	};

	elements.chatInput.onkeydown = (event) => {
		if (event.keyCode == 13 && !event.shiftKey) {
			event.preventDefault();

			let message = elements.chatInput.value;
			message = encodeURIComponent(message);

			elements.chatInput.value = "";
			setInputHeight(elements.chatInput, elements.chatHiddenInput, elements.chat);

			request("newMessage", {'message': message});
        }   
	};
}

function resize() {
	if (elements)
		setInputHeight(elements.chatInput, elements.chatHiddenInput, elements.chat);
}

async function getMessages(from=null, to=null) {
	const newMessages = await request("getMessages", {'from': from, 'to': to});

	for (let id in newMessages) {
		messages[id] = newMessages[id];
		displayMessage(messages[id], elements.messages);

		lastMessageId = Math.max(lastMessageId, id);
	}

	setTimeout(() => {
		getMessages(lastMessageId + 1);
	}, requestDelay);
}

async function request(func, params=null) {
	let data = `func=${func}`;

	if (params) {
		for (param in params) {
			const value = params[param];
			data += `&${param}=${value}`;
		}
	}

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"
		},
		body: data
	}

	const response = await fetch("model/server.php", options);
	const result = await response.json();

	return result;
}