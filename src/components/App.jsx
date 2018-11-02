import React from 'react';
import update from 'immutability-helper';

import { get, nameFilter } from '../platform/datasource';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.editPanel;
    this.state = {
      items: [],
      itemSuggestions: '',
    }
  }

  addItem = (item) => {
    const newItems = update(this.state.items, { $push: [{ label: item.label, cost: item.cost }] });
    this.setState({ items: newItems, itemSuggestions: '' });
  }

  removeItem = (idx) => (e) => {}

  getSuggestions = (chars) => {
    const filter = nameFilter(chars, 5);
    const inventoryGetter = get('inventory');
    inventoryGetter(filter, (result) => this.setState({ itemSuggestions: this.serialize(result) }));
  }  

  componentDidMount = () => {
    if (this.editPanel) {
      this.editPanel.addEventListener('get-suggestions', (e) => this.getSuggestions(e.detail.chars), false);
      this.editPanel.addEventListener('item-selected', (e) => this.setState({ itemSuggestions: '' }), false);
      this.editPanel.addEventListener('add-item', (e) => this.addItem(e.detail.item), false);
    }
  }

  serialize = (items) => items.reduce((acc, item) => acc === '' ? item.id + ':' + item.name + ':' + item.cost : acc + ',' + item.id + ':' + item.name + ':' + item.cost, ''); 

  render() {
    return (
      <div className="appContainer">
        <x-header>Shoppr</x-header>
        <x-item-container title="Your items:">
          {this.state.items.map((item, idx) => 
            <x-item-row key={idx}>
              <x-item slot="item" cost={item.cost} label={item.label} />
              <x-button slot="delete" onClick={this.removeItem(idx)} name='remove' label='Remove' />
            </x-item-row>
          )}
          <div className="itemSummary">
            {this.state.items.length === 0 ?
              <span>'No items in your cart.'</span>
              :
              <span className="itemsTotal">Total: <span>...</span></span>
            }
          </div>
        </x-item-container>
        <x-edit-panel suggestions={this.state.itemSuggestions} ref={el => this.editPanel = el}/>
      </div>
    );
  }
}

export default App;