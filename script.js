const wrapper = document.querySelector(".wrapper")
const bskt = document.querySelector(".bskt")


function baslangic(){
    const sepet = JSON.parse(localStorage.getItem("sepet"))
    if(sepet){
        for(let i of sepet){
            ekle(i)
        }
    }else{
        localStorage.setItem("sepet","[]")
    } 
}
baslangic()

function ekle(urun){
    const div = document.createElement("div")
    div.classList.add("d-flex","align-item-center","justify-content-between","p-2",`urun${urun.id}`)
    div.innerHTML = 
    `
    <img src="${urun.resim}" alt="" class="img">
    <p class="m-0">${urun.isim}</p>
    <p class="m-0 fiyat">${urun.fiyat}</p>
    <p class="m-0"><span class='piece'>${urun.adet}</span></p>
    <button class="m-0 btn btn-outline-primary sil">Sil</button>
    `
    bskt.append(div)

    
}




let api = "https://dummyjson.com/products"

fetch(api)
.then(response => response.json())
.then(data => items(data))

function items(info){
    for(let i of info.products){
       let col = document.createElement("div")
        col.classList.add("col-lg-4","col-sm-6","col-12")
        let stars = Math.round(i.rating)
        let starIslem = []

        for(let i=1; i<stars; i++){

            starIslem += 
            `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellow" class="bi bi-star" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
            </svg>

            `
        }

        col.innerHTML = 
        `
        <div class="row">
            <div class="col mt-3 ">
                <div class="card ">
                    <div class="card-header d-flex justify-content-between align-item-center ">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">${i.category}</li>
                            <li class="breadcrumb-item active" aria-current="page">${i.title}</li>
                        </ol>
                            <span>
                            ${starIslem}
                            </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row ">
            <div class="col  ">
                <div class="card "id=${i.id}>
                    <div class="card-body back ">
                        <img src="${i.thumbnail}" class="object-fit-cover w-100 h-100 resim rounded-3" alt="">
                        <p class="isim">${i.title}</p>
                        <p>${i.description}</p>
                        <p class="fiyat">${i.price}$</p>
                        <button onclick=satinAl(${i.id}) class="btn btn-outline-primary" >Satın Al</button>
                     </div>
                </div>
            </div>
        </div>
        
        `
        wrapper.append(col)
    }
}

function satinAl(id){
   let card = document.getElementById(id)
   let isim = card.querySelector(".isim").textContent
   let fiyat = card.querySelector(".fiyat").textContent
   let resim = card.querySelector(".resim").src
  
   let urun = {
    "id":id,
    "isim":isim,
    "fiyat":fiyat,
    "resim":resim,
    "adet":1
   }
   let urunler = JSON.parse(localStorage.getItem("sepet"))
   let urunBUl =  urunler.find(x=>x.id == urun.id)
   
   if(urunBUl == null){
        urunler.push(urun)
   }else if(urunBUl){
        urunBUl.adet += 1
   }

   const bsktCard = bskt.querySelector(`.urun${id}`) 
   if(bsktCard == null){
    const adet = bsktCard.querySelector(".piece")
    const price = bsktCard.querySelector(".fiyat")
    let arttir = Number(adet.textContent)
    arttir++
    let newPrice = fiyat * arttir
    price.textContent = newPrice
    
   }
   
   localStorage.setItem("sepet",JSON.stringify(urunler))
   location.reload()
}

const del = document.querySelectorAll(".sil")
del.forEach(sil =>{
    sil.addEventListener("click",()=>{
        sil.parentElement.remove()
    })
})