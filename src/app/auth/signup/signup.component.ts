import {Component, OnInit, ViewChild} from '@angular/core';
import {RegisterRequest} from '../shared/model/register-request';
import {NgForm} from '@angular/forms';
import {AuthService} from '../shared/auth.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userDetails: RegisterRequest;

  @ViewChild('form')
  form: NgForm;

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.userDetails = {
      email: '',
      name: '',
      password: ''
    };
  }

  onSignUp() {
    if (this.form.invalid) {
      this.messageService.add({severity: 'warn', summary: 'Wypełnij wszystkie pola'});
      return;
    }

    this.authService.signup(this.userDetails).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Zarejestrowano. Teraz możesz się zalogować'});
      this.router.navigate(['/login']);
    }, () => {
      this.messageService.add({severity: 'warn', summary: 'Email jest już zajęty'});
    });
  }
}
