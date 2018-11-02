import React from 'react';
import ReactDOM from 'react-dom'

import Item from '../components/Item';

import style from '../styles/item.scss';

class XItem extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({
			mode: 'open'
		});
	}
	connectedCallback() {
		const cost = this.getAttribute('cost');
		const label = this.getAttribute('label');
		ReactDOM.render(<Item label={label} cost={cost} />, this.shadowRoot);
		const styleTag = document.createElement("style");
		styleTag.innerHTML = style;
		this.shadowRoot.appendChild(styleTag);
	}
}

export default XItem;