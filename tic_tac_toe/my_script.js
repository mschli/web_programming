const boxes = document.querySelectorAll('td');

function onClick(event) {
    const myBox = event.target;
    myBox.textContent = "X";
}

// boxes.forEach((box) => {})
for (const box of boxes) {
    box.addEventListener('click', onClick);
}

// TODO