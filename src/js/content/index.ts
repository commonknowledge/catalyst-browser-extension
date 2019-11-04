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

(async () => {
  const currentDisputes = await getCurrentDisputes();
  const disputeAddresses = getDisputeAddresses(currentDisputes);

  const url = window.location.toString();

  if (isTwitter(url)) {
    console.log("TWITTER");
  } else if (isFacebook(url)) {
    console.log("FACEBOOK");
  } else if (isYoutube(url)) {
    console.log("YOUTUBE");
  } else if (isLinkedin(url)) {
    console.log("LINKEDIN");
  } else if (isGoogleMaps(url)) {
    console.log("GOOGLEMAPS");
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
})();

const find = (address: Catalyst.Address): Range[] => {
  if (address.addressType === "website") {
    const url = new URL(address.address);
    const searchStr =
      url.hostname + (url.pathname.length > 1 ? url.pathname : "");
    const res = rangeLookup(searchStr);
    console.log("Searching for ", searchStr, res);
    return res;
  }
  return [];
};
