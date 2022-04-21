import { Conteudo } from './conteudo.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConteudoService {

  baseUrl = "http://localhost:8080/finance/conteudos"
  findAll = this.baseUrl + "/todos"
  findByTipo = this.baseUrl + "/tipo"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }
  
  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top"
    })
  }

  create(conteudo: Conteudo): Observable<Conteudo> {
    console.log(conteudo)
    return this.http.post<Conteudo>(this.baseUrl, conteudo)
  }

  read(): Observable<Conteudo[]> {
    return this.http.get<Conteudo[]>(this.findAll)
  }

  readById(id: string | null): Observable<Conteudo> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Conteudo>(url);
  }  

  readByTipo(tipo: string | null): Observable<any[]> {
    const url = `${this.findByTipo}/${tipo}`
    return this.http.get<any[]>(url);
  }  

  update(conteudo: Conteudo): Observable<Conteudo> {
    console.log(conteudo)    
    const url = `${this.baseUrl}/${conteudo.id}`
    return this.http.put<Conteudo>(url, conteudo);
  }

  delete(id: string | null): Observable<Conteudo> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Conteudo>(url);
  }

}