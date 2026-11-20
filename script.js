
let appliances = [];

const form = document.getElementById("applianceForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("applianceName").value;
    let power = Number(document.getElementById("power").value);
    let hours = Number(document.getElementById("hours").value);

    if (!name.trim() || power <= 0 || hours <= 0 || hours > 24 ||
        !Number.isFinite(power) || !Number.isFinite(hours)) {
        alert("Please enter valid appliance details!");
        return;
    }

    let dailyUnits = (power * hours) / 1000;

    let appliance = {
        name: name,
        power: power,
        hours: hours,
        units: dailyUnits
    };

    appliances.push(appliance);

    displayAppliances();

    form.reset();

});

function displayAppliances() {

    let list = document.getElementById("applianceList");

    list.innerHTML = "";

    let dailyTotal = 0;

    appliances.forEach(function(item, index) {

        dailyTotal += item.units;

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${escapeHTML(item.name)}</td>
            <td>${item.power}</td>
            <td>${item.hours}</td>
            <td>${item.units.toFixed(2)} kWh</td>
            <td>
                <button class="delete-btn"
                onclick="deleteAppliance(${index})">
                Delete
                </button>
            </td>
        `;

        list.appendChild(row);

    });

    let monthlyTotal = dailyTotal * 30;

    // Example tariff: ₹6 per unit.
    let bill = monthlyTotal * 6;

    document.getElementById("dailyUsage").textContent =
        dailyTotal.toFixed(2) + " kWh";

    document.getElementById("monthlyUsage").textContent =
        monthlyTotal.toFixed(2) + " kWh";

    document.getElementById("estimatedBill").textContent =
        "₹" + bill.toFixed(2);

}

function deleteAppliance(index) {

    appliances.splice(index, 1);

    displayAppliances();

}

// Prevent HTML entered as an appliance name from being interpreted.
function escapeHTML(value) {
    return value.replace(/[&<>"']/g, function(char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char];
    });
}

displayAppliances();
