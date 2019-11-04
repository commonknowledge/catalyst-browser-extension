import { fetchSocialStruggleData } from "./actions";
import { onExtensionMessage } from "common/browser";

fetchSocialStruggleData();

(() => {
  setInterval(fetchSocialStruggleData, 1000 * 60 * 30);
})();

onExtensionMessage("RequestAllDisputeData", (...stuff) => {
  console.log(stuff);
  return new Promise(resolve =>
    chrome.storage.local.get("disputes", items => resolve(items))
  );
});
