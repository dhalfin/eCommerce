import {
	createStore,
	applyMiddleware,
	compose
} from "redux";

import thunk from 'redux-thunk';

import createRootReducer from './reducer';


export default function configureStore(preloadedState) {

	const store = createStore(
		createRootReducer(),
		preloadedState,
		compose(applyMiddleware(thunk), // window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_())
	);

	return store;
}
