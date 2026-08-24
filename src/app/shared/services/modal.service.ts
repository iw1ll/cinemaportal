import { Injectable, ViewContainerRef, ComponentRef, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmModalComponent } from '../ui/component/confirm-modal/confirm-modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private containerRef?: ViewContainerRef;

  setContainer(container: ViewContainerRef): void {
    this.containerRef = container;
  }

  /** Открыть компонент динамически */
  open<T>(component: Type<T>): ComponentRef<T> | null {
    if (!this.containerRef) {
      console.error('Контейнер не установлен');
      return null;
    }
    return this.containerRef.createComponent(component);
  }

  /** Закрыть модалку */
  close(ref: ComponentRef<unknown>): void {
    ref.destroy();
  }

  /** Универсальный confirm — возвращает true (Да) или false (Нет) */
  confirm(message: string, title = 'Подтверждение'): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      const ref = this.open(ConfirmModalComponent);

      if (!ref) {
        subscriber.next(false);
        subscriber.complete();
        return;
      }

      ref.setInput('title', title);
      ref.setInput('message', message);

      ref.instance.confirm.subscribe(() => {
        this.close(ref);
        subscriber.next(true);
        subscriber.complete();
      });

      ref.instance.closeModal.subscribe(() => {
        this.close(ref);
        subscriber.next(false);
        subscriber.complete();
      });
    });
  }
}
