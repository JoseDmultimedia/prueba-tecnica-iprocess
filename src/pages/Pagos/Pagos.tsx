import { useState } from "react";
import "./Pagos.css";
import { AiOutlineDown } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { APP_STATUS, AppStatusType } from "../../const/status";
import { QuotaCard } from "../../components/quotaCard/QuotaCard";
import { QuotaCardUpdate } from "../../components/quotaCardUpdate/QuotaCardUpdate";
import { quotasRaw, generalDebt } from "../../const/quotas";
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

function Pagos() {
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE);
  const [quota, setQuota] = useState<Quota[]>(quotasRaw);

  const addQuotaAtIndex = (index: number, newItem: Quota) => {
    setQuota((prevItems) => [
      ...prevItems.slice(0, index),
      newItem,
      ...prevItems.slice(index),
    ]);
  };

  const addNewQuota = (index: number) => {
    return () => {
      console.log(`Creating new quota at position ${index + 1}`);
      if(quota[index].state === 'Pendiente'){
        const newQuota: Quota = {
            quotaName: "Nuevo",
            quotaDebt: 0,
            percentage: 0,
            dateToPay: "",
            payDate: "",
            state: "Pendiente",
            paymentMethod: "",
          };
          const indexToAdd = index + 1;
    
          addQuotaAtIndex(indexToAdd, newQuota);
      }
     

      setAppStatus(APP_STATUS.UPDATE);
    };
  };

  const updatePercentage = (index: number, valueToCalculate: number) => {
    setQuota((prevItems) =>
      prevItems.map((item, idx) =>
        idx === index
          ? { ...item, percentage: item.percentage + valueToCalculate }
          : item
      )
    );
  };

  const addPercentage = (index: number) => {
    return () => updatePercentage(index, 1);
  };

  const substractPercentage = (index: number) => {
    return () => updatePercentage(index, -1);
  };

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
            <button className="o-button-navbar-debt">
              Editar <FiEdit2 />
            </button>
          )}
          {(appStatus === APP_STATUS.UPDATE ||
            appStatus === APP_STATUS.CREATE) && (
            <button className="o-button-navbar-debt-update">Guardar</button>
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
            />
          ))}
      </div>
    </div>
  );
}

export { Pagos };
