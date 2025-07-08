import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { AuthResponse, LoginDto } from "../models/user.model";
import { Observable } from "rxjs";
import { RegisterAgentDto } from "../models/agent.model";
import { RegisterBuyerDto } from "../models/buyer.model";

@Injectable()
export class AuthService{
    private apiUrl = environment.apiUrl;

    constructor(private http:HttpClient){}

    login(credentials:LoginDto):Observable<AuthResponse>{
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`,credentials);
    }

    registerAgent(agentData: RegisterAgentDto): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${environment.apiUrl}/agents/register`, agentData);
    }

    registerBuyer(buyerData: RegisterBuyerDto): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${environment.apiUrl}/buyers/register`, buyerData);
    }

    refreshToken(refreshToken: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/refresh`, { refreshToken });
    }

    logout(refreshToken: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/logout`, { refreshToken });
    }

    getCurrentUser(): Observable<any> {
        return this.http.get(`${this.apiUrl}/auth/me`);
    }

}