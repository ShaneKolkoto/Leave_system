async function calculateDays(start_date, end_date) {
  let date_1 = new Date(end_date);
  let date_2 = new Date(start_date);

  const days = (date_1, date_2) => {
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  };

  return days(date_1, date_2);
}

module.exports = calculateDays;
