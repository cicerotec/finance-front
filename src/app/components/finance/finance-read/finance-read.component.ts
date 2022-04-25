import { HttpParams } from '@angular/common/http';
import { FinanceService } from './../finance.service';
import { Finance } from './../finance.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-finance-read',
  templateUrl: './finance-read.component.html',
  styleUrls: ['./finance-read.component.css']
})
export class FinanceReadComponent implements OnInit {

  nada_encontrado = "Nenhum registro encontrado!"

  finances: Finance[] = [];
  displayedColumns = [
    'id', 
    'data_de_referencia', 
    'data_do_evento', 
    'data_do_pagamento', 
    'descricao', 
    'nota', 
    'grupos', 
    'instituicao_financeira',     
    'renda', 
    'gastos', 
    'status', 
    'tags',
    'action'
  ]

  id: string | undefined
  data_de_referencia!: Date;
  data_de_referencia_final!: Date

  constructor(
    private financeService: FinanceService,
    private router: Router,
    private route: ActivatedRoute    
  ) { }

  ngOnInit(): void {
    this.data_de_referencia = this.getFirstDayOfMonth()
    this.data_de_referencia_final = this.getLastDayOfMonth()
    this.searchDataReferencia()
  }

  searchId(): void {
    if(typeof this.id!='undefined' && this.id) {
      this.financeService.readById(this.id).subscribe(finance => {
        this.finances = []
        this.finances[0] = finance
        console.log(this.finances[0])   
      }, error => {
        this.financeService.showMessage(this.nada_encontrado)
      })
    }
  }

  searchDataReferencia(): void {
    if(typeof this.data_de_referencia!='undefined' 
      && this.data_de_referencia
      && typeof this.data_de_referencia_final!='undefined' 
      && this.data_de_referencia_final) {

        let params = new HttpParams()
          .set('data_de_referencia', this.data_de_referencia.toISOString())
          .set('data_de_referencia_final', this.data_de_referencia_final.toISOString())
        //console.log(params)             

        this.financeService.readByParams(params).subscribe(finances => {
        this.finances = []
        this.finances = finances
        //console.log(this.finances)   
      }, error => {
        this.financeService.showMessage(this.nada_encontrado)
      })
    }
  }  

  getFirstDayOfMonth(): Date {
    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay
  }

  getLastDayOfMonth(): Date {
    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);    
    return lastDay
  }
  
  monthForward(): void {
    this.data_de_referencia = new Date(this.data_de_referencia.getFullYear(), this.data_de_referencia.getMonth() + 1, 1)
    this.data_de_referencia_final = new Date(this.data_de_referencia_final.getFullYear(), this.data_de_referencia_final.getMonth() + 2, 0)
    console.log("monthForward data inicial "+this.data_de_referencia)
    console.log("monthForward data final "+this.data_de_referencia)
    this.searchDataReferencia()
  }

  monthBackward(): void {
    this.data_de_referencia = new Date(this.data_de_referencia.getFullYear(), this.data_de_referencia.getMonth() - 1, 1)
    this.data_de_referencia_final = new Date(this.data_de_referencia_final.getFullYear(), this.data_de_referencia_final.getMonth(), 0)
    console.log("monthBackward data inicial "+this.data_de_referencia)
    console.log("monthBackward data final "+this.data_de_referencia)    
    this.searchDataReferencia()
  }


}
