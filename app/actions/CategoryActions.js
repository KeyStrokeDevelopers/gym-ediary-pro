import { FETCH_CATEGORY_DATA, SEARCH_CATEGORY_DATA, EDIT_CATEGORY_DATA, DELETE_CATEGORY_DATA, ADD_CATEGORY_DATA, ERROR_CATEGORY_DATA } from '../actions/actionConstants';
import { addCategoryApi, getCategoryApi } from '../api/category'

const fetchCategoryData = categoryData => ({
    type: FETCH_CATEGORY_DATA,
    payload: categoryData
});

const editCategoryData = categoryData => ({
    type: EDIT_CATEGORY_DATA,
    payload: categoryData
});

const searchCategoryData = categoryData => ({
    type: SEARCH_CATEGORY_DATA,
    payload: categoryData
});

const deleteCategoryData = categoryData => ({
    type: DELETE_CATEGORY_DATA,
    payload: categoryData
});

const addCategoryData = categoryData => ({
    type: ADD_CATEGORY_DATA,
    payload: categoryData
});

const errorCategoryData = error => ({
    type: ERROR_CATEGORY_DATA,
    payload: error
})

export const addCategory = (data) => {
    return (dispatch) => {
        addCategoryApi(data).then((response) => {
            console.log('response data --------', response.data);
            dispatch(addCategoryData(response.data))
        })
            .catch((err) => {
                console.log('error-----', err);
                dispatch(errorCategoryData(err));
            })
    }
}

