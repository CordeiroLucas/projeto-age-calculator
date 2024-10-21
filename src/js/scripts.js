const listInputField = document.querySelectorAll(".input-field");
const listInputData = document.querySelectorAll(".input-field input");
const buttonElement = document.getElementById("submit-button");

const dataHoje = new Date();

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

        showResult(calcularDiferença(niverData));
    }
})

function showResult(resultados){
    document.getElementById("year-value").innerHTML = resultados[2];
    document.getElementById("month-value").innerHTML = resultados[1]; 
    document.getElementById("day-value").innerHTML = resultados[0];
}

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
    const output = new Array();

    let diffYears = Math.abs((niverData - dataHoje)) / 48460839872 * 1.5355;  // Tempo Certo
    // let diffYears = Math.abs((niverData - dataHoje)) / (31557600000 * 1.04575); // Tempo Exercício
    
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

    if (dateEntries[2].value != "") {
        if (dateEntries[2].value <= dataHoje.getFullYear()) {
            year = dateEntries[2].value;
        } else {
            showErrorMessage(2, "Must be in the Past");
            output = -1;
        }
    } else {
        // console.log("Campo Ano Vazio!");
        showErrorMessage(2, "This Field is Required");
        output = -1;
    }

    if (dateEntries[1].value != "") {
        if (dateEntries[1].value >= 1 && dateEntries[1].value <= 12) {
            monthIndex = dateEntries[1].value;
        }else {
            showErrorMessage(1, "Month Must Be Valid");
            output = -1;
        }
    } else {
        // console.log("Campo Mes Vazio!");
        showErrorMessage(1, "This Field is Required");
        output = -1;
    }

    if (dateEntries[0].value != "") {
        if (dateEntries[0].value >= 1 && dateEntries[0].value <= 31) {
            day = dateEntries[0].value;
        } else {
            showErrorMessage(0, "Day Must Be Valid");
            output -1;
        }
    } else {
        // console.log("Campo Dia Vazio!");
        showErrorMessage(0, "This Field is Required");
        output = -1;
    }

    return output;
}

function showErrorMessage(fieldIndex, errorMessage) {
    listInputField[fieldIndex].classList.add("invalid-input");
    listInputField[fieldIndex].querySelector(".error-message").innerHTML = errorMessage;
}