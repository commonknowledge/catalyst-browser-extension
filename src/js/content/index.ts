import rangeLookup from "range-lookup";
import {
  isTwitter,
  isFacebook,
  isYoutube,
  isLinkedin,
  isGoogleMaps,
  isGoogleSearch
} from "common/address";
import { createAddressBanner } from "./banner";
import { getCurrentDisputes, getDisputeAddresses } from "../common/data";

const find = (address: Catalyst.Address): Range[] => {
  if (address.addressType === "website") {
    const url = new URL(address.address);
    const searchStr =
      url.hostname + (url.pathname.length > 1 ? url.pathname : "");
    return rangeLookup(searchStr);
  } else if (address.addressType === "location") {
    const [name, ...addr] = address.address.split(",");
    const ranges = rangeLookup(address.address);
    const nameRanges = rangeLookup(name);
    const addrRanges = rangeLookup(addr.join(","));
    return ranges.length || (nameRanges.length && addrRanges)
      ? ranges.concat(nameRanges.concat(addrRanges))
      : [];
  } else {
    return [];
  }
};

const pause = (ms: number = 1000) =>
  new Promise(resolve => setTimeout(() => resolve(), ms));

let currentUrl = window.location.toString();

(async () => {
  run();
  while (true) {
    await pause(1000);
    const url2 = window.location.toString();
    if (currentUrl !== url2) {
      currentUrl = window.location.toString();
      run();
    }
  }
})();

async function run() {
  console.log("Scanning page");

  const currentDisputes = await getCurrentDisputes();
  const disputeAddresses = getDisputeAddresses(currentDisputes);

  const url = currentUrl;
  if (isTwitter(url)) {
    console.log("TWITTER");
  } else if (isFacebook(url)) {
    console.log("FACEBOOK");
  } else if (isYoutube(url)) {
    console.log("YOUTUBE");
  } else if (isLinkedin(url)) {
    console.log("LINKEDIN");
  } else if (isGoogleMaps(url)) {
    let el;
    while (!el) {
      if (url !== currentUrl) return;
      console.log("test", el);
      await pause(1000);
      el = document.querySelector(".section-info-hoverable");
    }
    console.log("done", el);

    const banners: {
      range: Range;
      address: { address: Catalyst.Address; dispute: Catalyst.Dispute };
    }[] = [];

    // Find
    const locations = disputeAddresses.filter(a => {
      return a.address.addressType === "location";
    });

    locations.forEach(address => {
      const ranges = find(address.address);
      if (ranges.length === 0) return;
      banners.push({
        address,
        range: ranges[0]
      });
    });

    if (!banners.length) return;

    // Label it
    if (!el) return;
    const node = el.cloneNode();
    el.append(node);
    createAddressBanner(banners[0].address, node);
  } else if (isGoogleSearch(url)) {
    console.log("GOOGLESEARCH");

    const banners: {
      range: Range;
      address: { address: Catalyst.Address; dispute: Catalyst.Dispute };
    }[] = [];

    // Find relevant UI content
    disputeAddresses.forEach(address => {
      const ranges = find(address.address);
      if (ranges.length === 0) return;
      banners.push({
        address,
        range: ranges[0]
      });
    });

    // Label it
    console.log(banners);
    banners.forEach(({ address, range }) => {
      const parent = range.commonAncestorContainer.parentNode;
      if (!parent) return;
      const node = document.createElement("div");
      parent.append(node);
      createAddressBanner(address, node);
    });
  }
}
