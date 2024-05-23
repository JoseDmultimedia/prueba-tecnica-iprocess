//Lista de las cuotas, inicial
export const quotasRaw = [
  {
    id: 1, 
    quotaName: "Anticipo",
    quotaDebt: 182,
    percentage: 100,
    dateToPay: "05/23/2024",
    payDate: "",
    state: "Pendiente",
    paymentMethod : ""
  }
];

//Info de la deuda general
export const generalDebtRaw = {
    debt : 182,
    currency : 'USD'
}

/*
  Estos son los objectos de las cuotas el la deuda general, representa mas o menos la estructura
  de datos traida de la API, decidí tener un general debt porque resuelvo la deuda general como 
  perteciente a una tabla que tiene conexión de muchos a muchos con la tabla de cuotas.
*/