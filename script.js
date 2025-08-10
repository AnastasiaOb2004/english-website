const navigationEl = {
    navbar: document.getElementById("navbar"),
    logo: document.getElementById("logo"),
    courseTitle: document.getElementById("course-title"),
    logBtn: document.getElementById("log-in-btn"),
    signBtn: document.getElementById("sign-up-btn"),
    rightItemsHeader: document.getElementById("right-items-header"),
}

const burgerMenu = document.querySelector('#burger-menu');
const hiddenMenu = document.querySelector('#hidden-menu');
const arrowTop = document.querySelector('#footer-arrow-top-btn');

function addScrollStyles() {
    window.addEventListener("scroll", () => {
        const { navbar, courseTitle, logBtn, signBtn, logo } = navigationEl;
        const scrollPos = window.scrollY;

        navbar.style.transition = `background-color 2s ease-in-out`;
        navbar.style.transition = `height 0.3s ease-in-out`;
        courseTitle.style.transition = `font-size 0.3s ease-in-out`;
        logo.style.transition = `width 0.3s ease-in-out`;
        hiddenMenu.style.transition = `top 0.3s  ease-in-out`;


        if (scrollPos > 1) {
            navbar.style.backgroundColor = `#1e0b7dfd`;
            navbar.style.height = `40px`;
            navbar.style.border = `#1b0a6ffd 3px solid`;
            navbar.style.boxShadow = `0 4px 6px rgba(0, 0, 0, 0.1)`;
            courseTitle.style.fontSize = `20px`;
            logBtn.style.backgroundColor = `#1e0b7dfd`;
            signBtn.style.backgroundColor = `#1e0b7dfd`;
            logo.style.width = `40px`;
            hiddenMenu.style.backgroundColor = `#1e0b7dd1`;
            hiddenMenu.style.top = `50px`;
        } else {
            navbar.style.boxShadow = `none`;
            navbar.style.backgroundColor = `#3442c3`;
            navbar.style.height = `70px`;
            courseTitle.style.fontSize = `25px`;
            logBtn.style.backgroundColor = `#7784ff`;
            signBtn.style.backgroundColor = `rgba(1, 211, 75, 0.897)`;
            logo.style.width = `50px`;
            navbar.style.border = `#2736b9ea 3px solid`;
            hiddenMenu.style.backgroundColor = `#3442c3cd`;
            hiddenMenu.style.top = `80px`;
        }
    })
};

function modifyCarousel() {
    const teacherCards = document.querySelectorAll('.teacher-card');
    let imagesDisplayed;

    if (window.innerWidth < 768) {
        imagesDisplayed = 1;
    } else {
        imagesDisplayed = 4;
    }

    for (let i = 0; i < teacherCards.length; i++) {
        if (i >= imagesDisplayed) {
            teacherCards[i].style.display = 'none';
        }
    }
}

if (window.innerWidth <= 992) {
    burgerMenu.style.display = 'flex';
}

let isClicked = false;

burgerMenu.addEventListener('click', () => {
    hiddenMenu.style.right = `1s ease-in-out`;
    if (!isClicked) {
        hiddenMenu.style.right = 0;
        isClicked = true;
    } else {
        hiddenMenu.style.right = `-300px`;
        isClicked = false;
    }
});



arrowTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

modifyCarousel();
addScrollStyles();

const pictureContainer = document.querySelector('#pictures-slider');

const images = [
    'images/teacher-1.jpg',
    'images/teacher-2.jpg',
    'images/teacher-3.jpg',
    'images/teacher-4.jpeg',
    'images/teacher-5.jpg',
    'images/teacher-6.jpg',
    'images/teacher-7.jpg',
    'images/teacher-8.jpg',
    'images/teacher-9.jpg',
];

const promiseArray = [];

for (const image of images) {
    const promise = new Promise((resolve, reject) => {
        const imageHTML = document.createElement('img');
        imageHTML.classList.add('pictures');
        imageHTML.style.display = 'none';
        imageHTML.src = image;

        const arrayOfLoadingGifs = document.querySelectorAll('.loading-gif');

        if (window.innerWidth <= 992) {
            arrayOfLoadingGifs[0].style.display = 'flex';
        } else {
            for (let i = 0; i < arrayOfLoadingGifs.length; i++) {
                arrayOfLoadingGifs[i].style.display = 'flex';
            }
        }


        imageHTML.addEventListener('load', () => {
            resolve();
        });

        imageHTML.addEventListener('error', () => {
            reject();
        })

        pictureContainer.appendChild(imageHTML);
    });

    promiseArray.push(promise);
}

