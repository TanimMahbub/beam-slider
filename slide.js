
	"use strict";

	// getting getElelements in shorter words
	const getSelector=(cssSelector)=>document.querySelector(cssSelector);
	const getAll=(getAll)=>document.querySelectorAll(getAll);
	const getClass=(Class)=>document.getElementsByClassName(Class);
	const getTag=(tag)=>document.getElementsByTagName(tag);
	const getId=(id)=>document.getElementById(id);
	const newE=(newE)=>document.createElement(newE);
	
	//slider function
	function mySlide(trigger, starts = 1, items = 1){
		//slider container
		let theContainer = getSelector(trigger);
		let { 
			firstElementChild: firstSlide,
			lastElementChild: lastSlide,
			children
		} = theContainer;

		//main wrapper, needs to be created from here
		let theWrapper = theContainer.parentElement;

		//pagination
		if (children) {
			// creating `ul` tag
			var pagination = newE('ul');
			pagination.className = 'pagination';
			theWrapper.appendChild(pagination);

			//creating `li` tags
			let inx = 0;
			for (let p in children) {
				if (children.hasOwnProperty(p)) {
					let pagiLi = newE('li');
					pagiLi.setAttribute('data-indx', inx);
					inx++;
					pagination.appendChild(pagiLi);
					pagiLi.innerHTML = children[p].innerHTML;
				}
			}

			// getting `li`s as var
			var {
				firstElementChild: firstDot,
				lastElementChild: lastDot,
				children: theDots,
			} = pagination;
		}

		// items to show, their width & dotts width
		let itemsWidth = 100 / items;
		let dotsWidth = 85 / theDots.length;
		for (var w in children) {
			if (children.hasOwnProperty(w)) {
				if (items == null) {
					children[w].style.width = '100%';
					theDots[w].style.flexBasis = '100%';
				}else {
					children[w].style.width = `${itemsWidth}%`;
					theDots[w].style.flexBasis = `${dotsWidth}%`;
				}
			}
		}

		//active class
		if (starts == null) {
			firstSlide.classList.add('active');
			firstDot.classList.add('active');
		}else {
			children[starts].classList.add('active');
			theDots[starts].classList.add('active');
		}

		//previous slide
		function prevSlide() {
			let findActive = getSelector(`${trigger} .active`);
			let activeDot = getSelector('.pagination .active');
			let { 
				classList: itemClasses,
				previousElementSibling: prevItem,
			} = findActive;
			let { previousElementSibling: prevDot} = activeDot;
			if (itemClasses.contains('active') && prevItem && prevDot) {
				itemClasses.remove('active');
				prevDot.classList.add('active');
				activeDot.removeAttribute('class');
				prevItem.classList.add('active');
			}else if (firstSlide.classList.contains('active') && firstDot.classList.contains('active')) {
				firstSlide.classList.remove('active');
				lastSlide.classList.add('active');
				firstDot.removeAttribute('class');
				lastDot.classList.add('active');
			}
		}
		
		//next slide
		function nextSlide() {
			let findActive = getSelector(`${trigger} .active`);
			let activeDot = getSelector('.pagination .active');
			let { 
				classList: itemClasses,
				nextElementSibling: nextItem
			} = findActive;
			let { nextElementSibling: nextDot } = activeDot;
			if (itemClasses.contains('active') && nextItem && nextDot) {
				itemClasses.remove('active');
				nextItem.classList.add('active');
				activeDot.removeAttribute('class');
				nextDot.classList.add('active');
			}else if (lastSlide.classList.contains('active') && lastDot.classList.contains('active')) {
				lastSlide.classList.remove('active');
				firstSlide.classList.add('active');
				lastDot.removeAttribute('class');
				firstDot.classList.add('active');
			}
		}

		//navigation
		if (children.length != 0) {
			let nav = newE('div');
			let prev = newE('span');
			let next = newE('span');
			nav.className = 'nav';
			prev.className = 'prev';
			next.className = 'next';
			theWrapper.insertBefore(nav, theContainer.nextElementSibling);
			nav.appendChild(prev).innerHTML = '←';
			nav.appendChild(next).innerHTML = '→';
			prev.addEventListener("click", prevSlide);
			next.addEventListener("click", nextSlide);
		}

		let pagi = document.querySelector('.pagination');
		if(pagi){
			pagi.addEventListener('click', (e)=>{
				let pagilist = e.target.parentElement;
				if( 'LI' == pagilist.nodeName ){
					let clickedIndex = parseInt(pagilist.getAttribute('data-indx'));
					let itemList = document.querySelectorAll('.item-container .item');
					let findActiveItem = getSelector('.item.active');
					let findActivePagi = getSelector('.pagination li.active');
					findActivePagi.classList.remove('active');
					findActiveItem.classList.remove('active');
					itemList[clickedIndex].classList.add('active');
					pagilist.classList.add('active');
				}
			});

		}
	}