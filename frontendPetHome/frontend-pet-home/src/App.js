import React, { useState, useEffect } from "react";
import * as signalR from '@microsoft/signalr';

export default function App() {
  const [message, setMessage] = useState(null);
  const [connection, setConnection] = useState(null);
  useEffect(() => {
    var newConnection = new signalR.HubConnectionBuilder().withUrl("https://localhost:7124/performerSelectionHub", {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets
  }).build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(result => {
          console.log('Connected!');

          connection.on('Send', messageFromHub => {
            setMessage(messageFromHub)

          });
        })
        .catch(e => console.log('Connection failed: ', e));
    }
  }, [connection]);
  return (
    <div>
      Check {message}
    </div>
  );
}