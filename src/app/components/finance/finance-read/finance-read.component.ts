import { FinanceService } from './../finance.service';
import { Finance } from './../finance.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance-read',
  templateUrl: './finance-read.component.html',
  styleUrls: ['./finance-read.component.css']
})
export class FinanceReadComponent implements OnInit {

  finances: Finance[] = [];
  displayedColumns = [
    'id', 
    'data_de_referencia', 
    'data_do_evento', 
    'data_do_pagamento', 
    'descricao', 
    'nota', 
    'grupo', 
    'instituicao_financeira',     
    'renda', 
    'gastos', 
    'status', 
    'tags',
    'action'
  ]

  constructor(private financeService: FinanceService) { }

  ngOnInit(): void {
    this.financeService.read().subscribe(finances => {
      this.finances = finances
      console.log(finances)
    })
  }

}
