import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { TicketService } from '../../ticket.service';
import { Ticket } from '../../models/ticket.model'; // Path to the model
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit {
  private ticketService = inject(TicketService);
  private formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ticketForm: FormGroup;
  isEditMode: boolean = false; // Add a flag to indicate if you are in edit mode
  errorMessages: string[] = []; // To store error messages
  ticketId: string | null = null;

  constructor() {
    this.ticketForm = this.formBuilder.group({
      description: ['', Validators.required],
      status: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.ticketId = params.get('ticketId'); // Get the ticket ID from the URL parameters
      if (this.ticketId) {
        this.isEditMode = true; // Update the flag for edit mode
        this.loadTicketDetails(this.ticketId); // Load the ticket details
      }
    });
  }

  loadTicketDetails(ticketId: string) {
    this.ticketService.getTicketById(ticketId).subscribe(ticket => {
      this.ticketForm.patchValue(ticket); // Fill the form with ticket details
    });
  }

  onSubmit() {
    this.errorMessages = []; // Reset error messages on each submission

    // Check if form is valid
    if (this.ticketForm.valid) {
      const ticketData: Ticket = this.ticketForm.value;

      if (this.isEditMode) {
        this.ticketService.updateTicket(this.ticketId ?? '', ticketData).subscribe({
          next: () => {
            this.snackBar.open('Ticket updated successfully!', 'Close', { duration: 3000 });
            this.router.navigateByUrl("/");
          },
          error: error => {
            console.error('Error updating ticket', error);
            this.snackBar.open('Error updating ticket', 'Close', { duration: 3000 });
          }
        });
      } else {
        this.ticketService.createTicket(ticketData).subscribe({
          next: () => {
            this.snackBar.open('Ticket created successfully!', 'Close', { duration: 3000 });
            this.router.navigateByUrl("/");
          },
          error: error => {
            console.error('Error creating ticket', error);
            this.snackBar.open('Error creating ticket', 'Close', { duration: 3000 });
          }
        });
      }
    } else {
      // Collect error messages for each invalid field
      for (const control in this.ticketForm.controls) {
        if (this.ticketForm.controls[control].invalid) {
          this.errorMessages.push(`Please fill out the ${control} field.`);
        }
      }
      // Optionally show error messages in a snackbar or alert
      this.snackBar.open(this.errorMessages.join(' '), 'Close', { duration: 3000 });
    }
  }
}
