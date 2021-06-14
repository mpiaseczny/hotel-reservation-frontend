import { Component } from '@angular/core';
import {AuthService} from './auth/shared/auth.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'hotel-reservation-frontend';

  constructor(public authService: AuthService, private router: Router, private messageService: MessageService) {}

  onLogout() {
    this.authService.logout();
    this.messageService.add({severity: 'success', summary: 'Pomyślnie wylogowano'});
    this.router.navigate(['.']);
  }
}
