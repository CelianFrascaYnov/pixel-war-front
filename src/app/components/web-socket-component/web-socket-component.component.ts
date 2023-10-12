import { Component } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-web-socket-component',
  templateUrl: './web-socket-component.component.html',
  styleUrls: ['./web-socket-component.component.scss'],
})
export class WebSocketComponent {
  receivedMessage: string = '';

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.webSocketService.onMessage((message) => {
      this.receivedMessage = message;
    });
  }

  sendMessage() {
    this.webSocketService.sendMessage({ text: 'Hello, server!' });
  }
}
