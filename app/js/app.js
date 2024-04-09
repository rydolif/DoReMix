'use strict';

document.addEventListener("DOMContentLoaded", function() {

	//----------------------Cookies Modal-----------------------
		window.addEventListener('DOMContentLoaded', () => {
			const cookiesModal = document.querySelector('#modal--cookies');
			const btnRejectAll = document.querySelector('.btn--all');
			const btnAll = document.querySelector('.btn--transparent');
			
			if (!localStorage.getItem('cookiesModalShown')) {
				cookiesModal.classList.add('modal--cookies-active');
		
				btnRejectAll.addEventListener('click', function(e) {
					e.preventDefault();
					document.cookie = "cookie1=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
					document.cookie = "cookie2=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
					cookiesModal.classList.remove('modal--cookies-active');
					localStorage.setItem('cookiesModalShown', true);
				});
				
				btnAll.addEventListener('click', function(e) {
					e.preventDefault();
					cookiesModal.classList.remove('modal--cookies-active');
					localStorage.setItem('cookiesModalShown', true);
				});
			}
		});
		

	//----------------------Slider-----------------------
		if(document.querySelector('.wrap')) {
		
			var externalSwiper = new Swiper('.wrap', {
				lazy: true,
				slidesPerView: "auto",
				spaceBetween: 0,
				effect: 'fade',
				mousewheel: {
						eventsTarged: '.wrap',
						thresholdTime: 1000 // Час для прокрутки колесом миші
				},
				speed: 600,
				pagination: {
						el: '.swiper-pagination',
						clickable: true,
				},
				on: {
						slideChangeTransitionStart: function () {
								nestedSwiper.mousewheel.disable(); // Вимкнення прокрутки миші для внутрішнього слайдера
						},
						slideChangeTransitionEnd: function () {
								nestedSwiper.mousewheel.enable(); // Увімкнення прокрутки миші для внутрішнього слайдера
						}
				}
			});
			
			var nestedSwiper = new Swiper('.nested-slider', {
					lazy: true,
					slidesPerView: "auto",
					spaceBetween: 0,
					mousewheel: {
							eventsTarged: '.nested-slider',
							thresholdTime: 1000 // Час для прокрутки колесом миші
					},
					speed: 600,
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
					}, 1000)
				} else {
						externalSwiper.mousewheel.disable();
				}
			});
		
		//----------------------Slider nav-----------------------
			const slideLinks = document.querySelectorAll('.header__link');
			const footerLink = document.querySelectorAll('.main--footer__link');
			const pagination = document.querySelectorAll('.pagination__bullet');

			externalSwiper.on('slideChange', function () {
				const activeSlide = externalSwiper.slides[externalSwiper.activeIndex];
				const dataAttribute = activeSlide.getAttribute('data-slide');

				slideLinks.forEach(function(link) {
					const slideIndex = parseInt(link.getAttribute('data-slide'));
					if(dataAttribute == slideIndex) {
						slideLinks.forEach(function(item) {
							item.classList.remove('header__link--active')
						});
						link.classList.add('header__link--active')
					}
				});

				pagination.forEach(function(link) {
					const slideIndex = parseInt(link.getAttribute('data-slide'));
					if(dataAttribute == slideIndex) {
						pagination.forEach(function(item) {
							item.classList.remove('pagination__bullet--active')
						});
						link.classList.add('pagination__bullet--active')
					}
				});

			});

			nestedSwiper.on('slideChange', function () {
				const activeSlide = nestedSwiper.slides[nestedSwiper.activeIndex];
				if (activeSlide) {
					const dataAttribute = activeSlide.getAttribute('data-slide');
			
					if(nestedSwiper.activeIndex === 0 ) {
						const time = document.querySelector('.time');
						const bullettime = document.querySelector('.bullettime');
						slideLinks.forEach(function(item) {
							item.classList.remove('header__link--active')
						});
						pagination.forEach(function(item) {
							item.classList.remove('pagination__bullet--active')
						});
						time.classList.add('header__link--active')
						bullettime.classList.add('pagination__bullet--active')
					} else {
						slideLinks.forEach(function(link) {
							const slideIndex = parseInt(link.getAttribute('data-slide'));
							if(dataAttribute == slideIndex) {
								slideLinks.forEach(function(item) {
									item.classList.remove('header__link--active')
								});
								link.classList.add('header__link--active')
							}
						});
						pagination.forEach(function(link) {
							const slideIndex = parseInt(link.getAttribute('data-slide'));
							if(dataAttribute == slideIndex) {
								pagination.forEach(function(item) {
									item.classList.remove('pagination__bullet--active')
								});
								link.classList.add('pagination__bullet--active')
							}
						});
					}
				}

				
			});

			slideLinks.forEach(function(link) {
				link.addEventListener('click', function(e) {
					e.preventDefault();
					const slideIndex = parseInt(this.getAttribute('data-slide'));
					const slideIndexNested = parseInt(this.getAttribute('data-slide-nested'));

					if (slideIndexNested === 5) {
						externalSwiper.slideTo(5);
					} 
					nestedSwiper.slideTo(slideIndexNested);
					externalSwiper.slideTo(slideIndex);

					
					slideLinks.forEach(function(item) {
						item.classList.remove('header__link--active')
					});
					this.classList.add('header__link--active')

				});
			});

			footerLink.forEach(function(link) {
				link.addEventListener('click', function(e) {
					e.preventDefault();
					const slideIndex = parseInt(this.getAttribute('data-slide'));
					const slideIndexNested = parseInt(this.getAttribute('data-slide-nested'));

					if (slideIndexNested === 5) {
						externalSwiper.slideTo(5);
					} 
					nestedSwiper.slideTo(slideIndexNested);
					externalSwiper.slideTo(slideIndex);

					footerLink.forEach(function(item) {
						item.classList.remove('header__link--active')
					});
					this.classList.add('header__link--active')

				});
			});


			pagination.forEach(function(link) {
				link.addEventListener('click', function(e) {
					e.preventDefault();
					const slideIndex = parseInt(this.getAttribute('data-slide'));
					const slideIndexNested = parseInt(this.getAttribute('data-slide-nested'));

					if (slideIndexNested === 5) {
						externalSwiper.slideTo(5);
					} 
					nestedSwiper.slideTo(slideIndexNested);
					externalSwiper.slideTo(slideIndex);

					
					pagination.forEach(function(item) {
						item.classList.remove('header__link--active')
					});
					this.classList.add('header__link--active')

				});
			});
		}

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
							alert('Error during sending');
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
					div.innerHTML = "Enter your data in the field";

					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
					setTimeout(formErorrRemove, 4000)
				}
			
				function formAddErrorEmail(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Enter your email";

					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
					setTimeout(formErorrRemove, 4000)
				}
			
				function formAddErrorCheck(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Consent to the processing of personal data";

					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
					setTimeout(formErorrRemove, 4000)
				}
			
				function emailTest(input) {
					return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/. test(input.value);
				}

			});
		};
		forms('.form');


});
	