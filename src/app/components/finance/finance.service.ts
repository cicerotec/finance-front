import { Finance } from './finance.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FinanceService {

  baseUrl = "http://localhost:8080/finance/controles-financeiros"
  findAll = this.baseUrl + "/todos"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top"
    })
  }

  create(finance: Finance): Observable<Finance> {
    console.log(finance)
    return this.http.post<Finance>(this.baseUrl, finance)
  }

  read(): Observable<Finance[]> {
    return this.http.get<Finance[]>(this.findAll)
  }

  readById(id: string | null): Observable<Finance> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Finance>(url);
  }  

  update(finance: Finance): Observable<Finance> {
    console.log(finance)    
    const url = `${this.baseUrl}/${finance.id}`
    return this.http.put<Finance>(url, finance);
  }

  delete(id: string | null): Observable<Finance> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Finance>(url);
  }

}