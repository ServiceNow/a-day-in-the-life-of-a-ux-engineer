import style from '../styles/itemRow.scss';

class XItemRow extends HTMLElement {
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
		
		const container = document.createElement('div');
		container.className = 'itemContainer';
		container.innerHTML = '<span class="item"><slot name="item"></slot></span><span class="itemDelete"><slot name="delete"></slot></span>'
		this.shadowRoot.appendChild(container);
	}
}

export default XItemRow;