import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:8080/ws');

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(
          'WebSocket connection closed cleanly, code:',
          event.code,
          'reason:',
          event.reason
        );
      } else {
        console.error('WebSocket connection abruptly closed.');
      }
    };
  }

  // Écoutez les messages entrants
  onMessage(callback: (message: any) => void) {
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      callback(data);
    };
  }

  sendMessage(message: any) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket connection is not open.');
    }
  }
}
