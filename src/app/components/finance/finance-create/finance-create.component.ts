import { Component, OnInit } from '@angular/core';
import { Finance } from './../finance.model';
import { FinanceService } from './../finance.service';
import { Router } from '@angular/router';
import { ConteudoService } from '../../conteudo/conteudo.service';

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
    private router: Router, private conteudoService: ConteudoService) { }

    status : any[] = [];
    instituicoes : any[] = [];
    grupos : any[] = [];
 
  ngOnInit(): void {
    this.conteudoService.readByTipo('status').subscribe((status:any) => {
      this.status = status
    })
    this.conteudoService.readByTipo('instituicao').subscribe((instituicoes:any) => {
      this.instituicoes = instituicoes
    })
    this.conteudoService.readByTipo('grupo').subscribe((grupos:any) => {
      this.grupos = grupos
    })    
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