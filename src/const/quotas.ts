//Lista de las cuotas, inicial
export const quotasRaw = [
  {
    id: 1, 
    quotaName: "Anticipo",
    quotaDebt: 182,
    percentage: 100,
    dateToPay: "05/23/2024",
    payDate: "05/23/2024",
    state: "Pagado",
    paymentMethod : "Efectivo"
  },
  {
    id: 2, 
    quotaName: "Cuota 2",
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