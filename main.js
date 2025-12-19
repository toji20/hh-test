const cardsArray = [
    {
        title: 'The Ultimate Google Ads Training Course',
        image: './public/card-image-1.png',
        speciality: 'Marketing',
        price: 100,
        name: 'by Jerome Bell',
    },
    {
        title: 'Product Management Fundamentals',
        image: './public/card-image-2.png',
        speciality: 'Management',
        price: 480,
        name: 'by Marvin McKinney',
    },
    {
        title: 'HR Management and Analytics',
        image: './public/card-image-3.png',
        speciality: 'HR & Recruting',
        price: 200,
        name: 'by Leslie Alexander Li',
    },
    {
        title: 'Brand Management & PR Communications',
        image: './public/card-image-4.png',
        speciality: 'Marketing',
        price: 530,
        name: 'by Kristin Watson',
    },
    {
        title: 'Graphic Design Basic',
        image: './public/card-image-5.png',
        speciality: 'Design',
        price: 500,
        name: 'by Guy Hawkins',
    },
    {
        title: 'Business Development Management',
        image: './public/card-image-6.png',
        speciality: 'Management',
        price: 400,
        name: 'by Dianne Russell',
    },
    {
        title: 'Highload Software Architecture',
        image: './public/card-image-7.png',
        speciality: 'Development',
        price: 600,
        name: 'by Brooklyn Simmons',
    },
    {
        title: 'Human Resources – Selection and Recruitment',
        image: './public/card-image-8.png',
        speciality: 'HR & Recruting',
        price: 150,
        name: 'by Kathryn Murphy',
    },
    {
        title: 'User Experience. Human-centered Design',
        image: './public/card-image-9.png',
        speciality: 'Design',
        price: 240,
        name: 'by Cody Fisher',
    },
];

const specialitiesArray = [
    {
        speciality: 'All',   
    },
    {
        speciality: 'Marketing',   
    },
    {
        speciality: 'Management',   
    },
    {
        speciality: 'HR & Recruting',   
    },
    {
        speciality: 'Design',   
    },
    {
        speciality: 'Development',   
    },
];

const container = document.querySelector('.container');
const cards = document.querySelector('.container__cards');
const sortList = document.querySelector('.container__filters-sort');

let currentSpeciality = 'All';
let currentSearchQuery = '';

function renderCards(filteredArray) {
    cards.innerHTML = '';
    
    filteredArray.forEach((item) => {
        const li = document.createElement('li');
        const imageBlock = document.createElement('div');
        const infoBlock = document.createElement('div');
        const image = document.createElement('img');
        const speciality = document.createElement('p');
        const title = document.createElement('h3');
        const cardBottom = document.createElement('div');
        const price = document.createElement('p');
        const name = document.createElement('p');
    
        speciality.textContent = item.speciality;
        title.textContent = item.title;
        price.textContent = `$${item.price}`;
        name.textContent = item.name;
        image.setAttribute('src', item.image);
        image.setAttribute('alt', item.title);
    
        li.classList.add('container__cards-item');
        infoBlock.classList.add('cards__item-info');
        speciality.classList.add('cards__item-info--speciality');
    
        if (item.speciality === 'Marketing') {
            speciality.style.backgroundColor = '#03CEA4';
        } else if (item.speciality === 'Management') {
            speciality.style.backgroundColor = '#5A87FC';
        } else if (item.speciality === 'HR & Recruting') {
            speciality.style.backgroundColor = '#F89828';
        } else if (item.speciality === 'Design') {
            speciality.style.backgroundColor = '#F52F6E';
        } else if (item.speciality === 'Development') {
            speciality.style.backgroundColor = '#7772F1';
        }
        
        title.classList.add('cards__item-info--title');
        cardBottom.classList.add('cards__item-info--card-bottom');
        price.classList.add('cards__item-info--price');
        name.classList.add('cards__item-info--name');
    
        li.appendChild(imageBlock);
        imageBlock.appendChild(image);
        infoBlock.appendChild(speciality);
        infoBlock.appendChild(title);
        cardBottom.appendChild(price);
        cardBottom.appendChild(name);
        infoBlock.appendChild(cardBottom);
        li.appendChild(infoBlock);
        cards.appendChild(li);
    });
}

function filterCards() {
    let filteredCards = cardsArray;
    
    if (currentSpeciality !== 'All') {
        filteredCards = filteredCards.filter(item => item.speciality === currentSpeciality);
    }
    
    if (currentSearchQuery.trim() !== '') {
        const query = currentSearchQuery.toLowerCase().trim();
        filteredCards = filteredCards.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.name.toLowerCase().includes(query) ||
            item.speciality.toLowerCase().includes(query)
        );
    }
    
    renderCards(filteredCards);
}

function sortBySpeciality(speciality) {
    currentSpeciality = speciality;
    filterCards();
    
    document.querySelectorAll('.filters__sort-item').forEach(item => {
        item.classList.remove('filters__sort-item--active');
    });
    
    const activeItem = Array.from(document.querySelectorAll('.filters__sort-item')).find(item => {
        const textElement = item.querySelector('.filters__sort-item-text');
        return (textElement ? textElement.textContent : item.textContent).trim() === speciality;
    });
    
    if (activeItem) {
        activeItem.classList.add('filters__sort-item--active');
    }
}
function renderSpeciality() {
    
    specialitiesArray.forEach((item) => {
        const li = document.createElement('li');
        const textContainer = document.createElement('div'); 
        const specialityText = document.createElement('span');
        const quantitySpan = document.createElement('span');
        
        li.classList.add('filters__sort-item');
        textContainer.classList.add('filters__sort-item-content');
        specialityText.classList.add('filters__sort-item-text');
        quantitySpan.classList.add('filters__sort-quantity');
        
        if (item.speciality === 'All') {
            li.classList.add('filters__sort-item--active');
        }
        
        const quantity = calculateQuantitySpeciality(item.speciality);
        
        specialityText.textContent = item.speciality;
        quantitySpan.textContent = quantity;
        
        li.addEventListener('click', function() {
            sortBySpeciality(item.speciality);
        });
        
        textContainer.appendChild(specialityText);
        textContainer.appendChild(quantitySpan);
        li.appendChild(textContainer);
        sortList.appendChild(li);
    });
}

function Search() {
    const searchContainer = document.querySelector('.container__filters-search');
    
    const searchInput = document.querySelector('.filters__search-input');
    
    searchInput.addEventListener('input', function(e) {
        currentSearchQuery = e.target.value;
        filterCards();
    });
    
    searchInput.addEventListener('search', function() {
        currentSearchQuery = '';
        filterCards();
    });
    
    searchContainer.appendChild(searchInput);
}

function calculateQuantitySpeciality(speciality) {
    let res = [];
    if (speciality === 'All') {
        return cardsArray.length
    }
    cardsArray.map((item) => {
        if (item.speciality === speciality) {
            res.push(item)
        }
    })
    const quantitySpecialities = res.length
    return quantitySpecialities
}   
renderSpeciality();
Search();
filterCards();


