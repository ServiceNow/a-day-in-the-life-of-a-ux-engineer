import React from 'react';

class EditPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			costInput: '',
			itemInput: '',
			itemError: '',
			costError: ''
		}
	}

	addItem = (e) => {
		if (!this.state.itemError && !this.state.costError) {
			this.props.addItem(e, { label: this.state.itemInput, cost: this.state.costInput });
			this.setState({ itemInput: '', costInput: '' });
		}
	}

	onPriceChange = (e) => {
		this.setState({ costInput: e.target.value, costError: '' });
	}

	onItemChange = (e) => {
		this.setState({ itemInput: e.target.value, itemError: '' });
	}

	getSuggestions = (e) => {
		if (e.key.length === 1)
			this.props.getSuggestions(e, this.state.itemInput);
	}

	onItemBlur = () => {
		let itemError = '';
		if (!this.isValidItem(this.state.itemInput)) {
			itemError = 'Invalid item!'
		}
		this.setState({ itemError });
	}

	onPriceBlur = () => {
		let costError = '';
		if (!this.isValidPrice(this.state.costInput)) {
			costError = 'Invalid price!'
		}
		this.setState({ costError });
	}

	isValidItem = (item) => true

	isValidPrice = (price) => true

	selectItem = (selected) => (e) => {
		this.setState({ itemInput: selected.name, costInput: selected.cost })
		this.props.itemSelected(e, selected);
	}

	render() {
		return (
			<div className="editorContainer">
				<div className="editorLabel">Add New Item</div>
				<div className="editorInput">
					<label htmlFor="itemInput">Label</label>
					<input id="itemInput" name="itemInput" value={this.state.itemInput} onChange={this.onItemChange} onBlur={this.onItemBlur} onKeyUp={this.getSuggestions} />
					{this.state.itemError && <span className="editorInputError">{this.state.itemError}</span>}
					{this.props.itemSuggestions && <ul className="inputSuggestions">
						{this.props.itemSuggestions.map((opt, idx) => <li key={opt.id + idx} onClick={this.selectItem(opt)}>{opt.name}</li>)}
					</ul>}
				</div>
				<div className="editorInput">
					<label htmlFor="costInput">Cost</label>
					<input id="costInput" name="costInput" value={this.state.costInput} onChange={this.onPriceChange} onBlur={this.onPriceBlur} />
					{this.state.costError && <span className="editorInputError">{this.state.costError}</span>}
				</div>
				<button id="addItem" onClick={this.addItem} disabled={this.state.itemInput !== '' && this.state.costInput !== '' ? undefined : 'disabled'}>Add</button>
			</div>
		);
	}
}

export default EditPanel;