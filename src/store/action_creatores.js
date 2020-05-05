import * as Actions from './actions';

export function loadCatalog(payload) {
	return {
		type: Actions.LOAD_CATALOG,
		payload,
	};
};

export function loadPrices(payload) {
	return {
		type: Actions.LOAD_PRICES,
		payload,
	};
};

export function loadCategories(payload) {
	return {
		type: Actions.LOAD_CATEGORIES,
		payload,
	};
};

export function loadColors(payload) {
	return {
		type: Actions.LOAD_COLORS,
		payload,
	};
};

export function loadBrands(payload) {
	return {
		type: Actions.LOAD_BRANDS,
		payload,
	};
};

export function updateLoading(payload) {
	return {
		type: Actions.UPDATE_LOADING,
		payload,
	};
};

export function updateSortOnPage(payload) {
	return {
		type: Actions.UPDATE_SORT_ON_PAGE,
		payload,
	};
};

export function updateItemOnPage(payload) {
	return {
		type: Actions.UPDATE_ITEM_ON_PAGE,
		payload,
	};
};

export function updateCart(payload) {
	return {
		type: Actions.UPDATE_CART,
		payload,
	};
};

export function updateSum(payload) {
	return {
		type: Actions.UPDATE_SUM,
		payload,
	};
};

export function updatePriceFilter(payload) {
	return {
		type: Actions.UPDATE_PRICE_FILTER,
		payload,
	};
};

export function updateOnPageShopFilter(payload) {
	return {
		type: Actions.ON_PAGE_SHOP_FILTER,
		payload,
	};
};

export function loadNumerator(payload) {
	return {
		type: Actions.NUMERATOR,
		payload,
	};
};

export function uploadSingleImageItem(payload) {
	return {
		type: Actions.UPLOAD_SINGLE_IMAGE_ITEM,
		payload,
	};
};

export function uploadSingleReviewItem(payload) {
	return {
		type: Actions.UPLOAD_SINGLE_REVIEW_ITEM,
		payload,
	};
};

export function activeCarouselChanger(payload) {
	return {
		type: Actions.ACTIVE_IMG,
		payload,
	};
};

export function itemMemoryChecker(payload) {
	return {
		type: Actions.ITEM_MEMORY,
		payload,
	};
};

export function colorFilterUpdater(payload) {
	return {
		type: Actions.CURRENT_COLOR_FILTER,
		payload,
	};
};

export function currentCategoryUpdater(payload) {
	return {
		type: Actions.CURRENT_CATEGORY_FILTER,
		payload,
	};
};

export function uploadDataToStore(actions, key = "") {

	const serverBase = [
		{
			url: `http://test-api.ipromote.ru/API/CATALOG/FIND${key}`,
			requestName: "catalog",
			actions: loadCatalog,
		},
		{
			url: `http://test-api.ipromote.ru/API/CATALOG/RANGE`,
			requestName: "prices",
			actions: loadPrices,
		},
		{
			url: `http://test-api.ipromote.ru/API/CATEGORY/FIND`,
			requestName: "categories",
			actions: loadCategories,
		},
		{
			url: `http://test-api.ipromote.ru/API/COLOR/FIND`,
			requestName: "colors",
			actions: loadColors,
		},
		{
			url: `http://test-api.ipromote.ru/API/BRAND/FIND`,
			requestName: "brands",
			actions: loadBrands,
		},
		{
			url: `http://test-api.ipromote.ru/API/IMAGE/FIND${key}`,
			requestName: "imageItem",
			actions: uploadSingleImageItem,
		},
		{
			url: `http://test-api.ipromote.ru/API/REVIEW/FIND${key}`,
			requestName: "reviewItem",
			actions: uploadSingleReviewItem,
		},
	]

	return (dispatch) => {

		for (let i = 0; i < serverBase.length; i++) {

			if (serverBase[i].requestName === actions) {
				dispatch(updateLoading({ [serverBase[i].requestName]: true }));
				const data = fetch(serverBase[i].url);
				data.then((data) => {
					return data.json();
				}).then((data) => {
					dispatch(serverBase[i].actions(data));
					dispatch(updateLoading({ [serverBase[i].requestName]: false }));
				}).catch((e) => {
					dispatch(updateLoading({ [serverBase[i].requestName]: false }));
					console.log("ERROR while loading data from url", e);
				});
			}
		}
	};
};