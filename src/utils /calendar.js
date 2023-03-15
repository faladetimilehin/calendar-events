import dayjs from 'dayjs'


export const generateDate = (month = dayjs().month(),
  year = dayjs().year()
) => {
  const firstDateofMonth = dayjs().year(year).month(month).startOf("month");

  const lastDateofMonth = dayjs().year(year).month(month).endOf("month");

  const arrayofDate = []

  //create prefix date 
  for (let i = 0; i < firstDateofMonth.day(); i++) {
    arrayofDate.push({
      currentMonth: false,
      date: firstDateofMonth.day(i)
    });
  }

  // generating the current date 
  for (let i = firstDateofMonth.date(); i <= lastDateofMonth.date(); i++) {
    arrayofDate.push({
      date: firstDateofMonth.date(i),
      currentMonth: true,
      today: firstDateofMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    })
  }

  const remaining = 42 - arrayofDate.length

  for (
    let i = lastDateofMonth.date() + 1;
    i <= lastDateofMonth.date() + remaining;
    i++
  ) {
    arrayofDate.push({
      date: lastDateofMonth.date(i),
      currentMonth: false,
    })
  }

  return arrayofDate;
}

export const months = [
  "January",

  "February",

  "March",

  "April",

  "May",

  "June",

  "July",

  "August",

  "September",

  "October",

  "November",

  "December",

]