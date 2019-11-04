declare namespace Messages {
  interface RequestAllDisputeData {
    action: "RequestAllDisputeData";
  }
  interface BroadcastAllDisputeData {
    action: "BroadcastAllDisputeData";
    disputes: Catalyst.Dispute[];
  }
  //
  interface RequestMatchedDisputeData {
    action: "RequestDisputeData";
    address: string;
    addressType: string;
  }
  interface BroadcastMatchedDisputeData {
    action: "BroadcastMatchedDisputeData";
    tabId: number;
    mode: {
      isTwitter: boolean;
      isFacebook: boolean;
      isYoutube: boolean;
      isLinkedin: boolean;
      isGoogleMaps: boolean;
      isGoogleSearch: boolean;
    };
    matchedAddresses: Catalyst.Address[];
    disputes: Catalyst.Dispute[];
  }
}

type Message =
  // Unfiltered
  | Messages.RequestAllDisputeData
  | Messages.BroadcastAllDisputeData
  // Filtered
  | Messages.RequestMatchedDisputeData
  | Messages.BroadcastMatchedDisputeData;

type MessageResponse<T extends Message = Message> = (
  request: T,
  sendResponse: (data: any) => void
) => void;

declare namespace Catalyst {
  export interface Dispute {
    name: string;
    dateFrom: Date;
    dateTo: Date;
    source: string;
    description: string;
    relatedEvents: Event[];
    relatedAlliedGroups: Group[];
    relatedOpposedGroups: Group[];
  }

  export interface Group {
    name: string;
    description: string;
    relatedAddresses: Address[];
  }

  export interface Address {
    address: string;
    addressType: string;
  }

  export interface Event {
    name: string;
    dateFrom: Date;
    dateTo: Date;
    relatedAddresses: Address[];
  }
}
