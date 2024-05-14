import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogSiteServiceService } from 'src/app/services/blog-site-service.service';

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.css']
})
export class BlogDashboardComponent implements OnInit {

  blog: FormGroup;
  displayStyle = "none";
  allBlogs: [] = [];
  constructor(private fb: FormBuilder, private blogSiteService: BlogSiteServiceService, private _router: Router) { }

  ngOnInit() {
    this.blog = this.fb.group(
      {
        category: [
          '',
          [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(20)],
        ],
        article: [
          '',
          [
            Validators.required,
            Validators.maxLength(1000),
          ],
        ],
        authorName: ['', [Validators.required]],
        blogName: ['', [Validators.required, Validators.maxLength(20)]],
      },
    );
    this.blogSiteService.getAllBlogs().subscribe((data) => {
      console.log(data);
      this.allBlogs = data;
    })
  }

  onSubmit() {
    console.log(this.blog.value);
    this.blogSiteService.saveBlogdetails(this.blog.value).subscribe(() => {
      this.closePopup();
    })
  }

  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  logOut() {
    this.blogSiteService.logout();
    this._router.navigate(['/login']);
  }

}
