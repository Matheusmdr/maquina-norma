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