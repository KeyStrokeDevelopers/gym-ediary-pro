/* eslint-disable */
export const getAge = (date) => {
  const dateString = new Date(date).toLocaleDateString();
  const now = new Date();
  const today = new Date(now.getYear(), now.getMonth(), now.getDate());

  const yearNow = now.getYear();
  const monthNow = now.getMonth();
  const dateNow = now.getDate();

  const dob = new Date(dateString.substring(6, 10),
    dateString.substring(0, 2) - 1,
    dateString.substring(3, 5)
  );

  const yearDob = dob.getYear();
  const monthDob = dob.getMonth();
  const dateDob = dob.getDate();
  let age = {};
  let ageString = '';
  let yearString = '';
  let monthString = '';
  let dayString = '';
  let monthAge;
  let dateAge;
  let yearAge = yearNow - yearDob;

  if (monthNow >= monthDob) monthAge = monthNow - monthDob;
  else {
    yearAge--;
    monthAge = 12 + monthNow - monthDob;
  }

  if (dateNow >= dateDob) dateAge = dateNow - dateDob;
  else {
    monthAge--;
    dateAge = 31 + dateNow - dateDob;

    if (monthAge < 0) {
      monthAge = 11;
      yearAge--;
    }
  }

  age = {
    years: yearAge,
    months: monthAge,
    days: dateAge
  };

  if (age.years > 1) yearString = ' Years';
  else yearString = ' Year';
  if (age.months > 1) monthString = ' Months';
  else monthString = ' Month';
  if (age.days > 1) dayString = ' Days';
  else dayString = ' Day';


  if ((age.years > 0) && (age.months > 0) && (age.days > 0)) ageString = age.years + yearString + ' ' + age.months + monthString + ' ' + age.days + dayString;
  else if ((age.years == 0) && (age.months == 0) && (age.days > 0)) ageString = 'Only ' + age.days + dayString + ' old';
  else if ((age.years > 0) && (age.months == 0) && (age.days == 0)) ageString = age.years + yearString;
  else if ((age.years > 0) && (age.months > 0) && (age.days == 0)) ageString = age.years + yearString + ' ' + age.months + monthString;
  else if ((age.years == 0) && (age.months > 0) && (age.days > 0)) ageString = age.months + monthString + ' ' + age.days + dayString;
  else if ((age.years > 0) && (age.months == 0) && (age.days > 0)) ageString = age.years + yearString + ' ' + age.days + dayString;
  else if ((age.years == 0) && (age.months > 0) && (age.days == 0)) ageString = age.months + monthString;
  else ageString = 'Oops!';
  return ageString;
};
