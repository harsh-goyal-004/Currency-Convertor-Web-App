const dropdown = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const amount = document.querySelector(".amount input");

const fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select");

const para = document.querySelector(".msg");

for (let select of dropdown) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    }
    if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }

    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    });
  }
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `https://api.frankfurter.app/latest?amount=${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.rates[toCurr.value];
  console.log(rate);

  para.innerText = `${amtVal} ${fromCurr.value} = ${rate} ${toCurr.value}`;
});
