const slider = tns({
  container: ".carousel__inner",
  items: 3,
  slideBy: "page",
  autoplay: false,
  controls: false,
  nav: false,
  speed: 600,
  responsive: {
    320: {
      nav: true,
      edgePadding: 20,
      gutter: 20,
      items: 1,
    },
    768: {
      nav: false,
    },
    1440: {
      nav: false,
    },
    2560: {
      nav: false,
    },
  },
});

document.querySelector(".prev").addEventListener("click", function () {
  slider.goTo("prev");
});
document.querySelector(".next").addEventListener("click", function () {
  slider.goTo("next");
});

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
