export interface Pedido {
    id?;
    cliente?
    clienteId?;
    obs?;
    valor?;
    endereco?;
    data?;
    status?,
    items: [{
        id?;
        descricao?;
    }]
}