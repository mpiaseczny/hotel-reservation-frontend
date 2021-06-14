import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {LoginRequest} from '../shared/model/login-request';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userDetails: LoginRequest;

  @ViewChild('form')
  form: NgForm;

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) {}

  ngOnInit(): void {
    this.userDetails = {
      email: '',
      password: ''
    };
  }

  onLogin() {
    if (this.form.invalid) {
      this.messageService.add({severity: 'warn', summary: 'Wypełnij wszystkie pola'});
      return;
    }

    this.authService.login(this.userDetails).subscribe((result) => {
      if (!!result) {
        this.messageService.add({severity: 'success', summary: 'Zalogowano'});
        this.router.navigate(['.']);
      } else {
        this.messageService.add({severity: 'error', summary: 'Nieudane logowanie'});
      }
    });
  }
}
