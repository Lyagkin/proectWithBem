// SLIDER

const slider = document.querySelector(".carousel__slider"); // блок слайдера - ограничивающий контент по ширине через свойство overflow:hidden
const sliderLine = document.querySelector(".carousel__inner"); // блок со всеми изображениями (далее слайдами)
const sliderImgs = document.querySelectorAll(".carousel__img"); // массив изображений (далее слайдов)
const btnNextSlide = document.querySelector(".next"); // кнопка вправо (след изображение (далее слайд))
const btnPrevSlide = document.querySelector(".prev"); // кнопка влево (пред изображение (далее слайд))
const dotsContainer = document.querySelector(".carousel__dots"); // блок для кнопок под изображениями (далее слайдами)

let sliderCounter = 0; // счетчик - специальная переменная - на нее буду опираться в расчетах для свойства transform: translateX()
let sliderWidth;

function resizeSlider() { // функция динамического изменения размера блока слайдов их их род блока - функция будет вызываться при каждом изменении размера окна

  sliderWidth = document.querySelector(".carousel__slider").offsetWidth; // получаем ширину слайдера, она начинает изменяться после уменьшения ширины 650px

  sliderLine.style.width = sliderWidth * sliderImgs.length + "px"; // изменяем динамически размеры род блока слайдов в зависимости от размера элемента соайдера и количества слайдов

  sliderImgs.forEach(img => img.style.width = sliderWidth + "px"); // изменяем размер самих слайдов
}

resizeSlider(); // сразу запускаем функцию чтобы получить изначальные размеры

function createDots() { // функция по динамическому созданию кнопок-точек под слайдом

  sliderImgs.forEach((slide, indexOfSlide) => { // через метод перебора массива всех слайдов - использую позицию слайдов по порядку (их индекс) - создаю в блоке для кнопок кнопки-точки опираясь на количество слайдов, а индекс помещаю в data атрибут каждой отдельной точки - в итоге количество кнопок определяется количеством слайдов и позиция точек по порядку так же соответствует позиции слайдов - их индексы идентичны

  const dot = document.createElement("button");
  dot.classList.add("carousel__dot");
  dot.setAttribute("data-index", indexOfSlide);

  dotsContainer.append(dot);

  });
}

function createActiveDot(i = 0) { // функция создания первой активной точки - выделяю ее цветом на фоне других, за счет добавления класса   активности

  document.querySelectorAll(".carousel__dot").forEach((dot) => dot.classList.remove("active")); // удаляю у всех точек класс активности

  document.querySelectorAll(".carousel__dot")[i].classList.add("active"); // обращаюсь конкретно к первой точке и добавляю ей класс активности
}

function init () { // функция изначальных установок

  createDots(); // помещаю точки в верстку
  createActiveDot(); // выделяю активную первую точку на странице
  moveSlide(0);
}

init();

