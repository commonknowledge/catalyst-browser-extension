import { getStorageData } from "./browser";
import { isAfter, isSameDay } from "date-fns";
import { isOnOrAfterToday } from "./date";

export const getCurrentDisputes = async (): Promise<Catalyst.Dispute[]> => {
  const disputes: Catalyst.Dispute[] = (await getStorageData(
    "disputes"
  )) as any;

  return disputes.filter(dispute => {
    return isOnOrAfterToday(new Date(dispute.dateTo));
  });
};

export const getDisputeAddresses = (disputes: Catalyst.Dispute[]) => {
  return disputes.reduce(
    (addresses, dispute) => {
      const newAddresses = [
        ...dispute.relatedAlliedGroups.reduce(
          (a, g) => [...a, ...g.relatedAddresses],
          [] as Catalyst.Address[]
        ),
        ...dispute.relatedOpposedGroups.reduce(
          (a, g) => [...a, ...g.relatedAddresses],
          [] as Catalyst.Address[]
        ),
        ...dispute.relatedEvents.reduce(
          (a, g) => [...a, ...g.relatedAddresses],
          [] as Catalyst.Address[]
        )
      ];

      return [
        ...addresses,
        ...newAddresses.map(address => ({ address, dispute }))
      ];
    },
    [] as Array<{ address: Catalyst.Address; dispute: Catalyst.Dispute }>
  );
};
