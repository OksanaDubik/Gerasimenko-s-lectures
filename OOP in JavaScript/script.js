/** Товар
 * @render()- возвращает разметку
 */
class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `<div class="goods-item">
                <img src="https://new-retail.ru/upload/iblock/6b2/6b21843989e963fc578f7d71c7423202.jpg" width="100px">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy">Купить</button>
                </div>`;
    }
}


/** GoodsList-список товаров
 *@this.goods массив товаров
 * @fetchGoods -метод для заполнение списка
 * @render - метод для вывода списка товаров
 */
class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            {title: 'Shirt', price: 150},
            {title: 'Socks', price: 50},
            {title: 'Jacket', price: 350},
            {title: 'Shoes', price: 250},
        ];
    };

    _render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

class Basket {
    constructor() {

    }

    add() {

    };
    remove() {

    }
    render(){

    }
    totalCost() {
        let cost = 0;
        document.querySelectorAll(".buy").forEach(el => el.addEventListener("click", () => {
                cost += +(el.parentNode.querySelector("p").textContent);
                document.querySelector(".button-box").innerHTML = cost
            })
        )

    }
}

class BasketItem  extends GoodsItem {
    constructor(title, price) {
        super(title, price)
    }
}

const list = new GoodsList();
list.fetchGoods();
list._render();
// list.totalCost()
const basket = new Basket;
basket.totalCost()

