//Switch Panels
let buttons = document.querySelectorAll(".button-container button")

const handleClickButton = (event) => {
    let section1 = document.querySelector(".sum-section")
    let section2 = document.querySelector(".sum-content-section")
    let section3 = document.querySelector(".mult-section")
    let section4 = document.querySelector(".test-minor-section")
    let section5 = document.querySelector(".test-minorequal-section")
    let section6 = document.querySelector(".prime-section")
    let section7 = document.querySelector(".fat-pot-five")

    let buttonId = event.target.id
    switch (buttonId) {
        case 'add-button':
            section1.style.display = "block";
            section2.style.display = "block";
            section3.style.display = "none";
            section4.style.display = "none";
            section5.style.display = "none";
            section6.style.display = "none";
            section7.style.display = "none";
            break;
        case 'mult-button':
            section1.style.display = "none";
            section2.style.display = "none";
            section3.style.display = "block";
            section4.style.display = "none";
            section5.style.display = "none";
            section6.style.display = "none";
            section7.style.display = "none";
            break;
        case 'test-button':
            section1.style.display = "none";
            section2.style.display = "none";
            section3.style.display = "none";
            section4.style.display = "block";
            section5.style.display = "block";
            section6.style.display = "none";
            section7.style.display = "none";
            break;
        case 'prime-button':
            section1.style.display = "none";
            section2.style.display = "none";
            section3.style.display = "none";
            section4.style.display = "none";
            section5.style.display = "none";
            section6.style.display = "block";
            section7.style.display = "none";
            break;
        case 'fat-pot-button':
            section1.style.display = "none";
            section2.style.display = "none";
            section3.style.display = "none";
            section4.style.display = "none";
            section5.style.display = "none";
            section6.style.display = "none";
            section7.style.display = "block";
            break;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', handleClickButton)
})

//onChange Functions
const isNumber = num => {
    let regex = new RegExp("^-?[0-9]+$");
    return regex.test(num) ? "true"  : "false";
}

const handleSumWithoutPreserving = (event) =>{
    let input = event.target;
    let res = document.querySelector("#resSum");
    let regA = document.querySelector("#sum-A");
    let regB = document.querySelector("#sum-B");

    res.innerHTML = "=";
    regA.innerHTML = "A = ";
    regB.innerHTML = "B = ";

    if(input.id === "sum1"){
        //console.log(input.value);
        if(input.value !== "" && isNumber(input.value)){

            let input2 = document.querySelector("#sum2");

            //console.log(input2.value);

            if(input2.value !== "" && isNumber(input2.value)){
                let registers = sumWithoutPreserving(input.value,input2.value);

                res.innerHTML = "=  "+((test(registers[0].signal)) ? registers[0].magnitude : (-registers[0].magnitude));

                regA.innerHTML = "A = ("+registers[0].signal+", "+registers[0].magnitude+")";
                regB.innerHTML = "B = ("+registers[1].signal+", "+registers[1].magnitude+")";
            }
        }
    }
    else{
        //console.log(input.value);
        if(input.value !== "" && isNumber(input.value)){
            let input1 = document.querySelector("#sum1");

            //console.log(input1.value);

            if(input1.value !== "" && isNumber(input1.value)){
                let registers = sumWithoutPreserving(input1.value,input.value);

                res.innerHTML = "=  "+((test(registers[0].signal)) ? registers[0].magnitude : (-registers[0].magnitude));

                regA.innerHTML = "A = ("+registers[0].signal+", "+registers[0].magnitude+")";
                regB.innerHTML = "B = ("+registers[1].signal+", "+registers[1].magnitude+")";
            }
        }
    }
}

const handleSumPreserving = (event) =>{
    let input = event.target;
    let res = document.querySelector("#resSumContent");
    let regA = document.querySelector("#sum-content-A");
    let regB = document.querySelector("#sum-content-B");
    let regC = document.querySelector("#sum-content-C");
    let regD = document.querySelector("#sum-content-D");
    let regE = document.querySelector("#sum-content-E");

    res.innerHTML = "=";
    regA.innerHTML = "A = ";
    regB.innerHTML = "B = ";
    regC.innerHTML = "C = ";
    regD.innerHTML = "D = ";
    regE.innerHTML = "E = ";

    if(input.id === "sum-content-1"){
        //console.log(input.value);
        if(input.value !== "" && isNumber(input.value)){

            let input2 = document.querySelector("#sum-content-2");

            //console.log(input2.value);

            if(input2.value !== "" && isNumber(input2.value)){
                let registers = SumPreserving(input.value,input2.value);

                res.innerHTML = "=  "+((test(registers[2].signal)) ? registers[2].magnitude : (-registers[2].magnitude));

                regA.innerHTML = "A = ("+registers[0].signal+", "+registers[0].magnitude+")";
                regB.innerHTML = "B = ("+registers[1].signal+", "+registers[1].magnitude+")";
                regC.innerHTML = "C = ("+registers[2].signal+", "+registers[2].magnitude+")";
                regD.innerHTML = "D = ("+registers[3].signal+", "+registers[3].magnitude+")";
                regE.innerHTML = "E = ("+registers[4].signal+", "+registers[4].magnitude+")";
            }
        }
    }
    else{
        //console.log(input.value);
        if(input.value !== "" && isNumber(input.value)){
            let input1 = document.querySelector("#sum-content-1");

            //console.log(input1.value);

            if(input1.value !== "" && isNumber(input1.value)){
                let registers = SumPreserving(input1.value,input.value);

                res.innerHTML = "=  "+((test(registers[2].signal)) ? registers[2].magnitude : (-registers[2].magnitude));

                regA.innerHTML = "A = ("+registers[0].signal+", "+registers[0].magnitude+")";
                regB.innerHTML = "B = ("+registers[1].signal+", "+registers[1].magnitude+")";
                regC.innerHTML = "C = ("+registers[2].signal+", "+registers[2].magnitude+")";
                regD.innerHTML = "D = ("+registers[3].signal+", "+registers[3].magnitude+")";
                regE.innerHTML = "E = ("+registers[4].signal+", "+registers[4].magnitude+")";
            }
        }
    }
}


//Start Panel
let sumSection = document.querySelector(".sum-section");
let sumContentSection = document.querySelector(".sum-content-section");
sumSection.style.display = "block";
sumContentSection.style.display = "block";