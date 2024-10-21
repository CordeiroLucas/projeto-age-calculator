const listInputField = document.querySelectorAll(".input-field");
const listInputData = document.querySelectorAll(".input-field input");
const buttonElement = document.getElementById("submit-button");

buttonElement.addEventListener("click", () => {
    let day, monthIndex, year;
    resetPage();
    // Error Handling Function 
    if (errorHandling(listInputData) == 0) {
        listInputData.forEach(dateInput => {
            switch (dateInput.id) {
                case "input-day":
                    day = dateInput.value;
                    break;
                case "input-month":
                    monthIndex = dateInput.value - 1;
                    break;
                case "input-year":
                    year = dateInput.value;
            }
        })

        console.log(day, monthIndex, year);

        let niverData = new Date(year, monthIndex, day);

        document.getElementById("day-value").innerHTML = calcularDiferença(niverData)[0];
        document.getElementById("month-value").innerHTML = calcularDiferença(niverData)[1]; 
        document.getElementById("year-value").innerHTML = calcularDiferença(niverData)[2];
    }
})

function resetPage() {
    listInputField.forEach(field => {
        field.classList.remove("invalid-input");
    });

    document.querySelectorAll(".result-value").forEach(value => {
        value.innerHTML = "--";
    });

}

// Calcula diferença entre niver e data atual

function calcularDiferença(niverData) {
    const dataHoje = new Date();
    const output = new Array();

    // let diffYears = Math.abs((niverData - dataHoje)) / 48460839872 * 1.5355;  // Tempo Certo
    let diffYears = Math.abs((niverData - dataHoje)) / (31557600000 * 1.04575); // Tempo Exercício
    
    let diffMonths = (diffYears - Math.trunc(diffYears)) * 12;
    let diffDays = (diffMonths - Math.trunc(diffMonths)) * 31;

    if (diffDays != NaN || diffMonths != NaN || diffYears != NaN) {
        output[0] = Math.trunc(diffDays);
        output[1] = Math.trunc(diffMonths);
        output[2] = Math.trunc(diffYears);
        return output;
    } else return "--";
}

function errorHandling(dateEntries) {
    let output = 0;
    if (dateEntries[0].value != "") day = dateEntries[0].value;
    else {
        console.log("Campo Dia Vazio!");
        listInputField[0].classList.add("invalid-input");
        output = -1;
    }

    if (dateEntries[1].value != "") monthIndex = dateEntries[1].value;
    else {
        console.log("Campo Mes Vazio!");
        listInputField[1].classList.add("invalid-input");
        output = -1;
    }

    if (dateEntries[2].value != "") year = dateEntries[2].value;
    else {
        console.log("Campo Ano Vazio!");
        listInputField[2].classList.add("invalid-input");
        output = -1;
    }
    return output;
}


// let inputDay = document.getElementById("input-day");
// let inputMonth = document.getElementById("input-month");
// let inputYear = document.getElementById("input-year");

// console.log(inputDay);

// console.log(inputDay.value, "/", inputMonth.value, "/", inputYear.value);