import fp from 'lodash/fp';

const getLoadedCustomEventObject = (payload) => {

	let detail = fp.merge({
		meta: {
			stopPropagation: false
		}
	}, payload);

	return {
		composed: true,
		bubbles: true,
		detail
	};
}

const getCustomEventObject = () => getLoadedCustomEventObject({});

export {
	getLoadedCustomEventObject,
	getCustomEventObject
}