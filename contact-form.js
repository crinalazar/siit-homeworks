document.querySelector("form").addEventListener("submit", handleSubmit);
const radios = document.querySelectorAll("[name=gender]");

function handleSubmit(e){
    checkFields();
    checkRadios();
    if ((checkFields()=== 3) && (checkRadios() === true)){
        const banner = document.querySelector(".banner");
        banner.classList.remove("hidden");
        const i = document.createElement("i");
        i.classList.add("fas","fa-check-circle");
        const name = document.createElement("span");
        const firstName = document.querySelector("[name=FirstName]").value;
        name.innerHTML = firstName + '"';
        banner.prepend(i);
        banner.append(name);
        const lastName = document.querySelector("[name=LastName]").value;
        const message = document.querySelector("[name=Message]").value;
        let genderType;
        if (radios[0].checked){
            genderType = radios[0].value;
        } else if(radios[1].checked){
            genderType = radios[1].value;
        }
        console.log("First Name: " + firstName, "Last Name: " + lastName, "Gender: " + genderType,
        "Message: " + message);
        document.querySelector("form").removeEventListener("submit", handleSubmit);

    }
    e.preventDefault();
}

function checkFields() {
    const reqFields = document.querySelectorAll(".js-required");
    const arr = [];
    for (let i = 0; i < reqFields.length; i++) {
        const field = reqFields[i];
        if (field.value === ""){
            field.style.border = '1px solid #c00';           
            field.addEventListener("change", () => {
            removeErrorState(field);},
            { once: true });
        } else if (!(field.value === "")){
            arr.push(field.value)
        }   
    }
            return arr.length;
}

function checkRadios(){
    if (!radios[0].checked && !radios[1].checked){
        const radioParent = radios[0].parentElement.parentElement;
        radioParent.style.border = '1px solid #c00';
        radioParent.addEventListener ("change", () => {
            removeErrorState(radioParent);
        },
        { once: true });
    } else {
        return true;
    }
}


function removeErrorState(elem) {
    elem.style.border = "";
}
















