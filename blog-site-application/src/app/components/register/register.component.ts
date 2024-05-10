import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogSiteServiceService } from '../../services/blog-site-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  UserRegister: FormGroup;
  submitted = false;
  message: string;
  constructor(private fb: FormBuilder, private blogSiteServiceService: BlogSiteServiceService) { }

  ngOnInit(): void {
    this.UserRegister = this.fb.group(
      {
        userName: [
          '',
          [Validators.required, Validators.pattern('[a-zA-Z ]*')],
        ],
        emailId: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
      },
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.UserRegister.invalid) {
      return;
    }

    var userInfo = {
      firstName: this.UserRegister.value.firstName,
      lastName: this.UserRegister.value.lastName,
      loginId: this.UserRegister.value.username,
      emailId: this.UserRegister.value.email,
      contactNo: this.UserRegister.value.contactNumber,
      password: this.UserRegister.value.password,
    };

    this.blogSiteServiceService.register(userInfo).subscribe(
      (data) => {
        if (data.id == null) {
          this.message = 'User already exist';
        } else {
          this.message = 'detais saved';
        }
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

}
