import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import App from '../App';

configure({ adapter: new Adapter() });

describe('Item', () => {
  it('renders without crashing', () => {
    mount(<App />);
  });
  it('renders correctly', () => {
	const tree = renderer
	  .create(<App />)
	  .toJSON();
	expect(tree).toMatchSnapshot();
  });

  describe('addItem', () => {
    it('should add an item to state when called', () => {
      let element = shallow(<App />);
      expect(element.state('items').length).toBe(0);
      expect(element.state('items')).toEqual([]);
      element.instance().addItem({label: "test", cost: "1"});
      expect(element.state('items').length).toBe(1);
      expect(element.state('items')).toEqual([{label: "test", cost: "1"}]);
    });

    it('should clear out suggestions when called', () => {
      let element = shallow(<App />);
      element.setState({itemSuggestions: 'apple,banana'})
      expect(element.state('itemSuggestions')).toBe('apple,banana');
      element.instance().addItem({label: "test", cost: "1"});
      expect(element.state('itemSuggestions')).toBe('');
    });
  });

  describe('removeItem', () => {
    it('should remove an item to state when called', () => {
      let element = shallow(<App />);
      element.setState({items: [{label: "test", cost: "1"}]})
      expect(element.state('items').length).toBe(1);
      expect(element.state('items')).toEqual([{label: "test", cost: "1"}]);
      element.instance().removeItem(0)();
      expect(element.state('items').length).toBe(0);
      expect(element.state('items')).toEqual([]);
    });

    it('should not remove an item when index is out of range', () => {
      let element = shallow(<App />);
      element.setState({items: [{label: "test", cost: "1"}]})
      expect(element.state('items').length).toBe(1);
      expect(element.state('items')).toEqual([{label: "test", cost: "1"}]);
      element.instance().removeItem(123123)();
      expect(element.state('items').length).toBe(1);
      expect(element.state('items')).toEqual([{label: "test", cost: "1"}]);
    });
  });

  describe('getSuggestions', () => {
    jest.useFakeTimers();
    it('should return 5 suggestions with no input', () => {
      let element = shallow(<App />);
      expect(element.state('itemSuggestions')).toBe('');
      element.instance().getSuggestions('');
      jest.runAllTimers();
      expect(element.state('itemSuggestions')).toBe('apples:Apples:1.29,pears:Pears:2.49,oranges:Oranges:0.99,bananas:Bananas:1.75,watermelon:Watermelon:0.33');
    });

    it('should return filtered suggestions with input', () => {
      let element = shallow(<App />);
      expect(element.state('itemSuggestions')).toBe('');
      element.instance().getSuggestions('a');
      jest.runAllTimers();
      expect(element.state('itemSuggestions')).toBe('apples:Apples:1.29,avocados:Avocados:1.99');
    });

    it('should return no suggestions with input that yields no results', () => {
      let element = shallow(<App />);
      expect(element.state('itemSuggestions')).toBe('');
      element.instance().getSuggestions('asdasd');
      jest.runAllTimers();
      expect(element.state('itemSuggestions')).toBe('');
    });
  });

  describe('serialize', () => {
    it('should serialize items to a string', () => {
      let element = shallow(<App />);
      expect(element.instance().serialize([{id: '1', name: 'test1', cost: '1'}, {id: '2', name: 'test2', cost: '2'}])).toBe('1:test1:1,2:test2:2');
    });

    it('should serialize no items to an empty string', () => {
      let element = shallow(<App />);
      expect(element.instance().serialize([])).toBe('');
    });
  });
});
