function getQueueSongs() {
	const queueList = document.querySelector('[aria-label="Next in queue"]');

	if (queueList) {
		return queueList.firstChild.children[1];
	}

	return null;
}

function getNextSongs() {
	const nextList = document.querySelector('[aria-label="Next up"], [aria-label^="Next from"]');

	if (nextList) {
		return nextList.firstChild.children[1];
	}

	return null;
}
