import { Ticket } from './models/ticket.model';
import { Routes } from '@angular/router';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';

export const routes: Routes = [
  // Redirection depuis la racine vers 'ticket-list'
  {
    path: '',
  component: TicketListComponent

  },
  {
    path: 'ticket-list',
    component: TicketListComponent
  },

  {
    path: 'create-ticket',
    component : TicketFormComponent
  },

  {
    path:'Ticket/:id',
    component : TicketFormComponent

  },

  { path: 'edit-ticket/:ticketId', component: TicketFormComponent } // Route pour l'édition


  // Vous pouvez ajouter d'autres routes ici si nécessaire
];
