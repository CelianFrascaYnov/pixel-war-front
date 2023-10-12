import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-pixel-war-table',
  templateUrl: './pixel-war-table.component.html',
  styleUrls: ['./pixel-war-table.component.scss'],
})
export class PixelWarTableComponent implements OnInit {
  @ViewChild('canvasPixel', { static: true }) myCanvas!: ElementRef;
  cellSize = 10; // Taille d'une cellule
  cellsOccupied: Set<string> = new Set();

  showPopup = false;
  selectedX: number = 0;
  selectedY: number = 0;
  selectedColor = '#ff0000'; // Couleur par défaut

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    const canvas = this.myCanvas.nativeElement;
    const context = canvas.getContext('2d');
  }

  canvasClicked(event: MouseEvent) {
    const canvas = this.myCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const cellX = Math.floor(x / this.cellSize);
    const cellY = Math.floor(y / this.cellSize);

    const cellKey = `${cellX}-${cellY}`;

    if (!this.cellsOccupied.has(cellKey)) {
      this.selectedX = cellX;
      this.selectedY = cellY;
      this.showPopup = true;
    }
  }

  updateColor(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedColor = inputElement.value;
  }

  submitForm() {
    // Gestion de l'action à effectuer lors de la soumission du formulaire
    const dataToSend = {
      type: 'updatePixel',
      data: {
        color: this.selectedColor,
        x: this.selectedX,
        y: this.selectedY,
      },
    };
    this.webSocketService.sendMessage(dataToSend);
    // Réinitialisation des valeurs et masquage de la fenêtre contextuelle
    this.showPopup = false;
    this.selectedColor = '#ff0000';
    this.selectedX = 0;
    this.selectedY = 0;
  }
}
