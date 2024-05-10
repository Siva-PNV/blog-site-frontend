import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

const httpOptions1 = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "",
  }),
};

@Injectable({
  providedIn: 'root'
})
export class BlogSiteServiceService {

  private readonly baseUrl = 'http://localhost:8080/api/v1.0/blogsite/users';
  private readonly blogUrl = 'http://localhost:8080/api/v1.0/blogsite/blogs';
  loggedIn: boolean;
  constructor(private httpClient: HttpClient) { }

  checkUserCredentials(value: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/login`, value);
  }

  public storeUserData(
    username: string,
    authorization: string
  ) {
    localStorage.setItem("loginId", username);
    localStorage.setItem("authorization", authorization);
  }

  public getToken() {
    return this.httpClient
      .get(`${this.baseUrl}/jwt/authentication`)
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public register(userInfo: any): Observable<any> {
    return this.httpClient
      .post(this.baseUrl + "/register", userInfo, httpOptions1)
      .pipe();
  }

  public isLoggedIn() {
    if (localStorage.getItem("loginId")) return (this.loggedIn = true);
    return (this.loggedIn = false);
  }

  public saveBlogdetails(blogDetails: any): Observable<any> {
    const blog = {
      article: blogDetails.article,
      authorName: blogDetails.authorName,
      category: blogDetails.category,
    }
    const token = localStorage.getItem("authorization");
    return this.httpClient.post(`${this.baseUrl}/blogs/add/${blogDetails.blogName}`, blog, {
      headers: {
        Authorization: token,
        userName: localStorage.getItem("loginId"),
      },
    });
  }

  public getAllBlogs(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/getall`);
  }
}
