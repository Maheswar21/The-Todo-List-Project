let addUserFormEl = document.getElementById('addUserForm');
let nameEl = document.getElementById("name");
let emailEl = document.getElementById("email");
let nameErrMsgEl = document.getElementById("nameErrMsg");
let emailErrMsgEl = document.getElementById("emailErrMsg");
let statusEl = document.getElementById("status");
let genderMaleEl = document.getElementById("genderMale");
let genderFemaleEl = document.getElementById("genderFemale");

let formDetails = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
};

nameEl.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        nameErrMsgEl.textContent = "Required*";
    } else {
        nameErrMsgEl.textContent = "";
    }
    formDetails.name = event.target.value;
});

emailEl.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        emailErrMsgEl.textContent = "Required*";
    } else {
        emailErrMsgEl.textContent = "";
    }
    formDetails.email = event.target.value;
});

function workingStatus(event) {
    formDetails.status = event.target.value;
}

function genderMale(event) {
    formDetails.gender = event.target.value;
}

function genderFemale(event) {
    formDetails.gender = event.target.value;
}

statusEl.addEventListener("change", workingStatus);

genderMaleEl.addEventListener("change", genderMale);

genderFemaleEl.addEventListener("change", genderFemale);

function validateData(formDetails) {
    let {
        name,
        email
    } = formDetails;
    if (name === "") {
        nameErrMsgEl.textContent = "Required*";
    }
    if (email === "") {
        emailErrMsgEl.textContent = "Required*";
    }
}

function serverResponse(formDetails) {
    let url = "https://gorest.co.in/public/v2/users";
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer bf7cdb7cf989b847a7c2fc2e8fdbc58a84d7866c779c26e93c18b99d74a7f630"
        },
        body: JSON.stringify(formDetails)
    };

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
              console.log(jsonData);
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === "has already been taken") {
                    emailErrMsgEl.textContent = "Email Already Exists";
                }
            }
        });
}

addUserFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    validateData(formDetails);
    serverResponse(formDetails);
});