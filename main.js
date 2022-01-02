// alert("hi");
window.onload = function() {
    myform = document.getElementById('myform')
    id = document.getElementById('id')
    name = document.getElementById('name')
    desc = document.getElementById('desc')
    img = document.getElementById('img')
    price = document.getElementById('price')
    cardBody = document.getElementsByClassName('card-body')[0]

    myform.addEventListener('submit', function(e) {
        e.preventDefault();
        idtext = document.getElementById('id').value
        nametext = document.getElementById('name').value
        pricetext = document.getElementById('price').value
        imgtext = document.getElementById('img').value
        desctext = document.getElementById('desc').value
        if (idtext == '' || nametext == '' || imgtext == '' || desctext == '' || pricetext == '') {
            UI.messages('Insert All Text Fields', 'danger');
            return
        } else {
            var item = new Item(idtext, nametext, pricetext,imgtext,desctext);
            UI.clearFields();
            UI.displayData(item)
            Store.setStored(item)
            UI.messages('Data Inserted', 'success')
        }
    })
    tbody.addEventListener('click', function(e) {
        if (e.target.classList.contains('RemoveIt')) {
            UI.removeRow(e.target)
        }
    })
    class Item {
        constructor(  idtext, nametext, pricetext,imgtext,desctext) {
            this.id = idtext;
            this.name = nametext;
            this.price = pricetext;
            this.img = imgtext;
            this.desc= desctext;
        }
    }

    class UI {
        static clearFields() {
            document.getElementById('id').value = ''
            document.getElementById('name').value = ''
            document.getElementById('price').value = ''
            document.getElementById('desc').value = ''
            document.getElementById('img').value = ''
        }

        static displayData(obj) {
            let ItemFromLocalStorage = Store.getStored()
            ItemFromLocalStorage.push(obj)
            UI.populateTR(ItemFromLocalStorage)

        }

        static populateTR(ItemFromLocalStorage) {
            ItemFromLocalStorage.forEach(function(onebyone) {
                tbody.innerHTML += ` <tr>
                <td>${onebyone.id}</td>
                <td>${onebyone.name} </td>
                <td>${onebyone.img} </td>
                <td>${onebyone.price}</td>
                <td>${onebyone.desc} </td>
                <td><button class='btn btn-danger RemoveIt'>Xóa</button></td>
                <td><button class='btn btn-primary EditIt'>edit</button></td>
            </tr>`

            })
        }
        static messages(txt, className) {
            let divs = '';
            divs = document.createElement('div')
            divs.classList = `alert alert-${className}`
            divs.innerText = txt;
            cardBody.insertBefore(divs, myform)
            setTimeout(function() {
                divs.remove()
            }, 2000)
        }

        static removeRow(element) {
            id = element.parentElement.parentElement.firstElementChild.innerTexts
            element.parentElement.parentElement.remove()
            Store.removeStored(id)
        }
    }


    class Store {
        static getStored() {
            let items = ''
            if (localStorage.getItem('item') == null) {
                items = []
            } else {
                items = JSON.parse(localStorage.getItem('item'))
            }
            return items
        }

        static setStored(x) {
            let items = Store.getStored()
            console.log(items)
            items.push(x)
            localStorage.setItem('item', JSON.stringify(items))
        }

        static removeStored(id) {
            let Allvalues = Store.getStored()
            Allvalues.forEach((onebyone, index) => {
                if (onebyone.id == id) {
                    Allvalues.splice(index, 1);
                }
            })
            localStorage.setItem('item', JSON.stringify(Allvalues))
        }
    }
    UI.populateTR(Store.getStored())
}