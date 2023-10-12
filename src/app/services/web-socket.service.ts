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

  sendMessage(message: any) {
    this.socket$.next(message);
  }

  // Méthode pour s'abonner aux messages du backend
  receiveMessage() {
    return this.socket$.asObservable();
  }
}
