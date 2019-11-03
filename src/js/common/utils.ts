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
