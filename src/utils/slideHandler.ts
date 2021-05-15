const createCoverHandler = (target: number) => {
  const createCover = document.getElementById('createCover') as HTMLImageElement;
  if (target !== 6) {
    createCover.style.display = '';
  } else {
    createCover.style.display = 'none';
  }
};

export const prevHandler = () => {
  let curCheck: number = 7;
  for (let i = 1; i < 7; i++) {
    const curInput = document.getElementById(`t-${i}`) as HTMLInputElement;
    if (curInput.checked) {
      if (i !== 1) {
        curCheck = i;
      }
    }
  }
  const input = document.getElementById(`t-${curCheck - 1}`) as HTMLInputElement;
  input.checked = true;
  createCoverHandler(curCheck - 1);
};

export const nextHandler = () => {
  let curCheck: number = 0;
  for (let i = 1; i < 7; i++) {
    const curInput = document.getElementById(`t-${i}`) as HTMLInputElement;
    if (curInput.checked) {
      if (i !== 6) {
        curCheck = i;
      }
    }
  }
  const input = document.getElementById(`t-${curCheck + 1}`) as HTMLInputElement;
  input.checked = true;
  createCoverHandler(curCheck + 1);
};

export const clickHandler = (idx: number) => {
  const input = document.getElementById(`t-${idx}`) as HTMLInputElement;
  input.checked = true;
  createCoverHandler(idx);
};

export const pressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
    prevHandler();
  } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
    nextHandler();
  }
};

const delayArr: number[] = [0];
export const wheelHandler = (e: React.WheelEvent<HTMLDivElement>) => {
  const body = document.getElementsByTagName('body')[0] as HTMLBodyElement;
  body.style.overflow = 'hidden';
  body.style.paddingRight = '15px';
  if (delayArr[0] === 0) {
    if (e.deltaY > 0) {
      delayArr[0] = -1;
      prevHandler();
    } else if (e.deltaY < 0) {
      delayArr[0] = 1;
      nextHandler();
    }

    setTimeout(() => {
      delayArr[0] = 0;
    }, 100);
  }
  body.style.overflow = 'scroll';
  body.style.paddingRight = '0px';
};
