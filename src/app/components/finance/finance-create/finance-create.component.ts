import { Component, OnInit } from '@angular/core';
import { Finance } from './../finance.model';
import { FinanceService } from './../finance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finance-create',
  templateUrl: './finance-create.component.html',
  styleUrls: ['./finance-create.component.css']
})
export class FinanceCreateComponent implements OnInit {

  finance : Finance = {
    data_de_referencia: new Date,
    data_do_evento: new Date,
    data_do_pagamento: new Date,
    descricao: '',
    nota: '',
    grupo: [],
    instituicao_financeira: '',
    renda: null,
    gastos: null,
    status: '',
    tags: ''
  }


  constructor(private financeService: FinanceService,
    private router: Router) { }

  ngOnInit(): void {
  }

  createFinance(): void {
    this.financeService.create(this.finance).subscribe(() => {
      this.financeService.showMessage('Evento registrado!')
      this.router.navigate(['/'])
    })
  }

  cancel(): void {
    this.router.navigate(['/finances'])
  }

}