const picturesDisplayed = [];

setTimeout(() => {
    Promise.all(promiseArray).then(
        function () {
            const pictures = document.querySelectorAll('.pictures');
            if (window.innerWidth <= 992) {
                pictures[0].style.display = 'flex';
            } else {
                for (let i = 0; i < 4; i++) {
                    pictures[i].style.display = 'flex';
                }
            }

            document.querySelectorAll('.loading-gif').forEach((gif) => {
                gif.style.display = 'none';
            });

            findIndex();
        },
        function () {
            alert('Error occured while loading images');
        }
    )
}, 5000);

//Лабораторна 5
const pictures = document.querySelectorAll('.pictures');
const indexArrays = [];
let isEndNext = false;
let isEndBefore = true;

function nextSlide() {
    pictures[indexArrays[0]].style.display = 'none';

    for (let i = 0; i < indexArrays.length; i++) {
        if (indexArrays[i] < 8) {
            indexArrays[i] += 1;
            pictures[indexArrays[i]].style.display = 'flex';
            isEndNext = false;
            isEndBefore = false;
        }

        if (indexArrays[i] === 8) {
            isEndNext = true;
        }
    }
};

function previousSlide() {
    if (window.innerWidth >= 992) {
        pictures[indexArrays[3]].style.display = 'none';
    } else {
        pictures[indexArrays[0]].style.display = 'none';
    }

    for (let i = 0; i < indexArrays.length; i++) {
        if (indexArrays[i] > 0) {
            indexArrays[i] -= 1;
            pictures[indexArrays[i]].style.display = 'flex';
            isEndNext = false;
            isEndBefore = false;
        }

        if (window.innerWidth >= 992) {
            if (indexArrays[i] === 3) {
                isEndBefore = true;
            }
        } else {
            if (indexArrays[i] === 0) {
                isEndBefore = true;
            }
        }
    }
};

function findIndex() {
    for (let i = 0; i < pictures.length; i++) {
        if (pictures[i].style.display === 'flex') {
            indexArrays.push(i);
        }
    }
}


document.querySelector('#next-arrow').addEventListener('click', () => {
    if (!isEndNext) {
        nextSlide();
    }
})

document.querySelector('#previous-arrow').addEventListener('click', () => {
    if (!isEndBefore) {
        previousSlide();
    }
})


// const buttonsAnime1 = [
//     document.getElementById('log-in-btn'),
//     document.getElementById('sign-up-btn'),
//     document.getElementById('teachers-page-arrow-left'),
//     document.getElementById('teachers-page-arrow-right'),
//     document.getElementById('footer-arrow-top-btn'),
// ];

// const buttonsAnime2 = [
//     document.getElementById('info-page-start-btn'),
//     document.getElementById('intro-start-btn'),
//     document.getElementById('lesson-page-start-btn'),
//     document.getElementById('blank-submit-btn'),
//     document.getElementById('count-btn'),
// ];


// buttonsAnime1.forEach(button => {
//     button.addEventListener('mouseenter', () => {
//         anime({
//             targets: button,
//             scale: 1.1,
//             boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
//             rotate: '5deg',
//             duration: 500,
//             easing: 'easeOutExpo'
//         });
//     });

//     button.addEventListener('mouseleave', () => {
//         anime({
//             targets: button,
//             scale: 1,
//             boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
//             rotate: '0deg',
//             duration: 500,
//             easing: 'easeOutExpo'
//         });
//     });

//     button.addEventListener('click', () => {
//         anime.timeline()
//             .add({
//                 targets: button,
//                 scale: 0.9,
//                 duration: 200,
//                 easing: 'easeInOutQuad'
//             })
//             .add({
//                 targets: button,
//                 scale: 1.1,
//                 duration: 200,
//                 easing: 'easeInOutQuad'
//             })
//             .add({
//                 targets: button,
//                 rotate: '360deg',
//                 duration: 400,
//                 easing: 'easeOutExpo'
//             });
//     });
// });

// const button2Animation = (button, isGreen) => {
//     const backgroundColor = isGreen
//         ? [
//             { value: 'rgba(1, 172, 61, 0.9)', duration: 300 },
//         ]
//         : [
//             { value: 'rgba(31, 11, 135, 0.99)', duration: 300 },
//         ];

