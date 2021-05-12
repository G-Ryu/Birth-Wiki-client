const curNow = new Date();
const curDay = curNow.getDate();
const curMonth = curNow.getMonth() + 1;
const curYear = curNow.getFullYear();

export const pressYear = (
  event: React.KeyboardEvent<HTMLInputElement>,
  setWarning: React.Dispatch<React.SetStateAction<boolean>>,
  setInputYear: React.Dispatch<React.SetStateAction<string>>,
) => {
  setWarning(false);
  const target = event.target as HTMLInputElement;
  const numValue = Number(target.value) <= 0 ? '' : Number(target.value);

  target.value = numValue > curYear ? String(curYear) : String(numValue);
  setInputYear(target.value);
  if (target.value.length === 4) {
    document.getElementById('month')!.focus();
  }

  if (event.key === 'Enter') {
    document.getElementById('month')!.focus();
  }
};

export const pressMonth = (
  event: React.KeyboardEvent<HTMLInputElement>,
  setWarning: React.Dispatch<React.SetStateAction<boolean>>,
  setInputMonth: React.Dispatch<React.SetStateAction<string>>,
  inputYear: string,
) => {
  setWarning(false);
  const target = event.target as HTMLInputElement;
  const numValue = Number(target.value) <= 0 ? '' : Number(target.value);

  if (inputYear === String(curYear)) {
    target.value = numValue > curMonth ? String(curMonth) : String(numValue);
  } else {
    target.value = numValue > 12 ? '12' : String(numValue);
  }
  setInputMonth(target.value);

  if (Number(target.value) > 1) {
    document.getElementById('day')!.focus();
  }

  if (event.key === 'Enter') {
    document.getElementById('day')!.focus();
  }
};

export const pressDay = (
  event: React.KeyboardEvent<HTMLInputElement>,
  setWarning: React.Dispatch<React.SetStateAction<boolean>>,
  setInputDay: React.Dispatch<React.SetStateAction<string>>,
  inputYear: string,
  inputMonth: string,
) => {
  setWarning(false);
  const target = event.target as HTMLInputElement;
  const numValue = Number(target.value) <= 0 ? '' : Number(target.value);

  let lastDate: number = new Date(Number(inputYear), Number(inputMonth), 0).getDate();

  if (inputYear === String(curYear) && inputMonth === String(curMonth)) {
    target.value = numValue >= curDay ? String(curDay - 1) : String(numValue);
  } else {
    target.value = numValue > lastDate ? String(lastDate) : String(numValue);
  }
  setInputDay(target.value);

  if (event.key === 'Enter') {
    birthwikiHandler(inputYear, inputMonth, target.value, setWarning);
    document.getElementById('day')!.blur();
    return;
  }
};

export const blurYear = (
  event: React.FocusEvent<HTMLInputElement>,
  setInputYear: React.Dispatch<React.SetStateAction<string>>,
) => {
  const target = event.target as HTMLInputElement;
  const numValue = Number(target.value);

  if (numValue > curYear) {
    target.value = String(curYear);
  } else {
    target.value = String(numValue);
  }
  setInputYear(target.value);
};

export const blurMonth = (
  event: React.FocusEvent<HTMLInputElement>,
  setInputMonth: React.Dispatch<React.SetStateAction<string>>,
  inputYear: string,
) => {
  const target = event.target as HTMLInputElement;
  const numValue = Number(target.value);

  if (inputYear === String(curYear) && numValue > curMonth) {
    target.value = String(curMonth);
  } else if (numValue > 12) {
    target.value = '12';
  } else {
    target.value = String(numValue);
  }
  setInputMonth(target.value);
};

export const blurDay = (
  event: React.FocusEvent<HTMLInputElement>,
  setInputDay: React.Dispatch<React.SetStateAction<string>>,
  inputYear: string,
  inputMonth: string,
) => {
  const target = event.target as HTMLInputElement;
  const numValue = Number(target.value);
  const lastDate: number = new Date(Number(inputYear), Number(inputMonth), 0).getDate();

  if (inputYear === String(curYear) && inputMonth === String(curMonth) && numValue >= curDay) {
    target.value = String(curDay - 1);
  } else if (numValue >= lastDate) {
    target.value = String(lastDate);
  } else {
    target.value = String(numValue);
  }
  setInputDay(target.value);
};

export const birthwikiHandler = (
  inputYear: string,
  inputMonth: string,
  inputDay: string,
  setWarning: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (Number(inputYear) > 0 && Number(inputMonth) > 0 && Number(inputDay) > 0) {
    const selectDate = inputYear + '-' + inputMonth + '-' + inputDay;
    window.location.href = `${process.env.REACT_APP_CLIENT_URL}/main/${selectDate}`;
  } else {
    setWarning(true);
  }
};
