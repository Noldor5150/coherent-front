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
                    { name: "111", maxCapacity: 88 }
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
        faculty:"Chemistry",
        profile: "Farmacy",
        country: "ru",
    },
    {
        name: "Alina",
        surname: "Gudkova",
        auditoriumName: "18",
        faculty:"Chemistry",
        profile: "Farmacy",
        country: "ru",
    },
    {
        name: "Polina",
        surname: "Alijeva",
        auditoriumName: "18",
        faculty:"Chemistry",
        profile: "Farmacy",
        country: "By",
    },
    {
        name: "Paulaz",
        surname: "ZLyden",
        auditoriumName: "2",
        faculty:"Economics",
        profile: "Finance",
        country: "ltu",
    },
    {
        name: "Baltas",
        surname: "Zirgas",
        auditoriumName: "101",
        faculty:"Economics",
        profile: "Finance",
        country: "lat",
    },
    {
        name: "Paolo",
        surname: "Emilio",
        auditoriumName: "1",
        faculty:"Economics",
        profile: "Management",
        country: "ita",
    },
    {
        name: "Paolo",
        surname: "Emilio2",
        auditoriumName: "111",
        faculty:"Economics",
        profile: "Management",
        country: "ita",
    },
    {
        name: "Paolo",
        surname: "Emilio3",
        auditoriumName: "111",
        faculty:"Economics",
        profile: "Management",
        country: "ita",
    },
    {
        name: "Paolo",
        surname: "Emilio5",
        auditoriumName: "111",
        faculty:"Economics",
        profile: "Management",
        country: "ita",
    },
    {
        name: "Dmitrij",
        surname: "Donskoj",
        auditoriumName: "3",
        faculty:"Economics",
        profile: "Management",
        country: "ru",
    },
]
const auditorium = [
    {
        name : "713c",
        quantity : 25,
        maxCapacity : 59,
        country : "ltu"
    }
]
window.addEventListener('load', event => {
    createFacultyOptions(data);
   
});

let facultySelector = document.getElementById('faculty');
let profileSelector = document.getElementById('profile');
let auditoriumSelector = document.getElementById('auditorium');
let mainTable = document.getElementById("mainTable");
let seondaryTable = document.getElementById("secondaryTable");

facultySelector.addEventListener('change', (event) => {
    profileSelector.innerHTML = '';
    const profileData = data.find(item => item.name === event.target.value);
    createProfileOptions(profileData.profile);
    filterbyFaculty(event.target.value);
    loadAuditoriums();
   
});

profileSelector.addEventListener('change', (event) => {
    auditoriumSelector.innerHTML = '';
    if (profileSelector.value==="All")
    {
        let profileData = data.find(item => item.name === facultySelector.value);
        const result = [...new Set([].concat(...profileData.profile.map((o) => o.auditorium)))];
        createAuditoriumOptions(result);
        filterbyFaculty(facultySelector.value);
    }
    else
    {
        let selectedProfileValue = null;
        data.forEach(faculty => {
            const foundElement = faculty.profile.find(
                profile => profile.name === event.target.value);
            if (foundElement) {
                selectedProfileValue = foundElement
            }
        });
        createAuditoriumOptions(selectedProfileValue.auditorium);
        filterbyProfile(event.target.value);
    }
});
auditoriumSelector.addEventListener('change', (event) => {
   
    
    if(event.target.value === "All") {
       if(profileSelector.value ==="All"){

       }
       else{

       }
        secondaryTableItem(filteredData);
        
    }
    else{

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

function mainTableItem(filteredData){
    document.getElementById('mainTableBody')?.remove();

    let tbody = document.createElement("tbody");
    tbody.id = 'mainTableBody';
    filteredData.forEach((student, index) =>{
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

function secondaryTableItem(filteredData){
    document.getElementById('secondaryTableBody')?.remove();
    let tbody = document.createElement("tbody");
    tbody.id = 'secondaryTableBody';
    filteredData.forEach(auditorium =>{
      let trElement = document.createElement("tr");
      let thAuditoriumName = document.createElement("th");
      let thStudentsQuantity = document.createElement("th");
      let thMaxCapacity = document.createElement("th");
      let thCountry= document.createElement("th");
     
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

  function filterbyFaculty(selectedFaculty){
     const result = studentsData.filter(student => student.faculty === selectedFaculty);
     mainTableItem(result);

  }

  function filterbyProfile(selectedProfile){
    const result = studentsData.filter(student => student.profile === selectedProfile);
    mainTableItem(result);

 }

 function getAuditoriumListByFaculty(facultyName){
    let filteredData = [];
    console.log(filteredData);
    const selectedFaculty = data.find(faculty => faculty.name === facultyName);
    selectedFaculty.profile.forEach((profile) => {
        filteredData.push(...profile.auditorium)
    });
    filteredData.forEach((item, index) => {
        studentsData.forEach(student => {
            if(student.auditoriumName === item.name) {
                filteredData[index].quantity = 
                filteredData[index].quantity ? filteredData[index].quantity + 1 : 1
            }
        })
    })
    return filteredData;
 }