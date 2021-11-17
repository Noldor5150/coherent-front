const data = [
    {
        name: "Economics",
        profile: [
            {
                name: "Management",
                auditorium: [
                    { name: "1", maxCapacity: 5 },
                    { name: "3", maxCapacity: 10 },
                    { name: "4", maxCapacity: 55 },
                    { name: "1110", maxCapacity: 88 }
                ]
            },
            {
                name: "Finance",
                auditorium: [
                    { name: "2", maxCapacity: 51 },
                    { name: "101", maxCapacity: 9 },
                    { name: "102", maxCapacity: 59 }
                ]
            }
        ]
    },
    {
        name: "Chemistry",
        profile: [
            {
                name: "BioChemistry",
                auditorium: [
                    { name: "5", maxCapacity: 6 },
                    { name: "111", maxCapacity: 11 },
                    { name: "112", maxCapacity: 41 }
                ]
            },
            {
                name: "Farmacy",
                auditorium: [
                    { name: "6", maxCapacity: 15 },
                    { name: "17", maxCapacity: 101 },
                    { name: "18", maxCapacity: 155 }
                ]
            }
        ]
    }
]

const studentsData = [
    {
        name: "Aliona",
        surname: "Apina",
        auditoriumName: "18",
        faculty: "Chemistry",
        profile: "Farmacy",
        country: "ru",
    },
    {
        name: "Alina",
        surname: "Gudkova",
        auditoriumName: "18",
        faculty: "Chemistry",
        profile: "Farmacy",
        country: "ru",
    },
    {
        name: "Polina",
        surname: "Alijeva",
        auditoriumName: "18",
        faculty: "Chemistry",
        profile: "Farmacy",
        country: "By",
    },
    {
        name: "Paulaz",
        surname: "ZLyden",
        auditoriumName: "2",
        faculty: "Economics",
        profile: "Finance",
        country: "ltu",
    },
    {
        name: "Baltas",
        surname: "Zirgas",
        auditoriumName: "101",
        faculty: "Economics",
        profile: "Finance",
        country: "lat",
    },
    {
        name: "Paolo",
        surname: "Emilio",
        auditoriumName: "1",
        faculty: "Economics",
        profile: "Management",
        country: "ita",
    },
    {
        name: "Paolo",
        surname: "Emilio2",
        auditoriumName: "1110",
        faculty: "Economics",
        profile: "Management",
        country: "ita",
    },
    {
        name: "Paolo",
        surname: "Emilio3",
        auditoriumName: "1110",
        faculty: "Economics",
        profile: "Management",
        country: "ita",
    },
    {
        name: "Paolo",
        surname: "Emilio5",
        auditoriumName: "1110",
        faculty: "Economics",
        profile: "Management",
        country: "ita",
    },
    {
        name: "Dmitrij",
        surname: "Donskoj",
        auditoriumName: "3",
        faculty: "Economics",
        profile: "Management",
        country: "ru",
    },
]
const auditoriumData = [
    
    { name: "6", maxCapacity: 15, profile: "Farmacy", faculty:"Chemistry",quantity: 0 },
    { name: "17", maxCapacity: 101, profile: "Farmacy", faculty: "Chemistry", quantity: 0 },
    { name: "18", maxCapacity: 155, profile: "Farmacy", faculty: "Chemistry", quantity: 3 },
    { name: "5", maxCapacity: 6, profile: "Biochemistry", faculty: "Chemistry", quantity: 3  },
    { name: "111", maxCapacity: 11, profile: "Biochemistry", faculty: "Chemistry", quantity: 3 },
    { name: "112", maxCapacity: 41, profile: "Biochemistry", faculty: "Chemistry", quantity: 0 },
    { name: "2", maxCapacity: 51, profile: "Finance", faculty: "Economics", quantity: 1 },
    { name: "101", maxCapacity: 9, profile: "Finance", faculty: "Economics", quantity: 1 },
    { name: "102", maxCapacity: 59, profile: "Finance", faculty: "Economics", quantity: 0 },
    { name: "1", maxCapacity: 5, profile: "Management", faculty: "Economics", quantity: 1 },
    { name: "3", maxCapacity: 10, profile: "Management", faculty: "Economics", quantity: 1 },
    { name: "4", maxCapacity: 55, profile: "Management", faculty: "Economics", quantity: 0 },
    { name: "1110", maxCapacity: 88, profile: "Management", faculty: "Economics", quantity: 3}
]


