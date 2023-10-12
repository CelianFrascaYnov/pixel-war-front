import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    // Initialisation de la connexion WebSocket vers le serveur
    this.socket$ = webSocket('ws://localhost:8080/ws');
    // Souscription au WebSocket
    this.socket$.pipe().subscribe();
  }

  /**
   * Envoie un message via le WebSocket au serveur.
   * @param message Message à envoyer.
   */
  sendMessage(message: any) {
    this.socket$.next(message);
  }

  /**
   * Écoute les messages reçus via le WebSocket.
   * @returns Un observable contenant les messages reçus.
   */
  receiveMessage() {
    return this.socket$.asObservable();
  }
}
