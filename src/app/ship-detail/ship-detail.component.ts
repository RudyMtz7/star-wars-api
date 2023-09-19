import { Component, Input, SimpleChanges } from '@angular/core';
import { Ship } from '../models/ship.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ship-detail',
  templateUrl: './ship-detail.component.html',
  styleUrls: ['./ship-detail.component.css']
})
export class ShipDetailComponent {
  @Input() ship!: Ship;
 
  shipForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.shipForm = this.fb.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      starship_class: ['', Validators.required],
      manufacturer: ['', Validators.required],
      cost_in_credits: [
        '',
        [Validators.required, this.validateCurrency] // Custom validator for currency format
      ],      
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

  // Custom validator for currency format
  validateCurrency(control: AbstractControl): { [key: string]: any } | null {
    const currencyPattern = /^\$\s\d{1,3}(,\d{3})*(\.\d{2})?$/;
    if (!currencyPattern.test(control.value)) {
      return { invalidCurrencyFormat: true };
    }
    return null;
  }

  // Helper method to format currency for display
  formatCurrency(value: number | string): string {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    return `$ ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    // Replace "unknown" with 0 for cost_in_credits
    const costInCredits = this.ship.cost_in_credits === 'unknown' ? '0' : this.ship.cost_in_credits;
    if (changes['ship'] && this.ship) {
      console.log(this.ship);
      
      this.shipForm.patchValue({
        name: this.ship.name || '',
        model: this.ship.model || '',
        starship_class: this.ship.starship_class || '',
        manufacturer: this.ship.manufacturer || '',
        cost_in_credits: this.formatCurrency(costInCredits) || '',
        length: this.ship.length || '',
        crew: this.ship.crew || '',
        passengers: this.ship.passengers || '',
        max_atmosphering_speed: this.ship.max_atmosphering_speed || '',
        hyperdrive_rating: this.ship.hyperdrive_rating || '',
        MGLT: this.ship.MGLT || '',
        cargo_capacity: this.ship.cargo_capacity || '',
        consumables: this.ship.consumables || '',
        // Update form controls for other ship properties as needed
      });
    }
  }
  
  
  // Inside ShipDetailComponent
  saveShip(): void {
    const updatedShipData = this.shipForm.value;
    console.log('Updated Ship Data:', updatedShipData);
  }

}
