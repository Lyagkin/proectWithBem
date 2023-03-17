// SLIDER

const slider = document.querySelector(".carousel__slider"); // блок слайдера - ограничивающий контент по ширине через свойство overflow:hidden
const sliderLine = document.querySelector(".carousel__inner"); // блок со всеми изображениями (далее слайдами)
const sliderImgs = document.querySelectorAll(".carousel__img"); // массив изображений (далее слайдов)
const btnNextSlide = document.querySelector(".next"); // кнопка вправо (след изображение (далее слайд))
const btnPrevSlide = document.querySelector(".prev"); // кнопка влево (пред изображение (далее слайд))
const dotsContainer = document.querySelector(".carousel__dots"); // блок для кнопок под изображениями (далее слайдами)


let sliderCounter = 0; // счетчик - специальная переменная - на нее буду опираться в расчетах для свойства transform: translateX()

function createDots() { // функция по динамическому созданию кнопок-точек под слайдом

  sliderImgs.forEach((slide, indexOfSlide) => { // через метод перебора массива всех слайдом - использую позицию слайдов по порядку (их индекс) - создаю в блоке для кнопок кнопки-точки опираясь на количество слайдов, а индекс помещаю в data атрибут каждой отдельной точки - в итоге количество кнопок определяется количеством слайдов и позиция точек по порядку так же соответствует позиции слайдов - их индексы идентичны

  dotsContainer.insertAdjacentHTML("beforeend", // 'beforeend' - использую чтобы созданные точки нумеровались по порядку начиная с 0
    `<button class="carousel__dot" data-index=${indexOfSlide}></button>`
  );

  });
}

function createActiveDot(i = 0) { // функция создания первой активной точки - выделяю ее цветом на фоне других, за счет добавления класса   активности

  document.querySelectorAll(".carousel__dot").forEach((dot) => dot.classList.remove("active")); // удаляю у всех точек класс активности

  document.querySelectorAll(".carousel__dot")[i].classList.add("active"); // обращаюсь конкретно к первой точке и добавляю ей класс активности
}


function moveSlide(sliderCount) { // функция расчета перемещения слайдов

  let sliderWidth = slider.offsetWidth; // получение ширины блока слайдера в переменную (550px) - для определения насколько нужно смещать по оси X - горизонтальной оси слайды, чтобы они меняли друг друга

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

  console.log(sliderCounter);
  
  if (sliderCounter === 0) { // логика, что я либо уменьшаю спец переменную-счетчик (изначально 0) на единицу при каждом запуске этой функции и каждый запуск этой функции активирует запуск функции расчета смещения слайдов и в ее атрибут я передаю значение переменной-счетчика - туда оно передается со знаком минус, а далее меняется на плюс (- на - дает +) и слайды смещаются вправо так как общее значение свойства translateX() уменьшается. Либо если счетчик равен 0, то есть сейчас показан самый первый слайд - я в переменную-счетчик кладу значение индекса последнего слайда и мы при запуске этой функции смещаемся к последнему слайду. Так же тут же запускается функция показа активной точки, в атрибут которой так же передаю значение счетчика - и оно указывает на индекс точки в массиве - она и выделяется на фоне других
    sliderCounter = sliderImgs.length - 1;
  } else {
    sliderCounter--;
  }

  moveSlide(sliderCounter);
  createActiveDot(sliderCounter);
}

function init () { // функция изначальных установок

  createDots(); // помещаю точки в верстку
  createActiveDot(); // выделяю активную первую точку на странице
  moveSlide(0);
}

init();

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

  moveSlide(0);
  createActiveDot();
});

////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
  $("ul.catalog__tabs").on("click", "li:not(.catalog__tab_active)", function () {
    $(this)
      .addClass("catalog__tab_active")
      .siblings()
      .removeClass("catalog__tab_active")
      .closest("div.container")
      .find("div.catalog__content")
      .removeClass("catalog__content_active")
      .eq($(this).index())
      .addClass("catalog__content_active");
  });

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content").eq(i).toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  }

  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  // Modal

  $("[data-modal=consultation]").on("click", function () {
    // по дата атрибуту и событию клика на этот элемент -элементам со след классами и id задаем класс медленного появления
    $(".overlay, #consultation").fadeIn("slow");
  });

  $(".modal__close").on("click", function () {
    // по дата атрибуту и событию клика на этот элемент -элементам со след классами и id задаем класс медленного исчезновения
    $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
  });

  $(".button_mini").each(function (i) {
    // для всех элементов с этим классом пишем функцию, которая получает аргумент порядкового индекса списка элементов - каждому элементу с этим классом по клику - у след элементов по id и классам в их текст вставляет текст из след элемента по классу и по индексу и медленно показывает при этом их на странице
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  });

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
