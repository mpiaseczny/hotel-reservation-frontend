import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/shared/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hotel-reservation-frontend';

  constructor(
    public authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.router)
      )
      .subscribe((event) => {
        const title = this.getTitle(
          this.router.routerState,
          this.router.routerState.root
        ).join(' | ');
        this.titleService.setTitle(title);
      });
  }

  getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  onLogout() {
    this.authService.logout();
    this.messageService.add({
      severity: 'success',
      summary: 'Pomyślnie wylogowano',
    });
    window.location.reload();
  }
}
