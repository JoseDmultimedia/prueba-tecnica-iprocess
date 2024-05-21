import React from 'react'
import "./Pagos.css";
import { AiOutlineDown } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi"
import { FaPlus } from "react-icons/fa6";
import { APP_STATUS, AppStatusType } from '../../const/status';

function Pagos() {
    //Valores de la deuda
    const debt = 182;
    const currency = 'USD';

    //Valores de la cuotas
    const quotaName = 'Anticipo';
    const percentage = 100;
    const dateToPay = '22 May, 2024'
    const state = 'Pagado' // { Pagado, Pendiente }

  return (
    <div className='o-container-debt'>
        <div className='o-navbar-debt'>
            <div>
                <span>Pagos <AiOutlineDown/></span>
            </div>
            <div>
                <button>Editar <FiEdit2/></button>
                <p>Por cobrar <strong>{debt} {currency}</strong></p>
            </div>
        </div>
        <div className='o-container-quotas-debt'>
            
            <div className='o-quotas'>
                <div className='o-conector'></div>
                <span><FiEdit2 className='o-icon-payment'/></span>
                <p><strong>{quotaName}</strong></p>
                <p><strong>{debt} {currency}</strong> {percentage}%</p>
                <p>{dateToPay}</p>
            </div>
            <div className='o-button-add-quota'>
                <span><FaPlus/></span>
                <p>Agregar Pago</p>
            </div>

            </div>
 
    </div>
  )
}

export  { Pagos }