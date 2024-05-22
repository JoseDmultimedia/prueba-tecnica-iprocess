import "./QuotaCardUpdate.css";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

interface Props{
    quotaName : string,
    quotaDebt: number, 
    currency: string,
    percentage: number,
    dateToPay: string,
    state: string,
    addPercentage : () => void,
    substractPercentage: () => void,
    handleInputChange: (name: string, value: string | Dayjs | null) => void
}

function QuotaCardUpdate(props : Props) {
    const {
        quotaName,
        quotaDebt,
        currency,
        percentage,
        dateToPay,
        state,
        addPercentage,
        substractPercentage,
        handleInputChange
    } = props;

    const isInputDisabled = state === 'Pagado' ? true : false;
    const formatDate = dayjs(dateToPay);

    const handleLocalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      handleInputChange(name, value);
    }

    const handleLocalDateChange = (newValue : Dayjs | null) => {
      handleInputChange('dateToPay', newValue);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

  return (
    <>
      <div className="o-quotas-update">
        <span></span>
        <form className="o-form-quotas-update" onSubmit={handleSubmit}>
          <div className="o-container-input">
            <input type="text" disabled={isInputDisabled} value={quotaName} name="quotaName" onChange={handleLocalInputChange}/>
            <div className="o-debt-text"> <p>{quotaDebt}</p> <p>{currency}</p></div>
          </div>
          <div className="o-container-percentage">
            <input type="button" value={"-"} disabled={isInputDisabled} onClick={substractPercentage}/>
            <p>{percentage} %</p>
            <input type="button" value={"+"} disabled={isInputDisabled} onClick={addPercentage}/>
          </div>
          <div className="o-container-datepicker">
            <DatePicker
              label="Vence"
              disablePast={true}
              value={formatDate}
              sx={{fontSize:'14px', width:'150px', '& .MuiIconButton-root': {color: '#FC4024'}}}
              name="dateToPay"
              onChange={handleLocalDateChange}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export { QuotaCardUpdate };
