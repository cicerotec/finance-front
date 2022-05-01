import { HttpParams } from '@angular/common/http';
import { FinanceService } from './../finance.service';
import { Finance } from './../finance.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';
import { MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../../bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-finance-read',
  templateUrl: './finance-read.component.html',
  styleUrls: ['./finance-read.component.css']
})
export class FinanceReadComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;  

  instituicoes = [
      {'nome':'ITAU', 'valor' : 500 }
    ,{'nome':'NUBANK', 'valor' : 600 }
    ,{'nome':'C6BANK', 'valor' : 700 }
    ,{'nome':'INTER', 'valor' : 800 }
    ,{'nome':'SANTANDER', 'valor' : 900 }
    ,{'nome':'SODEXO-REF-IBM','valor' : 100}
    ,{'nome':'SODEXO-ALI-IBM', 'valor' : 200 }
  ];
  colunas = ['nome','valor'];


  nada_encontrado = "Nenhum registro encontrado!"

  finances: Finance[] = [];
  displayedColumns = [
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
    private route: ActivatedRoute,
    private _bottomSheet: MatBottomSheet
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

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }


}
