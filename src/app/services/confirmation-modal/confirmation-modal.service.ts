import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationModalService {
  constructor(private modalService: NgbModal) {}

  async confirm(): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
    });

    return modalRef.result;
  }
}
