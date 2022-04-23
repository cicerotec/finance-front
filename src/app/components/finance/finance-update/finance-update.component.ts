import { Router, ActivatedRoute } from '@angular/router';
import { FinanceService } from './../finance.service';
import { Finance } from './../finance.model';
import { Component, OnInit } from '@angular/core';
import { ConteudoService } from '../../conteudo/conteudo.service';

@Component({
  selector: 'app-finance-update',
  templateUrl: './finance-update.component.html',
  styleUrls: ['./finance-update.component.css']
})
export class FinanceUpdateComponent implements OnInit {

  finance : Finance = {
    data_de_referencia: new Date,
    data_do_evento: new Date,
    data_do_pagamento: new Date,
    descricao: '',
    nota: null,
    grupo: [],
    instituicao_financeira: '',
    renda: null,
    gastos: null,
    status: '',
    tags: ''
  }
  
  constructor(
    private financeService: FinanceService,
    private router: Router,
    private route: ActivatedRoute,
    private conteudoService: ConteudoService   
  ) { }

  status : any[] = [];
  instituicoes : any[] = [];
  grupos : any[] = [];  

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.financeService.readById(id).subscribe(finance => {
      this.finance = finance
    })

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

  updateFinance(): void {
    this.financeService.update(this.finance).subscribe(() => {
      this.financeService.showMessage('Registro atualizado com sucesso!')
      this.router.navigate(['/finances'])
    })
  }

  cancel(): void {
    this.router.navigate(['/finances'])
  }

}
