function bytesToJson(bytes) {
	const intArr = new Uint8Array(bytes);
	var unparsedString = "";
	
	for (const i of intArr) {
		unparsedString += String.fromCharCode(i);
	}
	
	const parsedJson = JSON.parse(unparsedString);
	return parsedJson;
}

// Used to obtain device and connection IDs
chrome.webRequest.onBeforeRequest.addListener(function(details) {
	if (details.url.endsWith("spclient.spotify.com/track-playback/v1/devices")) {
		const data = bytesToJson(details.requestBody.raw[0].bytes);
		const deviceId = data.device.device_id;
		const connectionId = data.connection_id;
		
		chrome.tabs.query({url: "https://open.spotify.com/*"}, function(tabs) {
			for (const tab of tabs) {
				chrome.tabs.sendMessage(tab.id, {deviceId: deviceId, connectionId: connectionId});
			}
		});
	}
}, { urls: ["<all_urls>"] }, ["requestBody"]);
