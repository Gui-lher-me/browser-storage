const storeBtn = document.getElementById("store-btn")
const retrBtn = document.getElementById("retrieve-btn")

const dbRequest = indexedDB.open("StorageDummy", 1)

let db 

dbRequest.onsuccess = e => {
    db = e.target.result
}

dbRequest.onupgradeneeded = e => {
    db = e.target.result

    const objStore = db.createObjectStore("products", {keyPath: "id"})

    objStore.transaction.oncomplete = e => {
        const productsStore = db.transaction("products", "readwrite").objectStore("products")

        productsStore.add({id: "p1", title: "A First Product", price: 12.99, tags: ["Expensive", "Luxury"]})
    }
}

dbRequest.onerror = e => console.log("ERROR!")

storeBtn.addEventListener("click", () => {
    if(!db) {
        return
    }

    const productsStore = db.transaction("products", "readwrite").objectStore("products")

    productsStore.add({id: "p2", title: "A Second Product", price: 122.99, tags: ["Expensive", "Luxury"]})
})

retrBtn.addEventListener("click", () => {
    const productsStore = db.transaction("products", "readwrite").objectStore("products")

    const request = productsStore.get("p2")

    request.onsuccess = () => console.log(request.result)
})

