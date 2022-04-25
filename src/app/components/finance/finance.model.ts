export interface Finance {
    id?: string
    data_de_referencia: Date
    data_do_evento: Date
    data_do_pagamento: Date | null
    descricao: string
    nota: string | null
    grupos: []
    instituicao_financeira: string
    renda: number | null
    gastos: number | null
    status: string
    tags: string[]
}
