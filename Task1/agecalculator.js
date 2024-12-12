const daySelect = document.getElementById("day");
for (let i = 1; i <= 31; i++) 
    {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    daySelect.appendChild(option);
}

const yearSelect = document.getElementById("year");
const currentYear = new Date().getFullYear();
for (let i = currentYear; i >= 1900; i--) 
    {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
}

function calculateAge(event) 
{
    event.preventDefault();
    const day = parseInt(document.getElementById("day").value);
    const month = parseInt(document.getElementById("month").value);
    const year = parseInt(document.getElementById("year").value);
    const birthDate = new Date(year, month, day);
    if 
    (
        birthDate.getDate() !== day ||
        birthDate.getMonth() !== month ||
        birthDate.getFullYear() !== year
    ) 
    {
        document.getElementById("age-result").textContent =
            "Please enter a valid date of birth.";
        document.getElementById("age-image").src = "";
        return;
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) 
        {
        age--;
    }

    const ageResult = document.getElementById("age-result");
    const ageImage = document.getElementById("age-image");

    if (age < 0 || isNaN(age)) 
        {
        ageResult.textContent = "Invalid Date of Birth!";
        return;
    }

    ageResult.textContent = `You are ${age} years old.`;
    if (age <= 12) {
        ageImage.src = "images/kid.jpeg";
        ageImage.alt = "Kid";
    } else if (age <= 19) {
        ageImage.src = "images/teen.jpeg";
        ageImage.alt = "Teen";
    } else if (age <= 59) {
        ageImage.src = "images/adult.jpeg";
        ageImage.alt = "Adult";
    } else {
        ageImage.src = "images/old.jpeg";
        ageImage.alt = "Old";
    }
}
