document.addEventListener("DOMContentLoaded", function () {
    const desktopTable = document.querySelector("#desktop-savings-table tbody");
    const mobileTableRows = document.querySelector("#mobile-table-rows");
    const prevButton = document.querySelector("#prev-button");
    const nextButton = document.querySelector("#next-button");
    let currentIndex = 0; // Initialize the index

    fetchData();

    function fetchData() {
        fetch("data.json")
            .then((response) => response.json())
            .then((data) => {
                populateTables(data);
                populateMobileTable(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    function populateTables(data) {
        desktopTable.innerHTML = "";
        data.products.forEach(product => {
            const row = createTableRow(product);
            desktopTable.appendChild(row);
        });
    }

    function populateMobileTable(data) {
        mobileTableRows.innerHTML = "";
        displayItem(currentIndex, data);

        prevButton.addEventListener("click", () => navigate(-1, data));
        nextButton.addEventListener("click", () => navigate(1, data));
    }

    function createTableRow(product) {
        const row = document.createElement("tr");
        const columns = ["productName", "interestRate", "minimumDeposit", "interestType"];
        columns.forEach(columnName => {
            const cell = document.createElement("td");
            cell.textContent = product[columnName];
            row.appendChild(cell);
        });
        return row;
    }

    function displayItem(index, data) {
        const product = data.products[index];
        if (product) {
            const row = createMobileTableRow(product);
            mobileTableRows.appendChild(row);
        }
        prevButton.disabled = index === 0;
        nextButton.disabled = index === data.products.length - 1;
    }

    function createMobileTableRow(product) {
        const row = document.createElement("div");
        row.innerHTML = `
            <div><strong>${product.productName}</strong></div>
            <div><strong>Interest Rate:</strong> ${product.interestRate}</div>
            <div><strong>Minimum Deposit:</strong> ${product.minimumDeposit}</div>
            <div><strong>Interest Type:</strong> ${product.interestType}</div>
        `;
        return row;
    }

    function navigate(offset, data) {
        const newIndex = currentIndex + offset;
        if (newIndex >= 0 && newIndex < data.products.length) {
            currentIndex = newIndex;
            mobileTableRows.innerHTML = "";
            displayItem(currentIndex, data);
        }
    }
});
