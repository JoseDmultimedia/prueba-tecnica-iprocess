import { useState } from "react";
import "./Pagos.css";
import { AiOutlineDown } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { APP_STATUS, AppStatusType } from "../../const/status";
import { QuotaCard } from "../../components/quotaCard/QuotaCard";
import { QuotaCardUpdate } from "../../components/quotaCardUpdate/QuotaCardUpdate";
import { quotasRaw, generalDebtRaw } from "../../const/quotas";
import dayjs, { Dayjs } from "dayjs";
import Modal from '@mui/material/Modal';
import { Toaster, toast } from "sonner";
interface Quota {
  id?: number;
  quotaName: string;
  quotaDebt: number;
  percentage: number;
  dateToPay: string;
  payDate: string;
  state: string;
  paymentMethod: string;
}

interface GeneralDebt {
    debt : number,
    currency : string
}

function Pagos() {
  /*
    Decidí usar un estado para el flujo de la aplicación con el appStatus, 
    esto con la idea de matener una traza de en donde cambia visualemente los compoentes 
  */

  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE);
  const [quota, setQuota] = useState<Quota[]>(quotasRaw);
  const [generalDebt, setGenetalDebt] = useState<GeneralDebt>(generalDebtRaw);

  /*
  TODO -> Api call
    Si hubiera conexión con backend en esta instancia haria el llamado a las funciones que 
    hacen fetch en la api, con la idea de usar un efecto (useEffect) para actualizar los objectos 
    traidos 
  */
  const [open, setOpen] = useState(false);
  const [selectedQuotaIndex, setSelectedQuotaIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => {
    return () => {
      setSelectedQuotaIndex(index);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setSelectedQuotaIndex(null);
    setOpen(false);
  };

  /*
    decidí manejar la actualización del pago de la cuaota y de la deuda general en el evento
    onSubmit del Form, con la idea de tener consistencia, agregue una validación que permite saber 
    si una cuota anterior no se ha pagado con la idea de retroalimentar al usuario con un mensaje 
  */

  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const methodPayment = formData.get('methodPayment') as string;


    if(selectedQuotaIndex !== null){

      if(quota[selectedQuotaIndex - 1] && quota[selectedQuotaIndex - 1].state === 'Pendiente' ){
        toast.error('Tienes un pago anterior pendiente por pagar');
      }else{
        setQuota((prevItems) => {
          const updatedQuota = [...prevItems];
          updatedQuota[selectedQuotaIndex] = {
            ...updatedQuota[selectedQuotaIndex],
            state : 'Pagado',
            paymentMethod: methodPayment,
            payDate: (new Date()).toDateString()
          };
          return updatedQuota;
        })
  
        setGenetalDebt((prevDebt) => ({
          ...prevDebt,
          debt : prevDebt.debt - quota[selectedQuotaIndex].quotaDebt
        }))
      }
    }

    handleClose();
  }

  const addQuotaAtIndex = (index: number, newItem: Quota) => {
    setQuota((prevItems) => [
      ...prevItems.slice(0, index),
      newItem,
      ...prevItems.slice(index),
    ]);
  };

  /*
    decide que la función de agregar una nueva cuota, tuviera una condición que permita identificar
    si el pago de la deuda ya fue saldado, personalmente, esta opción se me ocurrio de esta manera, pero
    creo que hay una mejor manera de realizarlo, ya que este trigger se da desde el evento onCLick, seria
    tal vez bueno que se desde el momento en que se salda la deuda. 
  */

 
  const addNewQuota = (index: number) => {
    return () => {
      if(generalDebt.debt === 0){
        toast.success('Ya realizaste el pago de tu deuda, no puedes crear mas cuotas')
        return
      }

      if(quota[index].state === 'Pendiente'){
        const newPercentage = quota[index].percentage / 2;
        const newQuotaDebt = (generalDebt.debt * newPercentage) / 100;
        const newQuota: Quota = {
            quotaName: "Nuevo",
            quotaDebt: newQuotaDebt,
            percentage: newPercentage,
            dateToPay: "",
            payDate: "",
            state: "Pendiente",
            paymentMethod: "",
          };
          handleInputChange(index, 'quotaDebt', newQuotaDebt);
          handleInputChange(index, 'percentage', newPercentage);

          const indexToAdd = index + 1;
          addQuotaAtIndex(indexToAdd, newQuota);

          setAppStatus(APP_STATUS.UPDATE);
      }else {
        const newPercentage = quota[index + 1].percentage / 2;
        const newQuotaDebt = (generalDebt.debt * newPercentage) / 100;
        const newQuota: Quota = {
            quotaName: "Nuevo",
            quotaDebt: newQuotaDebt,
            percentage: newPercentage,
            dateToPay: "",
            payDate: "",
            state: "Pendiente",
            paymentMethod: "",
          };
          
          handleInputChange(index + 1, 'quotaDebt', newQuotaDebt);
          handleInputChange(index + 1, 'percentage', newPercentage);

          const indexToAdd = index + 1;
          addQuotaAtIndex(indexToAdd, newQuota);

          setAppStatus(APP_STATUS.UPDATE);
      }
     
    };
  };

  /*
    Decidí usar las funciones de actualización del estado de cuotas para poder actualizar tanto los
    porcentages como los valores en deuda de las cuotas, teniendo en cuenta la condición de si el previo
    es pendiente, si no, la siguiente cuota. 
  */

  const updatePercentage = (index: number, valueToCalculate: number) => {
    setQuota((prevItems) => {

      const newQuotas = [...prevItems];
      
      const currentQuota = newQuotas[index];
      const previousQuota = newQuotas[index - 1];
      const nextQuota = newQuotas[index + 1];
  
      const newPercentage = currentQuota.percentage + valueToCalculate;
  
      if (previousQuota && previousQuota.state === 'Pendiente') {
        const previousPercentage = previousQuota.percentage;
  
        if (newPercentage >= 0 && newPercentage <= currentQuota.percentage + previousPercentage) {
  
          newQuotas[index] = {
            ...currentQuota,
            percentage: newPercentage,
            quotaDebt: (generalDebt.debt * newPercentage) / 100,
          };
  
          newQuotas[index - 1] = {
            ...previousQuota,
            percentage: previousPercentage - valueToCalculate,
            quotaDebt: (generalDebt.debt * (previousPercentage - valueToCalculate)) / 100,
          };
  
          return newQuotas;
        }
      }
      if(nextQuota && nextQuota.state === 'Pendiente'){
        const nextPercentage = nextQuota.percentage;

        if(newPercentage >= 0 && newPercentage <= currentQuota.percentage + nextPercentage){
          
          newQuotas[index] = {
            ...currentQuota,
            percentage: newPercentage,
            quotaDebt: (generalDebt.debt * newPercentage) / 100,
          };
        
          newQuotas[index + 1] = {
            ...nextQuota,
            percentage: nextPercentage - valueToCalculate,
            quotaDebt: (generalDebt.debt * (nextPercentage - valueToCalculate)) / 100,
          };
  
          return newQuotas;
        }
      }
      
      return prevItems;
    });
  };

  const handleInputChange = (index : number, name : string, value : string | Dayjs | number | null) => {
    setQuota((prevItems) => {
      const updatedQuotas = [...prevItems];
      if(name === "dateToPay" && value instanceof dayjs){
        updatedQuotas[index] = {...updatedQuotas[index], [name] : value.format()}
      }else{
        updatedQuotas[index] = {...updatedQuotas[index], [name] : value}
      }
      return updatedQuotas;
    })
  }

  const addPercentage = (index: number) => {
    return () => updatePercentage(index, 1);
  };

  const substractPercentage = (index: number) => {
    return () => updatePercentage(index, -1);
  };

  const goToEdit = () => {
    setAppStatus(APP_STATUS.UPDATE);
  }

  const saveGoToIdle = () => {
    setAppStatus(APP_STATUS.IDLE);
  }

  /*
    En cuanto a los componentes, decidí usar el componente de DatePicker de la libreria de MUI
    con la idea de no reiventar la rueda, tambien el toast de sonner para retroalimentación, como
    tambien la libreria de react icons.
    
    Decidí tener dos componentes para las cards de cuotas uno con el layout de visualización y 
    otro para el layout de actualización de las cuotas, creo que se podria mejorar esa componetización, 
    tal vex teniendo un solo componente que se modifique de acuerdo al estado del flujo AppStatus.
  */

  return (
    <div className="o-container-debt">
      <Toaster />
      <div className="o-navbar-debt">
        <div>
          <span>
            Pagos <AiOutlineDown />
          </span>
        </div>
        <div>
          {appStatus === APP_STATUS.IDLE && (
            <button className="o-button-navbar-debt" onClick={goToEdit}>
              Editar <FiEdit2 />
            </button>
          )}
          {(appStatus === APP_STATUS.UPDATE ||
            appStatus === APP_STATUS.CREATE) && (
            <button className="o-button-navbar-debt-update" onClick={saveGoToIdle}>Guardar</button>
          )}
          <p>
            Por cobrar{" "}
            <strong>
              {generalDebt.debt} {generalDebt.currency}
            </strong>
          </p>
        </div>
      </div>
      <div className="o-container-quotas-debt">
        {appStatus === APP_STATUS.IDLE &&
          quota.map((quota, index) => (
            <QuotaCard
              key={index}
              quotaName={quota.quotaName}
              quotaDebt={quota.quotaDebt}
              percentage={quota.percentage}
              dateToPay={quota.dateToPay}
              state={quota.state}
              payDate={quota.payDate}
              paymentMethod={quota.paymentMethod}
              currency={generalDebt.currency}
              addNewQuota={addNewQuota(index)}
              payQuota={handleOpen(index)}
            />
          ))}
        {(appStatus === APP_STATUS.UPDATE || appStatus === APP_STATUS.CREATE) &&
          quota.map((quota, index) => (
            <QuotaCardUpdate
              key={index}
              quotaName={quota.quotaName}
              quotaDebt={quota.quotaDebt}
              percentage={quota.percentage}
              dateToPay={quota.dateToPay}
              state={quota.state}
              currency={generalDebt.currency}
              addPercentage={addPercentage(index)}
              substractPercentage={substractPercentage(index)}
              handleInputChange={(name, value) => handleInputChange(index, name, value)}
            />
          ))}
      </div>
      <Modal
       open={open}
       onClose={handleClose}>
        <div className="o-modal-payment">
          <h2>Pagar</h2>
          <p>Selecciona metodo de pago</p>
          <form className="o-form-payment-modal" onSubmit={handleModalSubmit} >
            <div>
              <label htmlFor="methodPayment">Estado: <br/></label>
              <select name="methodPayment" id="methodPayment" className="o-select-payment">
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta">Tarjeta</option>
              </select>
            </div>
            <input type="submit" value="Guardar" className="o-button-navbar-debt-update"></input>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export { Pagos };
