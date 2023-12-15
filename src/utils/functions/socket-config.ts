import * as signalR from '@microsoft/signalr';

const generateStatisticsSocket = (token: string) => {
  const statisticsSocket = new signalR.HubConnectionBuilder()
    .withUrl(
      `${
        import.meta.env.VITE_SOCKET_BASE_URL
      }/hubs/statistics-hub?token=${token}`,
      {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
        // withCredentials: false,
      }
    )
    .withAutomaticReconnect()
    .build();
  return statisticsSocket;
};

export default generateStatisticsSocket;
