import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
})
export class ConfirmModalComponent {
  title = input('Подтверждение');
  message = input('Вы уверены?');
  confirmLabel = input('Да');
  cancelLabel = input('Нет');

  closeModal = output<void>();
  confirm = output<void>();
}