//     button.addEventListener('mouseenter', () => {
//         anime({
//             targets: button,
//             scale: 1.2,
//             backgroundColor: backgroundColor,
//             duration: 500,
//             easing: 'easeOutExpo'
//         });
//     });

//     button.addEventListener('mouseleave', () => {
//         anime({
//             targets: button,
//             scale: 1,
//             backgroundColor: isGreen
//                 ? 'rgba(1, 211, 75, 0.897)'
//                 : '#3d4eea',
//             duration: 500,
//             easing: 'easeOutExpo'
//         });
//     });

//     button.addEventListener('click', () => {
//         anime.timeline()
//             .add({
//                 targets: button,
//                 scale: 0.8,
//                 duration: 150,
//                 easing: 'easeInOutQuad'
//             })
//             .add({
//                 targets: button,
//                 scale: 1.5,
//                 borderRadius: ['0%', '50%'],
//                 duration: 300,
//                 easing: 'easeOutBack'
//             })
//             .add({
//                 targets: button,
//                 scale: 1,
//                 borderRadius: '0%',
//                 duration: 300,
//                 easing: 'easeOutBack'
//             });
//     });
// };

// buttonsAnime2.forEach((button, index) => {
//     if (index < 3) {
//         button2Animation(button, true);
//     } else {
//         button2Animation(button, false);
//     }
// });

const thumbs = document.querySelector('#thumbs');
const mainImage = document.querySelector('#lesson-image');
const levelCheckers = document.querySelectorAll('.levels-checkers');

thumbs.onclick = function (event) {
    let thumbnail = event.target.closest('a');
    if (!thumbnail) return;

    event.preventDefault();

    let listItem = thumbnail.closest('li');
    let allItems = Array.from(thumbs.getElementsByTagName('li'));
    let index = allItems.indexOf(listItem);

    levelCheckers.forEach(item => item.classList.remove('is-green'));
    levelCheckers[index].classList.add('is-green');

    showThumbnail(thumbnail.href);
    rewriteLessonContect(index);
};
function showThumbnail(href) {
    mainImage.src = href;
}


function rewriteLessonContect(index) {
    const contentContainer = document.querySelector('#lesson-content');
    contentContainer.innerHTML = '';

    let content = ``;
    if (index === 0) {
        content = `
            <h3 id="lesson-page-title-a1">Beginner(A1)</h3>
            <div id="lesson-page-short-data">
                <p id="lesson-page-lessons-num" class="lesson-page-short-infos">Уроків: 198</p>
                <p id="lesson-page-exams-num" class="lesson-page-short-infos">Екзаменів: 22</p>
                <p id="lesson-page-tasks-num" class="lesson-page-short-infos">Вправ: 7620</p>
                <p id="lesson-page-hours-num" class="lesson-page-short-infos">Усього годин: 38</p>
            </div>
            <p id="lesson-page-data">Ви зможете говорити про себе та про побутові теми, де ви живете, працюєте, ваше
                хоббі. Ви почнете почувати себе впевненіше в англійській мові.</p>
        `;
    } else if (index === 1) {
        content = `
        <h3 id="lesson-page-title-a1">Elementary (A2)</h3>
        <div id="lesson-page-short-data">
            <p id="lesson-page-lessons-num" class="lesson-page-short-infos">Уроків: 220</p>
            <p id="lesson-page-exams-num" class="lesson-page-short-infos">Екзаменів: 25</p>
            <p id="lesson-page-tasks-num" class="lesson-page-short-infos">Вправ: 8500</p>
            <p id="lesson-page-hours-num" class="lesson-page-short-infos">Усього годин: 45</p>
        </div>
        <p id="lesson-page-data">Ви зможете обговорювати щоденні ситуації, планувати події, і ви вже зможете відчувати себе впевненіше в англійській мові в побутових ситуаціях.</p>
    `;
    } else if (index === 2) {
        content = `
        <h3 id="lesson-page-title-a1">Pre-Intermediate (B1)</h3>
        <div id="lesson-page-short-data">
            <p id="lesson-page-lessons-num" class="lesson-page-short-infos">Уроків: 240</p>
            <p id="lesson-page-exams-num" class="lesson-page-short-infos">Екзаменів: 30</p>
            <p id="lesson-page-tasks-num" class="lesson-page-short-infos">Вправ: 9500</p>
            <p id="lesson-page-hours-num" class="lesson-page-short-infos">Усього годин: 55</p>
        </div>
        <p id="lesson-page-data">Ви зможете виразити свої думки в більш складних ситуаціях, обговорювати теми на роботі та в житті, а також покращите своє володіння мовою у повсякденних ситуаціях.</p>
    `;
    } else if (index === 3) {
        content = `
        <h3 id="lesson-page-title-a1">Intermediate (B2)</h3>
        <div id="lesson-page-short-data">
            <p id="lesson-page-lessons-num" class="lesson-page-short-infos">Уроків: 260</p>
            <p id="lesson-page-exams-num" class="lesson-page-short-infos">Екзаменів: 35</p>
            <p id="lesson-page-tasks-num" class="lesson-page-short-infos">Вправ: 12000</p>
            <p id="lesson-page-hours-num" class="lesson-page-short-infos">Усього годин: 70</p>
        </div>
        <p id="lesson-page-data">Ви будете здатні легко обговорювати більш складні питання, вести бесіди на різноманітні теми, розвивати свої навички спілкування з носіями мови.</p>
    `;
    } else {
        content = `
        <h3 id="lesson-page-title-a1">Upper-Intermediate (C1)</h3>
        <div id="lesson-page-short-data">
            <p id="lesson-page-lessons-num" class="lesson-page-short-infos">Уроків: 280</p>
            <p id="lesson-page-exams-num" class="lesson-page-short-infos">Екзаменів: 40</p>
            <p id="lesson-page-tasks-num" class="lesson-page-short-infos">Вправ: 15000</p>
            <p id="lesson-page-hours-num" class="lesson-page-short-infos">Усього годин: 85</p>
        </div>
        <p id="lesson-page-data">Ви зможете висловлювати свої думки і ідеї з великою точністю і впевненістю. Ваш рівень англійської дозволить вам брати участь в академічних і професійних дискусіях.</p>
    `;
    }
    contentContainer.innerHTML = content;
}


