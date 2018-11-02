import React from 'react';
import ReactDOM from 'react-dom';
import { getCustomEventObject, getLoadedCustomEventObject } from '../utils/events';

import EditPanel from '../components/EditPanel';

import style from '../styles/editPanel.scss';

class XEditPanel extends HTMLElement {
	constructor() {
	  super();
	  this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		return ['suggestions'];
	  }

	connectedCallback() {
		const suggestionsString = this.getAttribute('suggestions');
		ReactDOM.render(<EditPanel itemSuggestions={this.deserialize(suggestionsString)} getSuggestions={this.getSuggestions} addItem={this.addItem} itemSelected={this.itemSelected} />, this.shadowRoot);
		const styleTag = document.createElement('style');
		styleTag.innerHTML = style;
		this.shadowRoot.appendChild(styleTag);
	}
	
	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'suggestions':
			  ReactDOM.render(<EditPanel itemSuggestions={this.deserialize(newValue)} getSuggestions={this.getSuggestions} addItem={this.addItem} itemSelected={this.itemSelected} />, this.shadowRoot);
			  break;
			
		  }
		
	}

	deserialize = (suggestionsString) => {
		if (!suggestionsString)
			return [];
		return suggestionsString.split(',').map((item) => {
			let props = item.split(':');
			return {
				id: props[0],
				name: props[1],
				cost: props[2]
			}
		});
	}

	getSuggestions = (e, chars) => {
		this.dispatchEvent(new CustomEvent('get-suggestions', getLoadedCustomEventObject()));
	}
	addItem = (e, item) => {
		this.dispatchEvent(new CustomEvent('add-item', getLoadedCustomEventObject({item})));
	}

	itemSelected= (e) => {
		this.dispatchEvent(new CustomEvent('item-selected', getCustomEventObject() ));
	}
	
}
	
export default XEditPanel;