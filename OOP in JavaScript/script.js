let API_URL = 'https://raw.githubusercontent.com/OksanaDubik/forSon/basket-tvardovskiy/TvardovskiyBezWebpaka/repositoriy.json'
let urlBasket = 'https://raw.githubusercontent.com/OksanaDubik/forSon/basket-tvardovskiy/TvardovskiyBezWebpaka/repositoriyGetBasket.json'

function makeGETRequest(url) {
    return new Promise((res, rej) => {
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    res(JSON.parse(xhr.responseText));
                } else {
                    rej('*****Server Error*****');
                }
            }
        };
        xhr.send();
    })
}

/** GoodsList-список товаров
 *@this.goods массив товаров
 * @fetchGoods -метод для заполнение списка
 * @render - метод для вывода списка товаров
 */
class GoodsList {
    constructor() {
        this.goods = [];
        this.container = ".goods-list";
        this.fetchGoods();
        this.image = "https://new-retail.ru/upload/iblock/6b2/6b21843989e963fc578f7d71c7423202.jpg"
    }

    fetchGoods() {
        makeGETRequest(API_URL)
            .then(data => {
                this.goods = data;
                this._render();
            })
            .catch(err => {
                throw new Error(err)
            });
    }

    _render() {
        let listHtml = '';
        this.goods.forEach(good => {
            listHtml += `<div class="goods-item">
                <img src='${this.image}' width='100px' >
                     <div class="desc">
                    <h3>${good.product_name}</h3>
                    <p>${good.price}</p>
                    <button class="buy-btn"
                            name="buy"
                            data-id="${good.id_product}">
                            Купить</button>
                    </div>
            </div>`
        })
        document.querySelector(this.container).innerHTML = listHtml;
        // this.totalCost()
    }
    // totalCost() {
    //     let cost = 0;
    //     document.querySelectorAll(".buy").forEach(el => el.addEventListener("click", () => {
    //             cost += +(el.parentNode.querySelector("p").textContent);
    //             document.querySelector(".button-box").innerHTML = cost
    //         })
    //     )
    //
    // }
}

let singleItem;

class Basket {
    constructor() {
        this.items = [];
        this.show = false;
        this.image = "https://new-retail.ru/upload/iblock/6b2/6b21843989e963fc578f7d71c7423202.jpg"
        this.container = '.basket-items';
        this.init();
    }

    init() {
        this._render();
        this._eventHandler();
    }

    _eventHandler() {
        document.querySelector('.cart-button').addEventListener('click', () => {
            this.show = !this.show;
            document.querySelector('.button-box').classList.toggle('invisible');
        })
        document.querySelector('.goods-list').addEventListener('click', (e) => {
            if (e.target.name == 'buy') {

                this.add(e.target.dataset);
            }
        });
        document.querySelector(this.container).addEventListener('click', (e) => {
            if (e.target.name == 'remove') {
                this.remove(e.target.dataset);
            }
        });
    }

    _render() {
        let htmlStr = '';
        let totalAmount = 0;
        let countPrice = 0;

        this.items.forEach(good => {
            countPrice += good.price
            totalAmount += good.amount


            htmlStr += `<div class="basket-item">
                            <img  src="${this.image} " width="50px" height="50px" alt="${good.product_name} ">                       
                            <div class="product-desc">
                                <p class="product-title">${good.product_name}</p>
                                <p class="product-single-price">${good.price}</p>
                            </div>
                            <div class="right-block">
                            <button class="del-btn" name="remove" 
                                     data-id="${good.id_product}" 
                                     data-name = "${good.product_name}"
                                     data-price = "${good.price}">
                                     &times;
                              </button>
                            </div>
                        </div>`
        });
        document.querySelector(this.container).innerHTML = htmlStr;//находим товар,
        if (htmlStr === ''){
            totalAmount = 0;
            countPrice = 0
        }
        document.querySelector(".button-result").innerHTML = `<p class="totalAmount">всего покупок: ${totalAmount}</p> <p class="totalPrice" >итого: ${countPrice}</p>`
    }

    add(good) {
        makeGETRequest(urlBasket)
            .then(data => {
                singleItem = data;
                let find = singleItem.contents.find(el => el.id_product == good.id);

                if (singleItem.contents.find) {
                    this.items.push(find);
                    this._render();
                } else {
                    find.amount++;

                }
            })
            .catch(err => {
                throw new Error(err)
            })

    };

    remove(good) {
        let find = this.items.find(el => el.id_product == good.id);
        if (find.amount == 1) {
            this.items.splice(this.items.indexOf(find), 1);
        } else {
            find.amount--;
        }
        this._render();
    }
}

const list = new GoodsList();

const basket = new Basket();


// /** Товар
//  * @render()- возвращает разметку
//  */
// class GoodsItem {
//     constructor(product_name, price) {
//         this.product_name = product_name;
//         this.price = price;
//     }
//
//     render() {
//         return `<div class="goods-item">
//                 <img src="https://new-retail.ru/upload/iblock/6b2/6b21843989e963fc578f7d71c7423202.jpg" width="100px">
//                 <h3>${this.product_name}</h3>
//                 <p>${this.price}</p>
//                 <button class="buy">Купить</button>
//                 </div>`;
//     }
// }
//
//
// /** GoodsList-список товаров
//  *@this.goods массив товаров
//  * @fetchGoods -метод для заполнение списка
//  * @render - метод для вывода списка товаров
//  */
// class GoodsList {
//     constructor() {
//         this.goods = [];
//     }
//     fetchGoods(cb) {
//         makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
//             this.goods = JSON.parse(goods);
//             cb();
//         })
//     }
//
//     // fetchGoods() {
//     //     this.goods = [
//     //         {title: 'Shirt', price: 150},
//     //         {title: 'Socks', price: 50},
//     //         {title: 'Jacket', price: 350},
//     //         {title: 'Shoes', price: 250},
//     //     ];
//     // };
//
//     _render() {
//         let listHtml = '';
//         this.goods.forEach(good => {
//             const goodItem = new GoodsItem(good.product_name, good.price);
//             listHtml += goodItem.render();
//         });
//         document.querySelector('.goods-list').innerHTML = listHtml;
//     }
// }
//
// class Basket {
//     constructor() {
//
//     }
//
//     add() {
//
//     };
//     remove() {
//
//     }
//     render(){
//
//     }
//     totalCost() {
//         let cost = 0;
//         document.querySelectorAll(".buy").forEach(el => el.addEventListener("click", () => {
//                 cost += +(el.parentNode.querySelector("p").textContent);
//                 document.querySelector(".button-box").innerHTML = cost
//             })
//         )
//
//     }
// }
//
// class BasketItem  extends GoodsItem {
//     constructor(product_name, price) {
//         super(product_name, price)
//     }
// }
//
// const list = new GoodsList();
// list.fetchGoods(()=>{
//     list._render();
//
//
//
// const basket = new Basket;
// basket.totalCost()
//
// });