let totalCalories = 0;
let totalText = [];
let totalPrice = 0

function caloriesText(el) {
    if (el.checked) {
        totalCalories = totalCalories + (+(el.dataset.cal));
        totalText.push(el.dataset.tex)
    }
}

function price(el) {
    if (el.checked) {
        totalPrice = totalPrice + (+(el.dataset.price));
    }
}

class Bun {
    constructor() {

    }

    getPrice() {
        document.getElementById("price").innerText = `общая сумма:` + totalPrice
    }

    getCalories() {
        document.getElementById("calories").innerText = `Всего каллорий:` + totalCalories
    }

    getText() {
        document.getElementById("order").innerText = `Вaш заказ :` + totalText.join(" ")
    }

    set() {
        let btn = document.getElementById("okBtn")

        btn.addEventListener('click', function () {

            document.querySelectorAll("input[name='size']").forEach(el => {

                caloriesText(el);
                price(el);

            });
            document.querySelectorAll("input[name='type']").forEach(el => {
                caloriesText(el);
            });

            document.querySelectorAll("input[type = 'checkbox']").forEach(el => {
                caloriesText(el);
                price(el);
            });
            new Bun().getPrice()
            new Bun().getCalories()
            new Bun().getText()


        });
    }

    clear() {
        document.getElementById("clear").addEventListener("click", function () {
            totalPrice = 0
            totalCalories = 0
            totalText = []
            new Bun().getPrice()
            new Bun().getCalories()
            new Bun().getText()
        })

    }
}

let b = new Bun()
b.set()
b.clear()














