import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-search-form',
  standalone: true,
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,  ],
})
export class SearchFormComponent {
  @Output() search = new EventEmitter<any>();
  
  criteria = {
    vehicleId: '',
    code: '',
    from: '',
    to: '',
    level: ''
  };
  form = new FormGroup({
    vehicleId: new FormControl(''),
    level: new FormControl(''),
    code: new FormControl(''),
    from: new FormControl(null),
    to: new FormControl(null),
  });

  onSearch() {
    this.search.emit(this.criteria);
  }

  onClear() {
    this.criteria = {
      vehicleId: '',
      code: '',
      from: '',
      to: '',
      level: ''
    };
    this.search.emit({}); // Emit empty filters
  }
}
