let calendar1; // Define calendar1 as a global variable

const isValidate = (calendar1, calendar2, dropdown1, dropdown2, dropdown3) => {
  if (isNaN(calendar1) || isNaN(calendar2) || !dropdown1 || !dropdown2 || !dropdown3) {
    alert('Please fill in all fields.');
    return false;
  }
  if (calendar2 <= calendar1) {
    alert('Calendar 2 date must be greater than Calendar 1 date.');
    return false;
  }
  return true;
};

const onValueChangeCalander1 = (e) => {
  calendar1 = new Date(e.target.value);
  const date2 = new Date(calendar1);
  date2.setFullYear(calendar1.getFullYear() + 1);
  document.getElementById('calendar2').valueAsDate = date2;
};

function generateDates() {
  const calendar2 = new Date(document.getElementById('calendar2').value);
  const dropdown1 = document.getElementById('dropdown1').value;
  const dropdown2 = document.getElementById('dropdown2').value;
  const dropdown3 = document.getElementById('dropdown3').value;

  if (!isValidate(calendar1, calendar2, dropdown1, dropdown2, dropdown3)) return;

  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  const table = document.createElement('table');
  table.border = '1';

  let currentDate = new Date(calendar1);

  while (currentDate <= calendar2) {
    if (
      (dropdown1 === 'all' || parseInt(dropdown1) === getWeekOfMonth(currentDate)) &&
      (dropdown2 === 'all' || getDayNumber(dropdown2) === currentDate.getDay()) &&
      (dropdown3 === 'every' || (dropdown3 === 'alternate' && currentDate.getMonth() % 2 === 0))
    ) {
      const row = table.insertRow(table.rows.length);
      const cell = row.insertCell(0);
      cell.innerHTML = currentDate.toDateString();
    } else {
      console.log('Skipping:', currentDate.toDateString(), parseInt(dropdown1), getWeekOfMonth(currentDate), currentDate);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  outputDiv.appendChild(table);
}

function getDayNumber(dayName) {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days.indexOf(dayName.toLowerCase());
}

function getWeekOfMonth(date) {
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const dayOfMonth = date.getDate();

  const segmentSize = 7;
  const totalSegments = Math.ceil(daysInMonth / segmentSize);

  let segment = Math.ceil(dayOfMonth / segmentSize);
  if (segment > totalSegments) {
    segment = totalSegments;
  }

  return segment;
}

// Attach the event listener to the 'change' event of the first calendar input
document.getElementById('calendar1').addEventListener('change', onValueChangeCalander1);
