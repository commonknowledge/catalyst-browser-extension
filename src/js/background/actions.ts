import { sendExtensionMessage } from "common/browser";

export const fetchSocialStruggleData = async () => {
  console.log("fetchSocialStruggleData");

  const req = await fetch("http://localhost:5000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      operationName: null,
      variables: {},
      query: `
      {
        disputes {
          name
          dateFrom
          dateTo
          source
          description
          relatedEvents {
            name
            dateFrom
            dateTo
            relatedAddresses {
              address
              addressType
            }
          }
          relatedAlliedGroups {
            name
            description
            relatedAddresses {
              address
              addressType
            }
          }
          relatedOpposedGroups {
            name
            description
            relatedAddresses {
              address
              addressType
            }
          }
        }
      }`
    })
  });

  const {
    data: { disputes }
  } = (await req.json()) as { data: { disputes: Catalyst.Dispute[] } };

  chrome.storage.local.set({ disputes });

  console.log("BroadcastAllDisputeData", disputes);
};