const requestURL = "http://lyceumexams.herokuapp.com/api/dictionary";

async function sendRequest(method, url, body = null) {
  return await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.responseType = 'json'
   // xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response)
      } else {
        resolve(xhr.response)
      }
    }
    xhr.onerror = () => {
      reject(xhr.response)
    }
    xhr.send(JSON.stringify(body))
  })
}



let someData = {};

  
window.addEventListener('DOMContentLoaded', async event => {
    createFacultyOptions(data);
   const result = await sendRequest('GET', requestURL)
    someData = result;
    console.log('result', result);
  
    console.log('test', Object.keys(result.audiences)
    .map(key => ({id: String(key), name: result.audiences[key]})));
});

let facultySelector = document.getElementById('faculty');
let profileSelector = document.getElementById('profile');
let auditoriumSelector = document.getElementById('auditorium');
let mainTable = document.getElementById("mainTable");
let secondaryTable = document.getElementById("secondaryTable");
let auditoriumNameTh = document.getElementById("thStudentAuditorium");
let studentNameTh = document.getElementById("thStudentName");

studentNameTh.addEventListener('click', (event) => {
    addSpan();
});

function addSpan(){
    const state = getCurrentStateArray();
    let spanUp = document.createElement("span");
    spanUp.id="spanUp";
    spanUp.classList.add("span-padding");
    let lastSpan = document.getElementById("spanUp");
    if (typeof(lastSpan) != 'undefined' && lastSpan != null)
       {
        if(lastSpan.textContent === "ASC"){
            spanUp.textContent = "DSC";
            mainTableItem(state.sort((a,b)=> (a.name < b.name ? 1 : -1)));
        }
        else{
            spanUp.textContent ="ASC";
            mainTableItem(state.sort((a,b)=> (a.name > b.name ? 1 : -1)));
        }
        lastSpan.remove();
       }
       else{
        spanUp.textContent = "ASC";
        mainTableItem(state.sort((a,b)=> (a.name > b.name ? 1 : -1)));
       }
    studentNameTh.appendChild(spanUp);
}

facultySelector.addEventListener('change', (event) => {
    profileSelector.innerHTML = '';
    const profileData = data.find(item => item.name === event.target.value);
    createProfileOptions(profileData.profile);
    filterStudentsByFaculty(event.target.value);
    filterAuditoriumsByFaculty(event.target.value);
    loadAuditoriums();
    console.log(someData);
   
});

profileSelector.addEventListener('change', (event) => {
    auditoriumSelector.innerHTML = '';
    if (profileSelector.value === "All") {
        let profileData = data.find(item => item.name === facultySelector.value);
        const result = [...new Set([].concat(...profileData.profile.map((o) => o.auditorium)))];
        createAuditoriumOptions(result);
        filterStudentsByFaculty(facultySelector.value);
        filterAuditoriumsByFaculty(facultySelector.value);
    }
    else {
        let selectedProfileValue = null;
        data.forEach(faculty => {
            const foundElement = faculty.profile.find(
                profile => profile.name === event.target.value);
            if (foundElement) {
                selectedProfileValue = foundElement
            }
        });
        createAuditoriumOptions(selectedProfileValue.auditorium);
        filterStudentsByProfile(event.target.value);
        filterAuditoriumsByProfile(event.target.value);
    }
});

auditoriumSelector.addEventListener('change', (event) => {
    if (event.target.value === "All") {
        if (profileSelector.value === "All") {
            filterAuditoriumsByFaculty(facultySelector.value);
            filterStudentsByFaculty(facultySelector.value);
        }
        else {
            filterAuditoriumsByProfile(profileSelector.value);
            filterStudentsByProfile(profileSelector.value);
        }
    }
    else {
        filterStudentsByAuditorium(event.target.value)
    }
})

