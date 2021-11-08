  const data = [
        {
            name: "Fakulteto pavadinimas",
            profiliai: [
                {
                    name: "profilio pav1",
                    kabinetai: ["1", "3"]
                },
                {
                    name: "profilio pav2",
                    kabinetai: ["2", "101", "112"]
                }
            ]
        },
        {
            name: "Fakulteto pavadinimas2",
            profiliai: [
                {
                    name: "profilio pav123",
                    kabinetai: ["4", "8"]
                },
                {
                    name: "profilio pav2123",
                    kabinetai: ["29", "10", "12"]
                }
            ]
        }
    ]

window.addEventListener('load', event => {
    createFacultyOptions(data);
  
});

let facultySelector = document.getElementById('faculty');
let profileSelector = document.getElementById('profile');
let auditoriumSelector = document.getElementById('auditorium');

facultySelector.addEventListener('change', (event) => {
    profileSelector.innerHTML = '';
    const profileData =  data.find(item => item.name === event.target.value);
    createProfileOptions(profileData.profiliai);
    
  });

profileSelector.addEventListener('change', (event) => {
    auditoriumSelector.innerHTML = '';
    let selectedProfileValue = null;

    data.forEach(faculty => {

       const foundElement = faculty.profiliai.find(
           profile => profile.name === event.target.value);
           
           if(foundElement) {
            selectedProfileValue = foundElement
           }
    });

    console.log('selectedProfileValue', selectedProfileValue);
    createAuditoriumOptions(selectedProfileValue.kabinetai);
  });

function createFacultyOptions (data) {
    let allOption = document.createElement('option');
    allOption.value = " ";
    allOption.textContent = " ";
        facultySelector.appendChild(allOption);
    data.forEach((item, index) => {
        let option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name;
        //option.id = index;
        facultySelector.appendChild(option);
    })
}

function createProfileOptions (data) {
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

function createAuditoriumOptions(data){
    let allOption = document.createElement('option');
    allOption.value = "All";
    allOption.textContent = "All";
        auditoriumSelector.appendChild(allOption);
    data.forEach(item => {
        let option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        auditoriumSelector.appendChild(option);
    })
}