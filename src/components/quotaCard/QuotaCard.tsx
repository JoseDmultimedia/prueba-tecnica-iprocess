import './QuotaCard.css';
import { FiEdit2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

interface Props{
    quotaName : string,
    quotaDebt: number, 
    currency: string,
    percentage: number,
    dateToPay: string,
    state: string,
    paymentMethod? : string,
    payDate?: string,
    addNewQuota : () => void
}

function QuotaCard(props : Props) {
    const {
      quotaName,
      quotaDebt,
      currency,
      percentage,
      dateToPay,
      state,
      addNewQuota,
      paymentMethod,
      payDate,
    } = props;
  return (
    <>
    {state === 'Pendiente' && (
        <>
        <div className='o-quotas'>
                {/* <div className='o-conector'></div> */}
                <span><FiEdit2 className='o-icon-payment'/></span>
                <p><strong>{quotaName}</strong></p>
                <p><strong>{quotaDebt} {currency}</strong> {percentage}%</p>
                <p>{dateToPay}</p>
            </div>
            <div className='o-button-add-quota' onClick={addNewQuota}>
                <span><FaPlus/></span>
                <p>Agregar Pago</p>
            </div>
        </>
    )}
    {state === 'Pagado' && (
        <>
             <div className='o-quotas-paid'>
                {/* <div className='o-conector'></div> */}
                <span>🎉</span>
                <p><strong>{quotaName}</strong></p>
                <p><strong>{quotaDebt} {currency}</strong> {percentage}%</p>
                <p>Pagado el {payDate} <br/> con {paymentMethod}</p>
            </div>
            <div className='o-button-add-quota' onClick={addNewQuota}>
                <span><FaPlus/></span>
                <p>Agregar Pago</p>
            </div>
        </>
    )}
      
    </>
  )
}

export  { QuotaCard }