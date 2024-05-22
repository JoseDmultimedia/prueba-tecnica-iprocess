import { useState } from "react";
import "./Pagos.css";
import { AiOutlineDown } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { APP_STATUS, AppStatusType } from "../../const/status";
import { QuotaCard } from "../../components/quotaCard/QuotaCard";
import { QuotaCardUpdate } from "../../components/quotaCardUpdate/QuotaCardUpdate";
import { quotasRaw, generalDebtRaw } from "../../const/quotas";
import dayjs, { Dayjs } from "dayjs";
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

  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE);
  const [quota, setQuota] = useState<Quota[]>(quotasRaw);
  const [generalDebt, setGenetalDebt] = useState<GeneralDebt>(generalDebtRaw);

  const addQuotaAtIndex = (index: number, newItem: Quota) => {
    setQuota((prevItems) => [
      ...prevItems.slice(0, index),
      newItem,
      ...prevItems.slice(index),
    ]);
  };

  // todo -> hacer una condciion que verfique que el pago esta compelto, si no dejar crear cuotas 
  const addNewQuota = (index: number) => {
    return () => {
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

  return (
    <div className="o-container-debt">
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
              payQuota={() => console.log('Pagar cuota')}
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
    </div>
  );
}

export { Pagos };
