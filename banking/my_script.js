const accountList = document.querySelector('ul');
const span = document.querySelector('span');

const loadButton = document.querySelector('#load');
loadButton.addEventListener('click', loadClick);

const createButton = document.querySelector('#create');
createButton.addEventListener('click', createClick);

const transferButton = document.querySelector('#transfer');
transferButton.addEventListener('click', transferClick);

const url = "https://stingray-app-6557h.ondigitalocean.app"

async function loadClick() {
    const response = await fetch(`${url}/accounts`);
    const accounts = await response.json();

    // update list
    accountList.innerHTML = "";
    span.textContent = "";

    for (const account of accounts) {
        const listElement = document.createElement('li');
        listElement.innerText = `UserName: ${account.user} - Balance ${account.balance}`
        accountList.appendChild(listElement);
    }
}

async function createClick() {
    const input = document.getElementById("user_name_input");
    const userName = input.value;

    const response = await fetch(`${url}/accounts`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: userName }),
    });

    if (response.status != 200) {
        span.textContent = `${await response.json()}`;
    }
}

async function transferClick() {
    span.textContent = "";

    const inputFrom = document.getElementById("user_name_from");
    const userNameFrom = inputFrom.value;

    const inputTo = document.getElementById("user_name_to");
    const userNameTo = inputTo.value;

    const inputAmount = document.getElementById("amount");
    const amount = inputAmount.value;

    await fetch(`${url}/transfer`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from_user: userNameFrom,
            to_user: userNameTo,
            amount: amount,
        }),
    });
}