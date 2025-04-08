function acordeonVertical(idAcordeon) {
	const accordionItemHeaders = document.querySelectorAll('section.acordeon-vertical#' + idAcordeon + ' .accordion-item-header');
	accordionItemHeaders.forEach(accordionItemHeader => {
		accordionItemHeader.addEventListener('click', event => {
			const currentlyActiveAccordionItemHeader = document.querySelector('section.acordeon-vertical#' + idAcordeon + ' .accordion-item-header.active');
			if (currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader !== accordionItemHeader) {
				currentlyActiveAccordionItemHeader.classList.toggle('active');
				currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
			}
			accordionItemHeader.classList.toggle('active');
			const accordionItemBody = accordionItemHeader.nextElementSibling;
			if (accordionItemHeader.classList.contains('active')) {
				accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px';
			}
			else {
				accordionItemBody.style.maxHeight = 0;
			}
		});
	});
};
