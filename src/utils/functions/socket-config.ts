import * as signalR from '@microsoft/signalr';

const token = JSON.parse(localStorage.getItem('userToken') || '{}');

const statisticsSocket = new signalR.HubConnectionBuilder()
  .withUrl(
    `${import.meta.env.VITE_SOCKET_BASE_URL}/hubs/statistics-hub?token=${
      token.token
    }`,
    {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
      // withCredentials: false,
    }
  )
  .build();

export default statisticsSocket;
