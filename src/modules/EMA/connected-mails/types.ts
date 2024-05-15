interface IConnectedMailItem {
  emailProviderType: number;
  id: number;
  email: string;
  senderName: string;
  capacity: number;
  accountHealth: number;
  status: boolean;
}

export type { IConnectedMailItem };
