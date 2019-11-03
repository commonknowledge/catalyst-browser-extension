declare namespace Messages {
  interface SomeUIAction {
    action: "SomeUIAction";
    bookURL: string;
  }
}

type Message = Messages.SomeUIAction | Messages.SomeUIAction;

type MessageResponse<T extends Message = Message> = (
  request: T,
  sendResponse: (data: any) => void
) => void;