const countBtn = document.querySelector('#count-btn');
const enteredData = document.querySelector('#entered-data');
const priceContainer = document.querySelector('#price');
const lessonsContainer = document.querySelector('#entered-lessons');
const promoInput = document.querySelector('#promo-input'); 
const promoMessage = document.querySelector('#promo-message'); 

let selectedTeacher = null;
let selectedLevel = 0; 
let numberOfLessons = 1;
let promoDiscount = 0; 

const promoCode = "Rocket";


document.getElementById('teacher-inputs').addEventListener('change', () => {
  const teacherRadio = document.querySelector('input[name="teacher"]:checked');
  if (teacherRadio) {
    selectedTeacher = teacherRadio.id;
  }
});


document.getElementById('level-range').addEventListener('input', () => {
  const levelValue = document.getElementById('level-range').value;
  selectedLevel = parseInt(levelValue, 10);
});


document.querySelector('input[type="number"]').addEventListener('input', (event) => {
  const inputValue = parseInt(event.target.value, 10);
  if (inputValue >= 1 && inputValue <= 100) {
    numberOfLessons = inputValue;
  } else {
    alert('Кількість уроків повинна бути від 1 до 100!');
  }
});

countBtn.addEventListener('click', () => {
  const enteredPromo = promoInput.value.trim();
  if (enteredPromo === promoCode) {
    promoDiscount = 0.15;
    promoMessage.textContent = 'Промокод застосовано! Отримано 15% знижки.';
    promoMessage.style.color = 'green';
  } else if (enteredPromo.length > 0) {
    promoDiscount = 0; 
    promoMessage.textContent = 'Неправильний промокод.';
    promoMessage.style.color = 'red';
  } else {
    promoDiscount = 0; 
    promoMessage.textContent = '';
  }

  if (selectedTeacher === null) {
    alert('Будь ласка, оберіть вчителя.');
    return;
  }

  const levelLabels = ['A1', 'A2', 'B1', 'B2', 'C1'];
  const priceData = calculatePrice();

  if (priceData) {
    enteredData.textContent = `${document.querySelector(`label[for="${selectedTeacher}"]`).textContent}, ${levelLabels[selectedLevel]}`;
    lessonsContainer.textContent = `${numberOfLessons}`;
    priceContainer.textContent = `${priceData.discountedPrice}$ (Знижка: ${priceData.discountPercent}%)`;
  } else {
    alert('Будь ласка, заповніть усі поля.');
  }
});

