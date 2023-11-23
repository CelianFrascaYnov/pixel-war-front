import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-pixel-war-table',
  templateUrl: './pixel-war-table.component.html',
  styleUrls: ['./pixel-war-table.component.scss'],
})
export class PixelWarTableComponent implements OnInit {
  @ViewChild('canvasPixel', { static: true }) myCanvas!: ElementRef; // Canvas
  cellSize = 10; // Taille d'une cellule
  cellsOccupied: Set<string> = new Set(); // Ensemble des cellules occupées

  showPopup = false; // popup de validation fermé par défaut
  selectedX: number = 0; // X par défaut
  selectedY: number = 0; // Y par défaut
  selectedColor = '#000000'; // Couleur par défaut
  receivedPixels: any[] = []; // Tableau pour stocker les pixels reçus

  mouseOnCell: { x: number; y: number } = { x: 0, y: 0 }; // Cellule survolée par la souris

  constructor(private webSocketService: WebSocketService) {}

  /**
   * Effectue des actions lors de l'initialisation du composant.
   */
  ngOnInit(): void {
    const dataToSend = {
      type: 'getAllPixels',
    };
    this.webSocketService.sendMessage(dataToSend);
    this.webSocketService.receiveMessage().subscribe((message) => {
      // Mise à jour du tableau des pixels reçus
      this.receivedPixels = message;
      // Dessin des pixels sur le canvas
      this.drawReceivedPixels();
    });
  }

  /**
   * Gère l'événement de clic sur le canvas.
   */
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

  /**
   * Met à jour la couleur sélectionnée en fonction de l'input de couleur.
   */
  updateColor(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedColor = inputElement.value;
  }

  /**
   * Soumet le formulaire pour ajouter un pixel.
   */
  submitForm() {
    // Gestion de l'action à effectuer lors de la soumission du formulaire
    const dataToSend = {
      type: 'ajoutPixel',
      data: {
        color: this.selectedColor,
        x: this.selectedX,
        y: this.selectedY,
      },
    };
    this.webSocketService.sendMessage(dataToSend);
    // Réinitialisation des valeurs et masquage de la fenêtre contextuelle
    this.showPopup = false;
    this.selectedColor = '#000000';
    this.selectedX = 0;
    this.selectedY = 0;
  }

  /**
   * Dessine les pixels reçus sur le canvas.
   */
  drawReceivedPixels() {
    const canvas = this.myCanvas.nativeElement;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    this.receivedPixels.forEach((pixel) => {
      const x = pixel.x * this.cellSize;
      const y = pixel.y * this.cellSize;
      context.fillStyle = pixel.color;
      context.fillRect(x, y, this.cellSize, this.cellSize);
    });
  }

  /**
   * Gère l'événement de survol d'une cellule du canvas.
   */
  onCellHover(event: MouseEvent) {
    const canvas = this.myCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const cellX = Math.floor(x / this.cellSize);
    const cellY = Math.floor(y / this.cellSize);

    this.mouseOnCell = { x: cellX, y: cellY };
  }

  /**
   * Ferme la fenêtre contextuelle du formulaire.
   */
  closePopup() {
    this.showPopup = false;
    // Réinitialisez les valeurs si nécessaire
    this.selectedColor = '#ff0000';
    this.selectedX = 0;
    this.selectedY = 0;
    const dataToSendAtReinitialize = {
      type: 'getAllPixels',
    };
    this.webSocketService.sendMessage(dataToSendAtReinitialize);
  }
}
