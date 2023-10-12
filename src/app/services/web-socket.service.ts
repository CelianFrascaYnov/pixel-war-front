import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:8080/ws'); // Remplacez l'URL par votre URL WebSocket
    this.socket$.pipe().subscribe();
  }

  // // Écoutez les messages entrants
  // onMessage(callback: (message: any) => void) {
  //   this.socket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     callback(data);
  //   };
  // }

  sendMessage(message: any) {
    this.socket$.next(message);
  }
}
