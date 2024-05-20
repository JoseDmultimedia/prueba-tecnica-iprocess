import React from 'react'
import "./Pagos.css";
import { AiOutlineDown } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi"

function Pagos() {
    const deuda = 182;
    const moneda = 'USD';
  return (
    <div className='o-container-pagos'>
        <div className='o-navbar-pagos'>
            <div>
                <span>Pagos <AiOutlineDown/></span>
            </div>
            <div>
                <button>Editar <FiEdit2/></button>
                <p>Por cobrar <strong>{deuda} {moneda}</strong></p>
            </div>
        </div>
        Pagos
    </div>
  )
}

export  { Pagos }