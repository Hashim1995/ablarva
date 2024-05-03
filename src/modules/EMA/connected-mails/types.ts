

interface IConnectedMailItem {
  emailProviderType: number,
  id: string;
  email: string;
  senderName: string;
  capacity: number;
  accountHealth: number;
  status: boolean;
}

export type { IConnectedMailItem };
