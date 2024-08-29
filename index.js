document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector(".modal");
    const closebtn = document.querySelector(".close");
    const tableBody = document.querySelector("#dataList");
    const dataform = document.querySelector("#dataform");

    const nameInput = document.querySelector("#nameInput");
    const ageInput = document.querySelector("#ageInput");
    const genderInput = document.querySelector("#genderInput");

    const editIndex = document.querySelector("#editIndex");
    const editNameInput = document.querySelector("#editNameInput");
    const editAgeInput = document.querySelector("#editAgeInput");
    const editGenderInput = document.querySelector("#editGenderInput");

    const editform = document.querySelector("#editform");

    dataform.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = nameInput.value.trim();
        const age = parseInt(ageInput.value);
        const gender = genderInput.value;
        if (name !== "" && !isNaN(age) && gender !== "") {
            const user = {
                name: name,
                age: age,
                gender: gender,
            };
            addToLocalStorage(user);
            localStoreData();
            dataform.reset(); // Corrected from rest to reset
        } else {
            alert("Please fill all the details!");
        }
    });

    editform.addEventListener("submit", function (e) {
        e.preventDefault();
        const index = editIndex.value.trim();
        const editName = editNameInput.value.trim();
        const editAge = parseInt(editAgeInput.value);
        const editGender = editGenderInput.value;
        if (editName !== "" && !isNaN(editAge) && editGender !== "") {
            const storedData = JSON.parse(localStorage.getItem("myData")) || [];
            storedData[index].name = editName;
            storedData[index].age = editAge;
            storedData[index].gender = editGender;
            localStorage.setItem("myData", JSON.stringify(storedData));
            editform.reset(); // Corrected from dataform.rest() to editform.reset()
            modal.style.display = "none";
            localStoreData();
        } else {
            alert("Please fill all the details!");
        }
    });

    function addToLocalStorage(user) {
        const storedData = JSON.parse(localStorage.getItem("myData")) || [];
        storedData.push(user);
        localStorage.setItem("myData", JSON.stringify(storedData));
    }

    localStoreData();

    function editData() {
        modal.style.display = "block";
        const index = this.dataset.index;
        const storedData = JSON.parse(localStorage.getItem("myData")) || [];
        const data = storedData[index];
        editIndex.value = index; // for edit options
        editNameInput.value = data.name;
        editAgeInput.value = data.age;
        editGenderInput.value = data.gender;
    }

    function deleteData() {
        if (confirm("Are you sure you want to delete this profile?")) {
            const index = this.dataset.index;
            const storedData = JSON.parse(localStorage.getItem("myData")) || [];
            storedData.splice(index, 1);
            localStorage.setItem("myData", JSON.stringify(storedData));
            localStoreData();
        }
    }

    // Function to close the modal using the close button
    closebtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Function to close the modal by clicking outside of it
    window.addEventListener("click", function (e) {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });

    function localStoreData() {
        const storedData = JSON.parse(localStorage.getItem("myData")) || [];
        tableBody.innerHTML = "";
        storedData.forEach((data, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${data.name}</td>
                <td>${data.age}</td>
                <td>${data.gender}</td>
                <td><button data-index="${index}" class="btnEdit">Edit</button></td>
                <td><button data-index="${index}" class="btnDelete">Delete</button></td>`;
            tableBody.appendChild(row);
        });

        const editButtons = document.querySelectorAll(".btnEdit"); // Corrected variable name
        editButtons.forEach((ele) => {
            ele.addEventListener("click", editData);
        });

        const deleteButtons = document.querySelectorAll(".btnDelete");
        deleteButtons.forEach((ele) => {
            ele.addEventListener("click", deleteData);
        });
    }
});


/**
 * [{"name":"mouli","age":27,"gender":"male"},{"name":"chandra","age":45,"gender":"female"}]
 */
