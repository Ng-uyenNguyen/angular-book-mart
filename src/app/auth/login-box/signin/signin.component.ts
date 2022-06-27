import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  constructor(private route: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });
  }
  onSubmit() {
    if (!this.signinForm.valid) {
      return
    }
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;
    const observer = {
      next: (res: any) => {
        if (res)
          alert("Sign in successfully!");
        this.route.navigate(['/store']);
        localStorage.setItem('authState', 'true');
      },
      error: (err: any) => console.log(err)
    }
    this.authService.signin(email, password).subscribe(
      observer
    )
    this.signinForm.reset();
  }
}