function calculatePrice() {
  if (selectedTeacher === null || selectedLevel === null) {
    return null; 
  }

  let pricePerLesson;

  if (selectedTeacher === 'native-teacher-radio') {
    pricePerLesson = [8, 8, 10, 12, 15][selectedLevel];
  } else if (selectedTeacher === 'ukrainian-teacher-radio') {
    pricePerLesson = [5, 5, 7, 9, 12][selectedLevel];
  } else if (selectedTeacher === 'student-radio') {
    pricePerLesson = [2, 2, 4, 6, 9][selectedLevel];
  }

  let totalPrice = pricePerLesson * numberOfLessons;

  let bulkDiscount = 0;
  if (numberOfLessons >= 30) {
    bulkDiscount = 0.25; 
  } else if (numberOfLessons >= 20) {
    bulkDiscount = 0.10; 
  } else if (numberOfLessons >= 10) {
    bulkDiscount = 0.05; 
  }

  const combinedDiscount = promoDiscount + bulkDiscount;

  const discountFactor = 1 - combinedDiscount; 
  const discountedPrice = totalPrice * discountFactor;


  return {
    discountedPrice: discountedPrice.toFixed(2),
    discountPercent: ((1 - discountFactor) * 100).toFixed(0),
  };
}


document.querySelector('#input-page-blank').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.querySelector('#blank-username').value.trim();
    const surname = document.querySelector('#blank-surname').value.trim();
    const phone = document.querySelector('#blank-tel').value.trim();
    const email = document.querySelector('#blank-email').value.trim();

    const nameError = document.querySelector('#name-error');
    const surnameError = document.querySelector('#surname-error');
    const emailError = document.querySelector('#email-error');
    const phoneError = document.querySelector('#phone-error');

    nameError.textContent = '';
    surnameError.textContent = '';
    emailError.textContent = '';
    phoneError.textContent = '';

    let isValid = true;

    const nameRegex = /^[A-Za-zА-Яа-я'’-]+$/;
    const letterRegex = /[A-Za-zА-Яа-я]/;


    if (!nameRegex.test(name)) {
        nameError.textContent = "Ім'я повинно містити лише літери або -' ";
        isValid = false;
    }

    if (!letterRegex.test(name)) {
        nameError.textContent = "Ім'я повинно містити як мінімум одну букву";
        isValid = false;
    }

    if (name.length < 3) {
        nameError.textContent = "Ім'я повинно бути не менше 3 символів.";
        isValid = false;
    }

    if (!name) {
        nameError.textContent = "Поле 'Ім'я' повине бути заповненим";
        isValid = false;
    }

    if (!nameRegex.test(surname)) {
        surnameError.textContent = "Прізвище повинно містити лише літери або -' "
        isValid = false;
    }

    if (!letterRegex.test(name)) {
        surnameError.textContent = "Прізвище повинно містити як мінімум одну букву";
        isValid = false;
    }

    if (surname.length < 3) {
        surnameError.textContent = "Прізвище повинно бути не менше 3 символів.";
        isValid = false;
    }


    if (!surname) {
        surnameError.textContent = "Поле 'Прізвище' повине бути заповненим";
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = "Введіть коректний email.";
        isValid = false;
    }

    if (!email) {
        emailError.textContent = "Поле 'Email' повине бути заповненим";
        isValid = false;
    }

    const phoneRegex = /^(\+380|0)\d+$/;
    if (!phoneRegex.test(phone)) {
        phoneError.textContent = "Номер телефону повинен починатися з +380 або 0";
        isValid = false;
    }

    if (!phone) {
        phoneError.textContent = " Поле 'Телефон' повине бути заповненим";
        isValid = false;
    }

    if (phone.startsWith("+380") && phone.length > 13) {
        phoneError.textContent = "Номер телефону у форматі +380 повинен містити 12 символів.";
        isValid = false;
    } else if (phone.startsWith("0") && phone.length > 10) {
        phoneError.textContent = "Номер телефону у форматі 0XXXXXXXXX повинен містити 10 символів.";
        isValid = false;
    }


    if (isValid) {
        alert("Форма успішно відправлена!");

        document.querySelectorAll('.blank-inputs').forEach((input) => {
            input.value = '';
        })
    }

});