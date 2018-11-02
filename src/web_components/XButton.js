import React from 'react'
import ReactDOM from 'react-dom'

import Button from '../components/Button';

import style from '../styles/button.scss';

class XButton extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({
			mode: 'open'
		});
	}
	connectedCallback() {

		const name = this.getAttribute('name');
		const label = this.getAttribute('label');
		ReactDOM.render( < Button name={name} label = {label} />, this.shadowRoot );
		const styleTag = document.createElement("style"); 
		styleTag.innerHTML = style; 
		this.shadowRoot.appendChild(styleTag);
	}
}

export default XButton;