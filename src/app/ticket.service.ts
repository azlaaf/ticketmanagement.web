import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from './models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  // Remplacez par l'URL correcte de votre API
   apiUrl = 'https://localhost:7132';
   http=inject(HttpClient)
   constructor() {}

    getTickets() {
      return this.http.get<Ticket[]>(`${this.apiUrl}/api/Tickets`);
    }
    createTicket(ticket: Ticket): Observable<Ticket> {
      return this.http.post<Ticket>(`${this.apiUrl}/api/Tickets`, ticket);
    }
    getTicketById(ticketId: string): Observable<Ticket> {
      return this.http.get<Ticket>(`${this.apiUrl}/api/tickets/${ticketId}`);
    }

    updateTicket(ticketId: string, ticketData: Ticket): Observable<any> {
      return this.http.put(`${this.apiUrl}/api/tickets/${ticketId}`, ticketData);
    }
    deleteTicket(ticketId: number, ticketData: Ticket): Observable<any> {
      return this.http.delete(`${this.apiUrl}/api/Tickets/${ticketId}`, { body: ticketData });
    }





    }



