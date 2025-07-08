import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable()
export class UserService{
    private apiUrl = `${environment.apiUrl}/users`;

    constructor(private http:HttpClient){}

    getUserById(id:string):Observable<User>{

    }
}