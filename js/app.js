// হয় মডিউল ৩4 ভালো করে দেখে ফেলো। বিশেষ করে the meal db রিলেটেড ৩4-৫ থেকে ৩4-৮ পর্যন্ত। তারপরে আরো সময় থাকলে এর আরেকটা খালতো ভাই the coktaildb থেকে কিছু জিনিস এনে দেখাবে। একজাক্টলি কি দেখাতে হবে। সেটা আমি বলে দিবো না। তুমি ওদের ওয়েবসাইট এ যাও। সেখানে কি কি লেখা আছে সেগুলা পড়ো। api গুলা এর ছোট করে কি কি করে বলা আছে। সেগুলা দেখো। তারপর কিছু ডাটা লোড করো। সেই ডাটাগুলো দেখাও। এইখানে সার্চ ফাংশনালিটি ইমপ্লিমেন্ট করো। অনেকটা mealdb এর মতো। আবার কোন একটাতে ক্লিক করলে সেটার ডিটেল দেখাবে। 

const toggleSpinner = (displaySpinner) => {
    document.getElementById('spinner').style.display = displaySpinner;
}
const toggleCocktailSpinner = (displaySpinner, removeDiv) => {
    document.getElementById('cocktail').classList.add(displaySpinner);
    document.getElementById('cocktail').classList.remove(removeDiv);
}

const loadCocktail = () => {
    const inputField = document.getElementById('input-field').value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputField}`)
    .then(res => res.json())
    .then(data => displayData(data.drinks))
    document.getElementById('input-field').value = '';
    document.getElementById('find-result').innerText = inputField;
    toggleSpinner('block');
    toggleCocktailSpinner('d-none', 'd-flex');
}
loadCocktail();

const displayData = (drinks) => {
    const cocktailDiv = document.getElementById('cocktail');
    cocktailDiv.textContent = '';
    drinks?.forEach(drink => {
        const div = document.createElement('div');
        div.classList.add('col-12');
        div.setAttribute('id', 'card-id')
        div.innerHTML = `
        <div class="card h-100 border-0">
            <img src="${drink.strDrinkThumb}" class="card-img-top img-fluid p-1" alt="My Image">
            <div class="card-body">
                <h5 class="card-title">${drink.strDrink}</h5>
                <p class="card-text">${drink.strInstructions.slice(0, 200)}</p>
            </div>
            
            <button onclick="loadDetails('${drink.idDrink}')" type="button" class="btn btn-warning mx-auto w-50 py-2 rounded-pill text-white mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal"> Show more</button>
        </div>
        `;
        cocktailDiv.appendChild(div);
    });
    toggleSpinner('none');

    toggleCocktailSpinner('d-flex', 'd-none');
}
const loadDetails = (singleItem) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${singleItem}`)
    .then(res => res.json())
    .then(data => displaySingleData(data.drinks[0]))
}
const displaySingleData = (singleData) => {
    console.log(singleData);
    const modalTitle = document.getElementById('modal-title');
    const modalImg = document.getElementById('modal-img');
    const modalDis = document.getElementById('modal-dis');
    const isAlcoholic = document.getElementById('alcoholic');
    modalTitle.innerText = `Cocktail Name: ${singleData.strDrink}`
    modalImg.setAttribute('src', `${singleData.strDrinkThumb}`);
    modalDis.innerHTML = `<br>
    <b>Instructions for you:</b><br><br>
    <p>${singleData.strInstructions}</p>
    `;
    isAlcoholic.innerText = `This Cocktail is an ${singleData.strAlcoholic} drink`;
}