function moveSlide(sliderCount) { // функция расчета перемещения слайдов

  sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`; // смещаем блок со всеми слайдами на ширину блока слайдера - так как он вмещает только один слайд - это я установил изначально в стилях. Направление смещения зависит от переданного атрибута 'sliderCount' - изначально он будет в значении 0 - то есть на странице показан первый слайд из массива. Он указан со знаком минус - это нужно для смещения слайдов влево или вправо - логика описана в функция след слайда и пред. Далее оно умножается на ширину блока слайдера и один слайд смещается - другой его заменяет. Это значение будет соответствовать индексу слайдов и меняться в функциях повешенных на кнопки вправо/влево и кнопки/точки
}

function nextSlide() { // функция показа след слайда

  if (sliderCounter >= sliderImgs.length - 1) { // логика, что я либо увеличиваю спец переменную-счетчик (изначально 0) на единицу при каждом запуске этой функции и каждый запуск этой функции активирует запуск функции расчета смещения слайдов и в ее атрибут я передаю значение переменной-счетчика - туда оно передается со знаком плюс, а далее меняется на минус (+ на - дает -) и слайды смещаются влево так как общее значение свойства translateX() со знаком минус. Либо если счетчик равен длине массива слайдов, то есть долистали до последнего слайда - я в переменную-счетчик кладу 0 и мы при след запуске этой функции смещаемся к первому слайду. Так же тут же запускается функция показа активной точки, в атрибут которой так же передаю значение счетчика - и оно указывает на индекс точки в массиве - она и выделяется на фоне других
    sliderCounter = 0;
  } else {
    sliderCounter++;
  }

  moveSlide(sliderCounter);
  createActiveDot(sliderCounter);
}

function prevSlide() { // функция показа пред слайда
  
  if (sliderCounter === 0) { // логика, что я либо уменьшаю спец переменную-счетчик (изначально 0) на единицу при каждом запуске этой функции и каждый запуск этой функции активирует запуск функции расчета смещения слайдов и в ее атрибут я передаю значение переменной-счетчика - туда оно передается со знаком минус, а далее меняется на плюс (- на - дает +) и слайды смещаются вправо так как общее значение свойства translateX() уменьшается. Либо если счетчик равен 0, то есть сейчас показан самый первый слайд - я в переменную-счетчик кладу значение индекса последнего слайда и мы при запуске этой функции смещаемся к последнему слайду. Так же тут же запускается функция показа активной точки, в атрибут которой так же передаю значение счетчика - и оно указывает на индекс точки в массиве - она и выделяется на фоне других
    sliderCounter = sliderImgs.length - 1;
  } else {
    sliderCounter--;
  }

  moveSlide(sliderCounter);
  createActiveDot(sliderCounter);
}

dotsContainer.addEventListener("click", (e) => { // обращаюсь к блоку со всеми кнопками-точками - это нужно, чтобы запустить дилегирование событий, так как точек изначально в верстке нет, то есть при клике на родителя и проверяю содержит ли элемент на который совершен клик класс точки-кнопки, если да, то получаем в переменную 'index' значение data атрибута - там лежит индекс точки - "индекс точки такой же как индекс слайда" - далее кладу это значение переменной-счетчику, и с ним запускаю функции показа активной точки и рассчет перемещения слайдов - в итоге по клику на любую кнопку-точку мы смещаемся к такому же по порядку слайду и меняем значение счетчика, чтобы это измененное значение передалось в функции повешенные на кнопки-стрелки
  const target = e.target;
  
  if (target && target.classList.contains("carousel__dot")) {

    const {index} = target.dataset;

    sliderCounter = index;

    createActiveDot(sliderCounter);
    moveSlide(sliderCounter);
  }
});

// вешаем функции на кнопки вправо/влево и по клику запускаем их 
btnNextSlide.addEventListener("click", nextSlide);
btnPrevSlide.addEventListener("click", prevSlide);

window.addEventListener("resize", () => {

  resizeSlider()
  moveSlide(0);
  createActiveDot();
});

////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
  // Modal

  function validateForms(form) {
    //функция валидации форм
    $(form).validate({
      rules: {
        // правила для инпутов из документации плагина 'jqueryvalidation', что в след инпутах по значениям их атрибутов name устанавливаем обязательные условия валидации - обязательные поля для ввода, минимальное количество симоволов, были ли введены конкретные данные(email).
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        // настройка сообщений под инпутами для пользователя, для корректного ввода данных. Класс для стилизации этих сообщений находится в документацц под названием "ErrorClass" и он по умолчанию указан 'error', его можно использовать в своих стилях. Его можно менять - показано в документаци
        name: {
          required: "Укажите свое имя",
          minlength: jQuery.validator.format("Необходимо не менее {0} символов!"), // структура сообщения из документации неизменна - нужна для связи значения минимального количества символов, которые мы указываем в правилах для этого поля
        },
        phone: "Укажите телефонный номер",
        email: {
          required: "Укажите почту",
          email: "Формат почты name@domain.com",
        },
      },
    });
  }

  validateForms("#consultation-form"); // ищем элемент по id
  validateForms("#consultation form"); // внутри элемента по id ищем элемент по классу
  validateForms("#order form"); // тоже самое, внутри элемента по id ищем элемент по классу

  $("input[name=phone]").mask("+7 (999) 999-99-99");

  $("form").submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");
      $("form").trigger("reset");
    });
    return false;
  });

  // Smooth scroll and page up

  $(window).scroll(function () {
    if ($(this).scrollTop() > 900) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });

  $("a[href='#up']").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });

  new WOW().init();
});

window.addEventListener("DOMContentLoaded", () => {
  const catalogParents = document.querySelectorAll(".catalog__content");
  const catalogItem = document.querySelectorAll(".catalog-item__content");
  const listItem = document.querySelectorAll(".catalog-item__list");
  const listOfLinksLook = document.querySelectorAll(".catalog-item__link");
  const listOfLinksBack = document.querySelectorAll(".catalog-item__back");
  const listOfButtonBuyProduct = document.querySelectorAll(".button_mini");

  const overlayForModal = document.querySelector(".overlay");
  const modalOrder = overlayForModal.querySelector("#order");
  const modalConsultation = overlayForModal.querySelector("#consultation");


  function showAllCatalogItem() {
    catalogItem.forEach(item => item.classList.add("catalog-item__content_active"));

    listItem.forEach(item => item.classList.remove("catalog-item__list_active"));
  }

  showAllCatalogItem();


  function showListItem(i) {
    listItem[i].classList.add("catalog-item__list_active");

    catalogItem[i].classList.remove("catalog-item__content_active");
  }


  function showCatalogItem(i) {
    catalogItem[i].classList.add("catalog-item__content_active");

    listItem[i].classList.remove("catalog-item__list_active");
  }

  function hideModalConsultation() {
    fadeOut(overlayForModal);
    fadeOut(modalConsultation);
  }

  function hideModalProduct() {
    fadeOut(overlayForModal);
    fadeOut(modalOrder);
  }

  const closeModalButton = document.querySelectorAll(".modal__close");

  closeModalButton.forEach(item => {
    item.addEventListener("click", () => {
      hideModalProduct();
      hideModalConsultation();
    });
  });

  overlayForModal.addEventListener("click", (e) => {
    if(e.target.classList.contains("overlay")) {
      hideModalProduct();
      hideModalConsultation();
    }
  })

  function showProductName(i) {
    let modalTextDescription = modalOrder.querySelector(".modal__descr");
    let catalogProductDescription = document.querySelectorAll(".catalog-item__subtitle")[i];
    modalTextDescription.textContent = catalogProductDescription.textContent;
  }

  function showModalConsultation() {
    fadeIn(overlayForModal);
    fadeIn(modalConsultation);
  }

  const buttonConsultation = document.querySelectorAll("[data-modal=consultation]");

  buttonConsultation.forEach((button) => {
    button.addEventListener("click", () => {
      showModalConsultation();
    })
  })

  function showModalProduct() {
    fadeIn(overlayForModal);
    fadeIn(modalOrder);
  }

  function fadeIn(el, display = "block") { // код из сети
    el.style.opacity = 0;
    el.style.display = display;
    (function fade() {
        let val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
          console.log(val);
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}

  function fadeOut(el) { // код из сети
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

  catalogParents.forEach(catalogElement => {
    catalogElement.addEventListener("click", (e) => {
      e.preventDefault();
      
      let target = e.target;

      if (target.classList.contains("catalog-item__link")) {
        listOfLinksLook.forEach((link, linkIndex) => {
          if (link === target) {
            showListItem(linkIndex);
          }
        });
      }

      if (target.classList.contains("catalog-item__back")) {
        listOfLinksBack.forEach((link, linkIndex) => {
          if (link === target) {
            showCatalogItem(linkIndex);
          }
        });
      }

      if (target.classList.contains("button_mini")) {
        listOfButtonBuyProduct.forEach((button, buttonIndex) => {
          if (button === target) {
            showModalProduct();
            showProductName(buttonIndex);
          }
        });
      }
    })
  })

  // Табы
  const parentOfTabs = document.querySelector(".catalog__tabs");
  const tabs = document.querySelectorAll(".catalog__tab");
  const tabsContent = document.querySelectorAll(".catalog__content");

  function hideContent() {
    tabs.forEach(tab => tab.classList.remove("catalog__tab_active"));

    tabsContent.forEach(content => {
      content.classList.remove("catalog__content_active", "fade");
    });
  }

  function showActiveContent(i = 0) {
    tabs[i].classList.add("catalog__tab_active");

    tabsContent[i].classList.add("catalog__content_active", "fade");
  }

  showActiveContent();

  parentOfTabs.addEventListener("click", (e) => {
    let target = e.target;

    if (target && target.parentElement.classList.contains("catalog__tab")) {
      tabs.forEach((tab, i) => {
        if(tab === target.parentElement) {
          hideContent();
          showActiveContent(i);        
        }
      })
    }
  });
});