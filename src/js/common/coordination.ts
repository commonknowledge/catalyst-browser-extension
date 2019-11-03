// cb must return "true" if response is async.
export const onExtensionMessage = (message: Message['action'], cb: (request: Message, sender, sendResponse)) => {
    chrome.runtime.onMessage.addListener(
      (request: Message, sender, sendResponse) => {
        if (request.action === message) {
            return cb(request, sender, sendResponse)
        }
      }
    );
}

export const sendExtensionMessage = (message: Message) => {
  return chrome.runtime.sendMessage(message);
}