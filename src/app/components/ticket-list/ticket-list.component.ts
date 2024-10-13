import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { Ticket } from '../../models/ticket.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [MatTableModule, MatButton, RouterLink, MatIcon, MatPaginator, FormsModule], // Add FormsModule here
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
})
export class TicketListComponent implements OnInit {
  displayedColumns: string[] = ['ticketId', 'Description', 'Status', 'Date', 'Actions'];
  dataSource = new MatTableDataSource<Ticket>();
  isLoading: boolean = true;
  errorMessage: string = '';
  searchTerm: string = ''; // Add property for the search term

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTickets().subscribe(
      (tickets: Ticket[]) => {
        this.dataSource.data = tickets;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching tickets', error);
        this.errorMessage = 'Could not load tickets. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  deleteTicket(ticketId: number, ticketData: Ticket): void {
    const confirmation = window.confirm("Are you sure you want to delete this ticket?");

    if (confirmation) {
      this.ticketService.deleteTicket(ticketId, ticketData).subscribe(
        () => {
          console.log('Ticket successfully deleted');
          this.loadTickets();
          window.alert("The ticket has been successfully deleted!");
        },
        (error) => {
          console.error('Error deleting ticket', error);
          this.errorMessage = 'Could not delete the ticket. Please try again later.';
        }
      );
    } else {
      console.log('Deletion canceled by the user.');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Apply the filter based on the search term
  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase(); // Convert to lowercase for filtering
  }
}
