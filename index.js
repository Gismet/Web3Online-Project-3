/* input area to enter base amount */
let base = document.querySelector("#base");
let symbolToBase = document.querySelector("#symbol");
/*left side buttons*/
let input_btns = document.querySelectorAll('.base button');
/*active base button*/
let activeBase = document.querySelector(".base .active");
/*active symbol button*/
let activeSymbols = document.querySelector(".right .currency .active");

/* unit amounts */
let unitAmountLeft = document.querySelector(".left-section .unit-amount p");
let unitAmountRight = document.querySelector(".right .unit-amount p");

/* remove background of active button */
function removeActiveButtonBackground(btns) {
    btns.forEach(item => {
        if (item.classList.contains("active")) {
            item.classList.remove("active")
        }
    });
}

fetch(`https://api.exchangerate.host/latest?base=RUB&symbols=USD`, { cache: "no-store" })
    .then(res => res.json()).then(data => {
        symbolToBase.value = (data.rates.USD * 5000).toFixed(4);
        unitAmountLeft.textContent = `1 RUB = ${data.rates.USD} USD`;
    }).catch(error => {
        console.error("Something went wrong. Check your connection");
    });
fetch(`https://api.exchangerate.host/latest?base=USD&symbols=RUB`, { cache: "no-store" }).then(res => res.json()).then(data => {
    unitAmountRight.textContent = `1 USD = ${data.rates.RUB} RUB`;
}).catch(error => {
    console.error("Something went wrong. Check your connection");
});

/*** this is for when the user changes currency buttons ****/
input_btns.forEach(item => {
    item.addEventListener("click", event => {
        event.preventDefault();
        removeActiveButtonBackground(input_btns);
        event.target.classList.add("active");
        activeBase = event.target;
        let input = document.querySelector("#symbol");
        // If the Base currency and Quote currency is the same, then make no request
        if (activeBase.textContent === activeSymbols.textContent) {
            console.warn("The both currecies are equal. Please select different currencies")
        } // otherwise, make a GET request with fetch
        else {
            /*cache: no-store - prevent taking inforamtion from HTTP cache when there is no connection*/
            var requestURL = `https://api.exchangerate.host/latest?base=${activeBase.textContent}&symbols=${activeSymbols.textContent}`;
            fetch(requestURL, { cache: "no-store" }).then(res => res.json()).then(data => {
                input.value = (data.rates[activeSymbols.textContent] * Number(base.value)).toFixed(4);
                unitAmountLeft.textContent = `1 ${activeBase.textContent} = ${data.rates[activeSymbols.textContent]} ${activeSymbols.textContent}`;
            }).catch(error => {
                console.error("Something went wrong. Check your connection");
            });
            fetch(`https://api.exchangerate.host/latest?base=${activeSymbols.textContent}&symbols=${activeBase.textContent}`, { cache: "no-store" }).then(res => res.json()).then(data => {
                unitAmountRight.textContent = `1 ${activeSymbols.textContent} = ${data.rates[activeBase.textContent]} ${activeBase.textContent}`;
            }).catch(error => {
                console.error("Something went wrong. Check your connection");
            });
        }
    });
})

/* left side buttons */
let input_btns2 = document.querySelectorAll(".right .currency button");
input_btns2.forEach(item => {
    item.addEventListener("click", event => {
        event.preventDefault();
        removeActiveButtonBackground(input_btns2);
        event.target.classList.add("active");
        activeSymbols = event.target;
        let input = document.querySelector("#symbol");
        if (activeBase.textContent === activeSymbols.textContent) {
            console.warn("The both currecies are equal. Please select different currencies")
        } else {
            var requestURL = `https://api.exchangerate.host/latest?base=${activeBase.textContent}&symbols=${activeSymbols.textContent}`;
            fetch(requestURL, { cache: "no-store" }).then(res => res.json()).then(data => {
                input.value = (data.rates[activeSymbols.textContent] * Number(base.value)).toFixed(4);
                unitAmountLeft.textContent = `1 ${activeBase.textContent} = ${data.rates[activeSymbols.textContent]} ${activeSymbols.textContent}`;
            }).catch(error => {
                console.error("Something went wrong. Check your connection");
            });
            fetch(`https://api.exchangerate.host/latest?base=${activeSymbols.textContent}&symbols=${activeBase.textContent}`, { cache: "no-store" }).then(res => res.json()).then(data => {
                unitAmountRight.textContent = `1 ${activeSymbols.textContent} = ${data.rates[activeBase.textContent]} ${activeBase.textContent}`;
            }).catch(error => {
                console.error("Something went wrong. Check your connection");
            });
        }
    });
})


/********* API - Getting data *************/

/*If the user chooses the left side to enter base amount*/
// add event when keyup happens (or we can use "input" event)
base.addEventListener("keyup", event => {
    let input = document.querySelector("#symbol");
    // do not make any request when base and counter currencies are the same
    if (activeBase.textContent === activeSymbols.textContent) {
        console.warn("The both currencies are equal. Please select different currencies")
    } else {
        var requestURL = `https://api.exchangerate.host/latest?base=${activeBase.textContent}&symbols=${activeSymbols.textContent}`;
        fetch(requestURL, { cache: "no-store" }).then(res => res.json()).then(data => {
            input.value = (data.rates[activeSymbols.textContent] * Number(base.value)).toFixed(4);
            unitAmountLeft.textContent = `1 ${activeBase.textContent} = ${data.rates[activeSymbols.textContent]} ${activeSymbols.textContent}`;
        }).catch(error => {
            console.error("Something went wrong. Check your connection");
        });
        fetch(`https://api.exchangerate.host/latest?base=${activeSymbols.textContent}&symbols=${activeBase.textContent}`, { cache: "no-store" }).then(res => res.json()).then(data => {
            unitAmountRight.textContent = `1 ${activeSymbols.textContent} = ${data.rates[activeBase.textContent]} ${activeBase.textContent}`;
        }).catch(error => {
            console.error("Something went wrong. Check your connection");
        });
    }

});

/*If the user chooses the right side to enter the base amount */
symbolToBase.addEventListener("keyup", event => {
    let input = document.querySelector("#base");
    if (activeBase.textContent == activeSymbols.textContent) {
        console.warn("The both currencies are equal. Please select different currencies");
    } else {
        fetch(`https://api.exchangerate.host/latest?base=${activeSymbols.textContent}&symbols=${activeBase.textContent}`, { cache: "no-store" })
            .then(res => res.json()).then(data => {
                input.value = (data.rates[activeBase.textContent] * Number(symbolToBase.value)).toFixed(4);
            }).catch(error => {
                console.error("Something went wrong. Check your connection");
            });
    }
})

