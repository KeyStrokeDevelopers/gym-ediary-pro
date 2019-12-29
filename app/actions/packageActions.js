import { FETCH_PACKAGE_DATA, SEARCH_PACKAGE_DATA, EDIT_PACKAGE_DATA, DELETE_PACKAGE_DATA, ADD_PACKAGE_DATA, ERROR_PACKAGE_DATA } from '../actions/actionConstants';
import { addPackageApi, getPackageApi } from '../api/package'

const fetchPackageData = packageData => ({
    type: FETCH_PACKAGE_DATA,
    payload: packageData
});

const editPackageData = packageData => ({
    type: EDIT_PACKAGE_DATA,
    payload: packageData
});

const searchPackageData = packageData => ({
    type: SEARCH_PACKAGE_DATA,
    payload: packageData
});

const deletePackageData = packageData => ({
    type: DELETE_PACKAGE_DATA,
    payload: packageData
});

const addPackageData = packageData => ({
    type: ADD_PACKAGE_DATA,
    payload: packageData
});

const errorPackageData = error => ({
    type: ERROR_PACKAGE_DATA,
    payload: error
})

export const addPackage = (data) => {
    return (dispatch) => {
        addPackageApi(data).then((response) => {
            console.log('response data --------', response.data);
            dispatch(addPackageData(response.data))
        })
            .catch((err) => {
                console.log('error-----', err);
                dispatch(errorPackageData(err));
            })
    }
}

