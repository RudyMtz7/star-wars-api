import { Component, Input, SimpleChanges } from '@angular/core';
import { Ship } from '../models/ship.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ShipService } from '../services/ship/ship.service';
import { MoneyFormatPipe } from '../util/money-format.pipe';


@Component({
  selector: 'app-ship-detail',
  templateUrl: './ship-detail.component.html',
  styleUrls: ['./ship-detail.component.css']
})
export class ShipDetailComponent {
  @Input() ship!: Ship;
 
  shipForm!: FormGroup;

  constructor(
      private fb: FormBuilder,
      private shipService: ShipService,
      private moneyFormatPipe: MoneyFormatPipe
      ) {
    this.shipForm = this.fb.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      starship_class: ['', Validators.required],
      manufacturer: ['', Validators.required],
      cost_in_credits: ['', [Validators.required]],      
      length: ['', [Validators.required]],
      crew: ['', [Validators.required]],
      passengers: ['', [Validators.required]],
      max_atmosphering_speed: ['', Validators.required],
      hyperdrive_rating: ['', Validators.required],
      MGLT: ['', [Validators.required]],
      cargo_capacity: ['', [Validators.required]],
      consumables: ['', Validators.required],
    });
  }

  formatMoney(value: string): string {
    return this.moneyFormatPipe.transform(value);
  }  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ship'] && this.ship) {      
      this.shipForm.patchValue({
        name: this.ship.name || '',
        model: this.ship.model || '',
        starship_class: this.ship.starship_class || '',
        manufacturer: this.ship.manufacturer || '',
        cost_in_credits: this.ship.cost_in_credits || '',
        length: this.ship.length || '',
        crew: this.ship.crew || '',
        passengers: this.ship.passengers || '',
        max_atmosphering_speed: this.ship.max_atmosphering_speed || '',
        hyperdrive_rating: this.ship.hyperdrive_rating || '',
        MGLT: this.ship.MGLT || '',
        cargo_capacity: this.ship.cargo_capacity || '',
        consumables: this.ship.consumables || '',
      });
    }
  }
  
  showConfirmationModal() {
    Swal.fire({
      title: 'Confirm Submission',
      text: 'Are you sure you want to submit this form?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes, submit!" - Submit the form here
        this.saveShip();
      }
    });
  }
  
  
  // Inside ShipDetailComponent
  saveShip(): void {
    const newShip = this.shipForm.value;
    this.shipService.createOrUpdateShip(newShip);
  }

}
