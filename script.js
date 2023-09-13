document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch data from data.json
    function fetchData() {
        fetch("data.json")
            .then((response) => response.json())
            .then((data) => {
                populateTables(data); // Populate the desktop table
                populateMobileTable(data); // Populate the mobile table
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    // Function to populate the desktop table
    function populateTables(data) {
        const desktopTable = document.querySelector("#desktop-savings-table tbody");

        desktopTable.innerHTML = "";

        data.products.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.productName}</td>
                <td>${product.interestRate}</td>
                <td>${product.minimumDeposit}</td>
                <td>${product.interestType}</td>
            `;

            desktopTable.appendChild(row);
        });
    }

   // Function to populate the mobile table
   function populateMobileTable(data) {
    const mobileTableRows = document.querySelector("#mobile-table-rows");

    mobileTableRows.innerHTML = "";

    let currentIndex = 0; // Initialize the index

    function displayItem(index) {
        const product = data.products[index];
        if (product) {
            const row = document.createElement("div");
            row.innerHTML = `
                <div><strong>${product.productName}</strong></div>
                <div><strong>Interest Rate:</strong> ${product.interestRate}</div>
                <div><strong>Minimum Deposit:</strong> ${product.minimumDeposit}</div>
                <div><strong>Interest Type:</strong> ${product.interestType}</div>
            `;
            mobileTableRows.appendChild(row);
        }
    }

    displayItem(currentIndex);

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === data.products.length - 1;

    prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex -= 1;
            mobileTableRows.innerHTML = ""; // Clear existing content
            displayItem(currentIndex);
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === data.products.length - 1;
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentIndex < data.products.length - 1) {
            currentIndex += 1;
            mobileTableRows.innerHTML = ""; // Clear existing content
            displayItem(currentIndex);
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === data.products.length - 1;
        }
    });
}

const prevButton = document.querySelector("#prev-button");
const nextButton = document.querySelector("#next-button");


    fetchData();
});
