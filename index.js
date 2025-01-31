let count = 1;
const example = document.querySelector(".beverage-form");
const conversion = {
    "espresso": "Эспрессо",
    "capuccino": "Капучино",
    "cacao": "Какао",
    "usual": "обычное молоко",
    "no-fat": "обезжиренное молоко",
    "soy": "соевое молоко",
    "coconut": "кокосовое молоко",
    "whipped cream": "взбитые сливки",
    "marshmallow": "зефир",
    "chocolate": "шоколад",
    "cinnamon": "корица"
};

function deleteCoffee(elem) {
    if (count === 1)
        return;
    count--;
    let numToDel = getNumber(elem);
    elem.parentNode.removeChild(elem);
    for (let drink of document.querySelectorAll(".beverage-form")) {
        const numOfCoffee = getNumber(drink);
        if (numOfCoffee > numToDel) {
            drink.id = `form${numOfCoffee - 1}`;
            drink.querySelector(".beverage-count").textContent = `Напиток №${numOfCoffee - 1}`;
        }
    }
}

getNumber = (elem) => {
    return +elem.id.slice(4);
};

function showLightbox() {
    document.querySelector(".hidden").style.display = "flex";
    document.querySelector(".countOfCoffee").textContent = getText(count);
    document.querySelector("table").innerHTML = makeTable(document.querySelectorAll(".beverage-form"));
}

getText = (countOfCoffee) => {
    const orderText = `Вы заказали ${countOfCoffee}`;
    if (countOfCoffee % 10 === 1 && !(countOfCoffee % 100 === 11))
        return `${orderText} напиток`;
    else if (countOfCoffee % 10 > 1 && countOfCoffee % 10 < 5 && (countOfCoffee % 100 < 12 || countOfCoffee % 100 > 14))
        return `${orderText} напитка`;
    else
        return `${orderText} напитков`;
}

function addCoffee() {
    count++;
    const newDrink = example.cloneNode(true);
    newDrink.id = `form${count}`;
    newDrink.innerHTML = newDrink.innerHTML.replace("Напиток №1", `Напиток №${count}`);
    document.querySelector(".beverages").append(newDrink);
}

makeTable = (forms) => {
    let rows = '<tr><th>Напиток</th><th>Молоко</th><th>Дополнительно</th></tr>';
    forms.forEach(form => {
        const fromData = new FormData(form);
        rows += "<tr>" + convertToRow(fromData) + "</tr>";
    })
    return rows;
}

convertToRow = (formData) => {
    return `
    <td>${conversion[formData.get('type')]}</td>
    <td>${conversion[formData.get('milk')]}</td>
    <td>${formData.getAll('options').map(option => conversion[option]).join(", ")}</td>`;
}

addCoffee();
deleteCoffee(example);
