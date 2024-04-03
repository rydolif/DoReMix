'use strict';

document.addEventListener("DOMContentLoaded", function() {

	//----------------------Swiper-----------------------
		var externalSwiper = new Swiper('.wrap', {
				slidesPerView: "auto",
				spaceBetween: 0,
				effect: 'fade',
				mousewheel: true,
				speed: 400,
				pagination: {
						el: '.swiper-pagination',
						clickable: true,
				},
		});

		var nestedSwiper = new Swiper('.nested-slider', {
				slidesPerView: "auto",
				spaceBetween: 0,
				mousewheel: true,
				speed: 400,
				// pagination: {
				// 		el: '.swiper-pagination',
				// 		clickable: true,
				// },
		});

		var innerSliderContainer = document.querySelector('.nested-slider');

		innerSliderContainer.addEventListener('mouseenter', function() {
				externalSwiper.mousewheel.disable();
		});

		nestedSwiper.on('slideChange', function() {
			var activeSlideIndex = nestedSwiper.activeIndex;
			if (activeSlideIndex === 0) {
				setTimeout(() => {
					externalSwiper.mousewheel.enable(); 
				}, 400)
			} else {
					externalSwiper.mousewheel.disable();
			}
		});
	

	//----------------------FIXED-HEADER-----------------------
		const headerFixed = (headerFixed, headerActive) => {
			const header =  document.querySelector(headerFixed),
						active = headerActive.replace(/\./, '');
	
			window.addEventListener('scroll', function() {
				const top = pageYOffset;
				
				if (top >= 90) {
					header.classList.add(active);
				} else {
					header.classList.remove(active);
				}
	
			});
	
		};
		headerFixed('.header', '.header--active');
	
	//----------------------HAMBURGER-----------------------
		const hamburger = (hamburgerButton, hamburgerNav, hamburgerHeader) => {
			const button = document.querySelector(hamburgerButton),
						nav = document.querySelector(hamburgerNav),
						header = document.querySelector(hamburgerHeader);
	
			button.addEventListener('click', (e) => {
				button.classList.toggle('hamburger--active');
				nav.classList.toggle('header__nav--active');
				header.classList.toggle('header--menu');
			});
	
		};
		hamburger('.hamburger', '.header__nav', '.header');
		
	//----------------------MODAL-----------------------
		const modals = (modalSelector) => {
			const	modal = document.querySelectorAll(modalSelector);

			if (modal) {
				let i = 1;

				modal.forEach(item => {
					const wrap = item.id;
					const link = document.querySelector('.' + wrap);
					let close = item.querySelector('.close');
					if (link) {
						link.addEventListener('click', (e) => {
							if (e.target) {
								e.preventDefault();
							}
							item.classList.add('active');
						});
					}

					if (close) {
						close.addEventListener('click', () => {
							item.classList.remove('active');
						});
					}

					item.addEventListener('click', (e) => {
						if (e.target === item) {
							item.classList.remove('active');
						}
					});
				});
			}

		};
		modals('.modal');

	//----------------------FORM-----------------------
		const forms = (formsSelector) => {
			const form = document.querySelectorAll(formsSelector);
			let i = 1;

			form.forEach(item => {
				const elem = 'form--' + i++;
				item.classList.add(elem);

				let formId = item.id = (elem);
				let formParent = document.querySelector('#' + formId);

				formParent.addEventListener('submit', formSend);

				async function formSend(e) {
					e.preventDefault();
			
					let error = formValidate(item);
			
					let formData = new FormData(item);

					if (error === 0) {
						item.classList.add('_sending');
						let response = await fetch('sendmail.php', {
							method: 'POST',
							body: formData
						});
			
						if (response.ok) {
							let modalThanks = document.querySelector('#modal--thanks');
							let modalRemove = document.querySelector('.modal.active');
							if (modalRemove) {
								modalRemove.classList.remove('active');
							}
							modalThanks.classList.add('active');
							document.body.classList.add('modal--open');
							item.reset();
							item.classList.remove('_sending');
						} else {
							alert('Błąd podczas wysyłania');
							item.classList.remove('_sending');
						}
			
					}
				}
			
				function formValidate(item) {
					let error = 0;
					let formReq = formParent.querySelectorAll('._req');

					for (let index = 0; index < formReq.length; index++) {
						const input = formReq[index];
						if (input.classList.contains('_email')) {
							if(emailTest(input)) {
								formAddErrorEmail(input);
								error++;
							}
						} else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
							formAddErrorCheck(input);
							error++;
						} else {
							if (input.value === '') {
								formAddError(input);
								error++;
							}
						}
					}
					return error;
				}

				function formErorrRemove() {
					let formErorrRemove = document.querySelectorAll('.form__error')
					console.log('error')
					formErorrRemove.forEach(item => {
						item.remove();
					})
				}

				function formAddError(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Wprowadź dane w polu";

					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
					setTimeout(formErorrRemove, 2000)
				}
			
				function formAddErrorEmail(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Wprowadź swój email";

					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
					setTimeout(formErorrRemove, 3000)
				}
			
				function formAddErrorCheck(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Zgoda na przetwarzanie danych osobowych";

					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
					setTimeout(formErorrRemove, 3000)
				}
			
				function emailTest(input) {
					return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/. test(input.value);
				}

			});
		};
		forms('.form');


});
	