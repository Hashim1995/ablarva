import * as signalR from '@microsoft/signalr';

/**
 * Generates a statistics socket connection using the provided token. The connection is used to receive real-time statistics updates. The connection is automatically re-established if it is lost. 
 * @param {string} token - The token used for authentication.
 * @returns {signalR.HubConnection} - The statistics socket connection.
 * @example const statisticsSocket = generateStatisticsSocket('token'); statisticsSocket.start(); statisticsSocket.on('update', (data) => { console.log(data); });
 * @see {@link https://docs.microsoft.com/en-us/javascript/api/@microsoft/signalr/hubconnectionbuilder?view=signalr-js-latest HubConnectionBuilder}
 */
const generateStatisticsSocket = (token: string) => {
  const statisticsSocket = new signalR.HubConnectionBuilder()
    .withUrl(
      `${import.meta.env.VITE_SOCKET_BASE_URL
      }/hubs/statistics-hub?token=${token}`,
      {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
        // withCredentials: false,
      }
    )
    .withAutomaticReconnect({
      nextRetryDelayInMilliseconds: () => 2000
    })
    .build();
  return statisticsSocket;
};

export default generateStatisticsSocket;