function createFacultyOptions(data) {
    let allOption = document.createElement('option');
    allOption.value = " ";
    allOption.textContent = " ";
    facultySelector.appendChild(allOption);
    data.forEach((item, index) => {
        let option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name;
        facultySelector.appendChild(option);
    })
}

function createProfileOptions(data) {
    let allOption = document.createElement('option');
    allOption.value = "All";
    allOption.textContent = "All";
    profileSelector.appendChild(allOption)
    data.forEach(item => {
        let option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name;
        profileSelector.appendChild(option);
    })
}

function createAuditoriumOptions(data) {
    let allOption = document.createElement('option');
    allOption.value = "All";
    allOption.textContent = "All";
    auditoriumSelector.appendChild(allOption);
    data.forEach(item => {
        let option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name;
        auditoriumSelector.appendChild(option);
    })
}

function loadAuditoriums() {
    auditoriumSelector.innerHTML = '';
    let profileData = data.find(item => item.name === facultySelector.value);
    const result = [...new Set([].concat(...profileData.profile.map((o) => o.auditorium)))];
    createAuditoriumOptions(result);
}

function mainTableItem(filteredData) {
    document.getElementById('mainTableBody')?.remove();
    let tbody = document.createElement("tbody");
    tbody.id = 'mainTableBody';
    filteredData.forEach((student, index) => {
        let trElement = document.createElement("tr");
        let thIndex = document.createElement("th");
        let thName = document.createElement("th");
        let thAuditorium = document.createElement("th");
        let thFaculty = document.createElement("th");
        let thCountry = document.createElement("th");
        thIndex.textContent = index + 1;
        thName.textContent = student.name;
        thAuditorium.textContent = student.auditoriumName;
        thFaculty.textContent = student.faculty;
        thCountry.textContent = student.country;
        trElement.appendChild(thIndex);
        trElement.appendChild(thName);
        trElement.appendChild(thAuditorium);
        trElement.appendChild(thFaculty);
        trElement.appendChild(thCountry);
        tbody.appendChild(trElement);
    })
    mainTable.appendChild(tbody);
}

function secondaryTableItem(filteredData) {
    document.getElementById('secondaryTableBody')?.remove();
    let tbody = document.createElement("tbody");
    tbody.id = 'secondaryTableBody';
    filteredData.forEach(auditorium => {
        let trElement = document.createElement("tr");
        let thAuditoriumName = document.createElement("th");
        let thStudentsQuantity = document.createElement("th");
        let thMaxCapacity = document.createElement("th");
        let thCountry = document.createElement("th");
        thAuditoriumName.textContent = auditorium.name;
        thStudentsQuantity.textContent = auditorium.quantity;
        thMaxCapacity.textContent = auditorium.maxCapacity;
        thCountry.textContent = auditorium.country;
        trElement.appendChild(thAuditoriumName);
        trElement.appendChild(thStudentsQuantity);
        trElement.appendChild(thMaxCapacity);
        trElement.appendChild(thCountry);
        tbody.appendChild(trElement);
    })
    secondaryTable.appendChild(tbody);
}

function filterStudentsByFaculty(selectedFaculty) {
    const result = studentsData.filter(student => student.faculty === selectedFaculty);
    mainTableItem(result);
}

function filterStudentsByProfile(selectedProfile) {
    const result = studentsData.filter(student => student.profile === selectedProfile);
    mainTableItem(result);
}

function filterAuditoriumsByFaculty(selectedFaculty) {
    const result = auditoriumData.filter(auditorium => auditorium.faculty === selectedFaculty);
    secondaryTableItem(result);
}
function filterAuditoriumsByProfile(selectedProfile) {
    const result = auditoriumData.filter(auditorium => auditorium.profile === selectedProfile);
    secondaryTableItem(result);
}

function filterStudentsByAuditorium(auditoriumName) {
    const result = studentsData.filter(student => student.auditoriumName === auditoriumName);
    mainTableItem(result);
}

function getCurrentStateArray(){
    let state = [];
    
    if(profileSelector.value === "All"){
        state = studentsData.filter(student => student.faculty === facultySelector.value);
    }
    else {
        state = studentsData.filter(student => student.profile === profileSelector.value);
    }
  return state;
}

