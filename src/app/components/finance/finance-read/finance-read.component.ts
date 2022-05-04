import { HttpParams } from '@angular/common/http';
import { FinanceService } from './../finance.service';
import { Finance } from './../finance.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';
import { MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../../bottom-sheet/bottom-sheet.component';
import { SaldoService } from '../../saldo/saldo.service';
import { Saldo } from '../../saldo/saldo.model';

@Component({
  selector: 'app-finance-read',
  templateUrl: './finance-read.component.html',
  styleUrls: ['./finance-read.component.css']
})
export class FinanceReadComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;  

  isShowingSidenav: boolean | undefined;

  saldos: Saldo[] = [];
  colunas = ['instituicao_financeira','saldo'];

  nada_encontrado = "Nenhum registro encontrado!"
  saldo_nao_encontrado = "Nenhum saldo encontrado para o mês vigente!"

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
    private saldoService: SaldoService,
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

        let paramsFinance = new HttpParams()
          .set('data_de_referencia', this.data_de_referencia.toISOString())
          .set('data_de_referencia_final', this.data_de_referencia_final.toISOString())

        console.log('buscando finance...')          
        this.financeService.readByParams(paramsFinance).subscribe(finances => {
          this.finances = []
          this.finances = finances

          console.log('finance encontrado......')
          console.log('buscando saldo...')
          this.searchSaldo();
        }, error => {
          console.log('finance NÃO encontrado...')
          this.financeService.showMessage(this.nada_encontrado)
        })
    }
  }  

  searchSaldo(): void {

    let paramsSaldo = new HttpParams()
      .set('data_de_referencia', this.data_de_referencia.toISOString())
      .set('data_de_referencia_final', this.data_de_referencia_final.toISOString())

    this.saldoService.readByParams(paramsSaldo).subscribe(saldos => {
      this.saldos = []
      this.saldos = saldos
      console.log('saldo encontrado...')

    }, error => {
      console.log('saldo NÃO encontrado...')
      this.saldos = []
      if(this.isShowingSidenav) {
        this.saldoService.showMessage(this.saldo_nao_encontrado)
        this.toggleSidenav()
      }
    })

  }

  toggleSidenav() {
    this.isShowingSidenav = !this.isShowingSidenav;
 }

  getFirstDayOfMonth(): Date {
    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    //let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    return firstDay
  }

  getLastDayOfMonth(): Date {
    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    //let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);    
    let lastDay = new Date(date.getFullYear(), date.getMonth(), 0);        
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
