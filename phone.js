const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("Phone-container");

  phoneContainer.textContent = "";
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phones) => {
    // console.log(phones);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-96 p-4 bg-gray-100 shadow-xl`;
    phoneCard.innerHTML = `
    <figure>
    <img src="${phones.image}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${phones.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-center">
      <button onclick="handleShowDetail('${phones.slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });

  toggleLoadingSpinner(false);
};

const handleShowDetail = async (id) => {
  const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetalis(phone);
};

const showPhoneDetalis = (phone) => {
  const phoneName = document.getElementById("phone-name");

  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `<img src="${phone.image}" alt=""/> 
  <p><span>Storage:</span>${phone.mainFeatures.storage}</p>
  <p><span>GPS: </span>${phone.others?.GPS || "No GPS available"}</p>
  
  `;

  show_detalis_modal.showModal();
};

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchFiled = document.getElementById("search-field");
  const searchText = searchFiled.value;
  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spiner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

const handleShowAll = () => {
  handleSearch(true);
};
