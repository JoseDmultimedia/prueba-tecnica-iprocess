import './QuotaCard.css';
import { FiEdit2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import dayjs from 'dayjs';

interface Props{
    quotaName : string,
    quotaDebt: number, 
    currency: string,
    percentage: number,
    dateToPay: string,
    state: string,
    paymentMethod? : string,
    payDate?: string,
    addNewQuota : () => void,
    payQuota : () => void
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
      payQuota
    } = props;

    const formatDate = dayjs(dateToPay).format('DD/MM/YYYY');

  return (
    <>
    {state === 'Pendiente' && (
        <>
        <div className='o-quotas'>
                {/* <div className='o-conector'></div> */}
                <span onClick={payQuota}><FiEdit2 className='o-icon-payment'/></span>
                <p><strong>{quotaName}</strong></p>
                <p><strong>{quotaDebt} {currency}</strong> {percentage}%</p>
                <p>{formatDate}</p>
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