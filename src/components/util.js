import periodic from "contained-periodic-values";



  export function betweenWithoutWeekend(start, end, hoursPerDay){
    const startDay = start.day();
    const total = end.diff(start, "days", true)
    const sun = periodic(startDay, total + startDay, 0, 7);
    const satur = periodic(startDay, total + startDay, 6, 7);
  
    const days = Math.floor(total-(sun+satur));
    const hours = Math.floor((total-(sun+satur+days))*hoursPerDay)
  
  
    return `${days == 0 ? '':`${days} j`} ${hours == 0 ? '' :`${hours} h`} `;
  }



