export function getActiveTab(): Promise<false | chrome.tabs.Tab> {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      if (!tabs.length) return resolve(false);
      return resolve(tabs[0]);
    });
  });
}

export async function getActiveURL(): Promise<false | URL> {
  const tab = await getActiveTab();
  return tab ? new URL(tab.url) : false;
}

// cb must return "true" if response is async.
export const onExtensionMessage = (
  actionKey: Message["action"],
  cb: (
    request: Message,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: any) => void
  ) => void
) => {
  chrome.runtime.onMessage.addListener(
    (request: Message, sender, sendResponse) => {
      if (request.action === actionKey) {
        return cb(request, sender, sendResponse);
      }
    }
  );
};

export const sendExtensionMessage = async (message: Message) =>
  new Promise(resolve => chrome.runtime.sendMessage(message, resolve));

export const getStorageData = (key: string) =>
  new Promise(resolve =>
    chrome.storage.local.get(key, items => resolve(items[key]))
  );
