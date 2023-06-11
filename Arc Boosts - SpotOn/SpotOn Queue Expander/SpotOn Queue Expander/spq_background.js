function bytesToJson(bytes) {
  const byteArray = new Uint8Array(bytes);
  let jsonString = "";
  
  for (const byte of byteArray) {
    jsonString += String.fromCharCode(byte);
  }
  
  let parsedJson;
  try {
    parsedJson = JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
  
  return parsedJson;
}

function sendDeviceAndConnectionIds(deviceId, connectionId) {
  chrome.tabs.query({ url: "https://open.spotify.com/*" }, function(tabs) {
    for (const tab of tabs) {
      chrome.tabs.sendMessage(tab.id, { deviceId: deviceId, connectionId: connectionId });
    }
  });
}

chrome.webRequest.onBeforeRequest.addListener(function(details) {
  if (details.url.endsWith("spclient.spotify.com/track-playback/v1/devices")) {
    const data = bytesToJson(details.requestBody.raw[0].bytes);
    if (data) {
      const deviceId = data.device.device_id;
      const connectionId = data.connection_id;
      sendDeviceAndConnectionIds(deviceId, connectionId);
    }
  }
}, { urls: ["<all_urls>"] }, ["requestBody"]);
