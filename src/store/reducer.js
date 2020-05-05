import { combineReducers } from "redux";
import * as Actions from "./actions";

const initialStore = {
	catalog: {}, // list of all products
	prices: {}, // price range
	categories: {}, // list of categories from the server
	colors: {}, // list of the colors
	brands: {},
	isLoading: {}, // the display of the boot process
	sortOnPage: "Date", // filter category Sort By in the shop drop-down list (by default "Date")
	itemsOnPage: "4", // number of products in the View dropdown on the shop page (by default "4")
	cart: [], // products in the cart {id, amount}
	sum: 0, // sum of product prices in the cart
	priceFilter: [21, 110], // filter by price
	onShopPage: false,
	pagination: "0", // the current product page
	singleImageItem: {}, // list of images of a single product
	singleReviewItem: {}, // review for one product
	activeImg: 0, // active carousel image
	itemMemory: "", // storing the last viewed catalog item for reloading images and descriptions
	currentColorFilter: "ALL", // current filter by color
	currentCategoryFilter: "1",
};

function rootReducer(store = initialStore, action) {

	switch (action.type) {
		case Actions.LOAD_CATALOG:
			return {
				...store,
				catalog: { ...action.payload },
			};

		case Actions.LOAD_PRICES:
			return {
				...store,
				prices: { ...action.payload },
			};

		case Actions.LOAD_CATEGORIES:
			return {
				...store,
				categories: { ...action.payload },
			};

		case Actions.LOAD_COLORS:
			return {
				...store,
				colors: { ...action.payload },
			};

		case Actions.LOAD_BRANDS:
			return {
				...store,
				brands: { ...action.payload },
			};

		case Actions.UPDATE_LOADING:
			return {
				...store,
				isLoading: { ...store.isLoading, ...action.payload }
			};

		case Actions.UPDATE_SORT_ON_PAGE:
			return {
				...store,
				sortOnPage: action.payload,
				pagination: "0",
			};

		case Actions.UPDATE_ITEM_ON_PAGE:
			return {
				...store,
				itemsOnPage: action.payload,
				pagination: "0",
			};

		case Actions.UPDATE_CART:
			return {
				...store,
				cart: [...action.payload],
			};

		case Actions.UPDATE_SUM:
			return {
				...store,
				sum: action.payload,
			};

		case Actions.UPDATE_PRICE_FILTER:
			return {
				...store,
				priceFilter: [...action.payload],
				pagination: "0",
			};

		case Actions.ON_PAGE_SHOP_FILTER:
			return {
				...store,
				onShopPage: action.payload,
			};

		case Actions.NUMERATOR:
			return {
				...store,
				pagination: action.payload,
			};

		case Actions.UPLOAD_SINGLE_IMAGE_ITEM:
			return {
				...store,
				singleImageItem: { ...action.payload },
			};

		case Actions.UPLOAD_SINGLE_REVIEW_ITEM:
			return {
				...store,
				singleReviewItem: { ...action.payload },
			};

		case Actions.ACTIVE_IMG:
			return {
				...store,
				activeImg: action.payload,
			};

		case Actions.ITEM_MEMORY:
			return {
				...store,
				itemMemory: action.payload,
			};

		case Actions.CURRENT_COLOR_FILTER:
			return {
				...store,
				currentColorFilter: action.payload,
				pagination: "0",
			};

		case Actions.CURRENT_CATEGORY_FILTER:
			return {
				...store, 
				currentCategoryFilter: action.payload,
				pagination: "0",
			};

		default:
			return store;

	};
};

export default () => combineReducers({
	app: rootReducer,
});