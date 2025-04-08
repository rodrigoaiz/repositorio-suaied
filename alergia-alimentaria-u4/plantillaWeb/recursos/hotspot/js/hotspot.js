function hotspot(idHotspot) {
	const tooltipTriggerList = document.querySelectorAll('section.hotspot#' + idHotspot + ' [data-bs-toggle="tooltip"]');
	const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}
