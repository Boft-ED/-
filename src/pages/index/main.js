require('../../assets/scss/main.scss');
require('./page.scss');

document.addEventListener('DOMContentLoaded', () => {
  const prevWeekBtn = document.getElementById('prevWeekBtn');
  const nextWeekBtn = document.getElementById('nextWeekBtn');

  const events = [
    {
      date: '2023-07-17',
      time: '09:00',
      duration: 60,
      activity: 'Танцы',
      instructor: 'Ивана Вонг',
      color: 'sky',
    },
    {
      date: '2023-07-18',
      time: '10:00',
      duration: 60,
      activity: 'Музыка',
      instructor: 'Ивана Вонг',
      color: 'yellow',
    },
    {
      date: '2023-07-19',
      time: '09:00',
      duration: 120,
      activity: 'Йога',
      instructor: 'Марта Хили',
      color: 'green',
    },
    {
      date: '2023-07-19',
      time: '12:00',
      duration: 90,
      activity: 'Искусство',
      instructor: 'Кейт Элли',
      color: 'purple',
    },
    {
      date: '2023-07-20',
      time: '09:30',
      duration: 90,
      activity: 'Английский',
      instructor: 'Джеймс Смит',
      color: 'pink',
    },
    {
      date: '2023-07-20',
      time: '14:00',
      duration: 120,
      activity: 'Танцы',
      instructor: 'Ивана Вонг',
      color: 'sky',
    },
    {
      date: '2023-07-21',
      time: '10:30',
      duration: 90,
      activity: 'Музыка',
      instructor: 'Ивана Вонг',
      color: 'yellow',
    },
    {
      date: '2023-07-21',
      time: '13:00',
      duration: 60,
      activity: 'Искусство',
      instructor: 'Кейт Элли',
      color: 'purple',
    },
    {
      date: '2023-07-28',
      time: '14:30',
      duration: 120,
      activity: 'Йога',
      instructor: 'Марта Хили',
      color: 'green',
    },
    {
      date: '2023-07-29',
      time: '11:00',
      duration: 90,
      activity: 'Музыка',
      instructor: 'Ивана Вонг',
      color: 'yellow',
    },
  ];

  const currentDate = new Date();
  let currentWeek = getStartOfWeek(currentDate);

  const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  function getStartOfWeek(date) {
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  function updateCalendar() {
    const table = document.getElementById('calendar');
    const currentMonthElement = document.getElementById('currentMonth');

    table.innerHTML = '';
    currentMonthElement.textContent = '';

    const headerRow = table.insertRow();
    headerRow.classList.add('bg-light-gray');
    headerRow.innerHTML = '<th class="text-uppercase">Время</th>';
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentWeek);
      day.setDate(currentWeek.getDate() + i);
      const dayLabel = day.getDate();
      const monthLabel = monthNames[day.getMonth()];
      headerRow.innerHTML += `<th class="text-uppercase">${monthLabel} ${dayLabel}</th>`;
    }

    for (let hour = 9; hour <= 13; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const row = table.insertRow();
        const timeCell = row.insertCell();
        timeCell.classList.add('align-middle');
        timeCell.textContent = `${hour.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}`;

        for (let i = 0; i < 7; i++) {
          const day = new Date(currentWeek);
          day.setDate(currentWeek.getDate() + i);
          const dateString = `${day.getFullYear()}-${(day.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${day.getDate().toString().padStart(2, '0')}`;

          const activityCell = row.insertCell();
          const event = events.find(
            (ev) =>
              ev.date === dateString &&
              ev.time ===
                `${hour.toString().padStart(2, '0')}:${minutes
                  .toString()
                  .padStart(2, '0')}`
          );

          if (event) {
            const activityDuration = event.duration;
            activityCell.innerHTML = `<span class="activity bg-${
              event.color
            } padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">${
              event.activity
            }</span>
                <div class="margin-10px-top font-size14">${
                  event.time
                }-${addMinutes(event.time, activityDuration)}</div>
                <div class="font-size13 text-light-gray">${
                  event.instructor
                }</div>`;
            if (new Date(dateString) < currentDate) {
              activityCell.classList.add('past-event');
            }
          } else {
            activityCell.classList.add('bg-light-gray');
          }
        }
      }
    }
    const startOfWeekMonth = monthNames[currentWeek.getMonth()];
    const endOfWeek = new Date(currentWeek);
    endOfWeek.setDate(currentWeek.getDate() + 6);
    const endOfWeekMonth = monthNames[endOfWeek.getMonth()];
    currentMonthElement.textContent = `${startOfWeekMonth} ${currentWeek.getDate()} - ${endOfWeekMonth} ${endOfWeek.getDate()}, ${currentWeek.getFullYear()}`;
  }

  function addMinutes(timeString, minutesToAdd) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + minutesToAdd;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    return `${newHours.toString().padStart(2, '0')}:${newMinutes
      .toString()
      .padStart(2, '0')}`;
  }

  prevWeekBtn.addEventListener('click', () => {
    prevWeek();
  });

  nextWeekBtn.addEventListener('click', () => {
    nextWeek();
  });

  function prevWeek() {
    const prevWeekDate = new Date(currentWeek);
    prevWeekDate.setDate(currentWeek.getDate() - 7);
    if (prevWeekDate >= currentDate) {
      currentWeek = prevWeekDate;
      updateCalendar();
      highlightToday();
    }
  }

  function nextWeek() {
    const nextWeekDate = new Date(currentWeek);
    nextWeekDate.setDate(currentWeek.getDate() + 7);
    const maxDate = new Date(currentDate);
    maxDate.setDate(maxDate.getDate() + 14);
    if (nextWeekDate <= maxDate) {
      currentWeek = nextWeekDate;
      updateCalendar();
      highlightToday();
    }
  }

  function highlightToday() {
    const table = document.getElementById('calendar');
    const today = new Date();
    const currentMonth = currentWeek.getMonth();

    const cells = table.querySelectorAll('td');
    cells.forEach((cell) => cell.classList.remove('highlight-today'));

    for (let i = 1; i <= 7; i++) {
      const columnDate = new Date(currentWeek);
      columnDate.setDate(currentWeek.getDate() + (i - 1));

      if (
        columnDate.getMonth() === currentMonth &&
        columnDate.getDate() === today.getDate()
      ) {
        const column = table.querySelectorAll(`tr td:nth-child(${i + 1})`);
        column.forEach((cell) => cell.classList.add('highlight-today'));
        break;
      }
    }
  }

  updateCalendar();
  highlightToday();
});
