import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Saldo } from './saldo.model';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {

  baseUrl = "http://localhost:8080/finance/controles-financeiros/saldos"  

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top"
    })
  }

  readByParams(params: HttpParams): Observable<Saldo[]> {
    return this.http.get<Saldo[]>(this.baseUrl, {params})
  }


}
