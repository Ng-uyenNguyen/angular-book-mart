import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'repassword': new FormControl(null, [Validators.required, this.checkRePassword.bind(this)])
    });
  }
  onSubmit() {
    console.log(this.signupForm);

    if (!this.signupForm.valid) {
      return
    }
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    const observer = {
      next: (res: any) => { if (res) alert("Sign up successfully!") },
      error: (err: any) => console.log(err)
    }
    this.authService.signup(email, password).subscribe(
      observer
    )
    this.signupForm.reset();
  }

  checkRePassword(control: FormControl): { [s: string]: boolean } | null {
    if (this.signupForm?.value.password != control.value) {
      return { rePasswordNotTheSame: true }
    }
    return null;
  }
}
