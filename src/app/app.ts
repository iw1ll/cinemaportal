import { Component, signal, ViewChild, ViewContainerRef, AfterViewInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalService } from './shared/services/modal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  protected readonly title = signal('cinemaportal');

  @ViewChild('modalContainer', { read: ViewContainerRef })
  private modalContainer!: ViewContainerRef;

  private modalService = inject(ModalService);

  ngAfterViewInit(): void {
    this.modalService.setContainer(this.modalContainer);
  }
}
