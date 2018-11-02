import style from '../styles/itemsContainer.scss';

class XItemContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({
			mode: 'open'
		});
	}
	connectedCallback() {
		const styleTag = document.createElement("style");
		styleTag.innerHTML = style;
		this.shadowRoot.appendChild(styleTag);

		const title = this.getAttribute('title');
		const itemHeader = document.createElement('header');
		itemHeader.className = 'itemHeader';
		itemHeader.innerHTML = title;
		this.shadowRoot.appendChild(itemHeader);

		const itemsContainer = document.createElement('div');
		itemsContainer.className = 'itemsContainer';
		itemsContainer.innerHTML = '<slot></slot>';
		this.shadowRoot.appendChild(itemsContainer);
	}
}

export default XItemContainer;