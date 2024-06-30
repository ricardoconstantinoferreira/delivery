export class Currency {

    formatterPrice(price: number): string {
        return new Intl.NumberFormat('pt-BR', 
            { 
                style: 'currency', 
                currency: 'BRL' 
            }
        ).format(price);
    }
}