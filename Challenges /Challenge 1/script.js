// scripts.js

// You are to ensure that the following is displayed for each individual on the page (matching each individual with their specific section element).

// Each section should contain the following:

// An "h2" title that shows the id property of the athlete
// A "description list" that matches values (<dd>) with keys (<dt>). These key/values should be as follows:
// "Full name" (firstName and surname) of athlete
// The "total recorded amount of races" they ran as a number. For example 3 or 5
// The "date of the last race" they ran should be formatted as d MMM YYYY in accordance with the TR35 standard, For example, 7 Oct 2022.
// The "total time" it took to complete the last race also formatted with the "TR35" standard as "hh:mm". For example, 91 minutes will be 01:31.

// Note that while the total time is not stored directly in the data structure, each individual lap time (as minutes) is saved in an array. Keep in mind that all races always have four laps.

// Also, note that all races are currently stored in the order that occurred. This means that you will need to reverse the order if you want to target the first race, or you will need to find a way to target the last race that has been logged for each.

// Currently, the code below does not want to run. However please fix it so that it displays the correct information as follows:

// Athlete: Nwabisa Masiko
// Total Races: 2
// Event Date (Latest): 2 Dec 2022
// Total Time (Latest): 00:28
// Athlete: Schalk Venter
// Total Races: 4
// Event Date (Latest): 9 Dec 2022
// Total Time (Latest): 00:37

// Summary:

// "Extract" each athlete’s data from the provided object
// Each athlete’s id must be displayed in an "<h2>" element
// A "<dl>" element should display the following for each athlete:
// "Fullname" (Firstname and Surname)
// Number of races
// Date of most recent race (format: d MMM YYYY)
// Duration of most recent race (format: hh:mm)


// scripts.js

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const data = {
  response: {
    requestType: "FETCH_ATHLETE_DATA",
    requestBy: "ALL_MATCHING_ATHLETES",
    forDisplay: "BEST_RACES",

    data: {
      NM372: {
        firstName: "Nwabisa",
        surname: "Masiko",
        id: "NM372",
        races: [
          {
            date: '2022-11-18T20:00:00.000Z',
            time: [9, 7, 8, 6],
          },
          {
            date: '2022-12-02T20:00:00.000Z',
            time: [6, 7, 8, 7],
          },
        ],
      },

      SV782: {
        firstName: "Schalk",
        surname: "Venter",
        id: "SV782",
        races: [
          {
            date: '2022-11-18T20:00:00.000Z',
            time: [10, 8, 3, 12],
          },
          {
            date: '2022-11-25T20:00:00.000Z',
            time: [6, 8, 9, 11],
          },
          {
            date: '2022-12-02T20:00:00.000Z',
            time: [10, 11, 4, 8],
          },
          {
            date: '2022-12-09T20:00:00.000Z',
            time: [9, 8, 9, 11],
          },
        ],
      },
    },
  },
};

// Only edit below this comment

const createHtml = (athlete) => {
  const {firstName, surname, id, races} = athlete
  const {date, time} = races[races.length - 1]

  const fragment = document.createDocumentFragment();

  title = document.createElement("h2");
  title.innerHTML = id;
  fragment.appendChild(title);

  const list = document.createElement("dl");

  const day = new Date(date).getDate();
  const month = MONTHS[new Date(date).getMonth()];
  const year = new Date(date).getFullYear();

  const [first, second, third, fourth] = time;
  total = first + second + third + fourth;

  const hours = total / 60;
  const minutes = total / hours / 60;

  list.innerHTML = /* html */ `
    <dt>Athlete: </dt>
    <dd>${firstName} ${surname}</dd>

    <dt>Total Races: </dt>
    <dd>${races.length}</dd>

    <dt>Event Date (Latest): </dt>
    <dd>${day} ${month} ${year}</dd>

    <dt>Total Time (Latest): </dt>
    <dd>${(new Date(hours).getUTCHours()).toString().padStart(2, '0')}:${(new Date(minutes).getUTCMinutes()).toString().padStart(2, '0')}</dd>
  `;

  return fragment.appendChild(list);
}

const {NM372, SV782} = data.response.data
document.querySelector('[data-athlete="NM372"]').appendChild(createHtml(NM372));
document.querySelector('[data-athlete="SV782"]').appendChild(createHtml(SV782));