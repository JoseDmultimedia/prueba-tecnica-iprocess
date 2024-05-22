import "./QuotaCardUpdate.css";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface Props{
    quotaName : string,
    quotaDebt: number, 
    currency: string,
    percentage: number,
    dateToPay: string,
    state: string,
    addPercentage : () => void,
    substractPercentage: () => void
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
        substractPercentage
    } = props;

    const isInputDisabled = state === 'Pagado' ? true : false;
    const formatDate = dayjs(dateToPay);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

  return (
    <>
      <div className="o-quotas-update">
        <span></span>
        <form className="o-form-quotas-update" onSubmit={handleSubmit}>
          <div className="o-container-input">
            <input type="text" disabled={isInputDisabled} value={quotaName}/>
            <div> <span>{quotaDebt}</span> <span>{currency}</span></div>
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
              // onChange={(newValue) => setValue(newValue)}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export { QuotaCardUpdate };
