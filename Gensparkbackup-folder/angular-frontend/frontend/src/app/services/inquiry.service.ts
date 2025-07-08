import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { AddInquiryDto, Inquiry } from "../models/inquiry.model";
import { PagedResult } from "../models/property.model";

@Injectable()
export class InquiryService{
    constructor(private http:HttpClient){}

    private apiUrl = `${environment.apiUrl}/inquiries`;

    getInquiries():Observable<Inquiry>{
        return this.http.get<Inquiry>(this.apiUrl);
    }

    createInquiry(inquiryDto:AddInquiryDto):Observable<Inquiry>{
        return this.http.post<Inquiry>(this.apiUrl,inquiryDto);
    }

    getMyInquiries(pageNumber:number=1,pageSize:number=10):Observable<PagedResult<Inquiry>>{
        return this.http.get<PagedResult<Inquiry>>(`${this.apiUrl}/me`,{
            params: new HttpParams().set('pageNumber',pageNumber.toString()).set('pageSize',pageSize.toString())
        });
    }

    getInquiriesById(id:string):Observable<Inquiry>{
        return this.http.get<Inquiry>(`${this.apiUrl}/${id}`);
    }

    deleteInquiry(id:string):Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

}