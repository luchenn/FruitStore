export const REQUEST_ITEMS = 'REQUEST_ITEMS'
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS'
export const SELECT_STORE = 'SELECT_STORE'
export const INVALIDATE_STORE = 'INVALIDATE_STORE'

export function selectStore(store) {
    return {
        type: SELECT_STORE,
        store
    }
}

export function invalidateStore(store) {
    return {
        type: INVALIDATE_STORE,
        store
    }
}

function requestItems(store) {
    return {
        type: REQUEST_ITEMS,
        store
    }
}

function receiveItems(store, json) {
    return {
        type: RECEIVE_ITEMS,
        store,
        items: json,    // some processing can be done here
        receivedAt: Date.now()
    }
}

export function fetchItems(store) {
    return dispatch => {
        dispatch(requestItems(store))
        return fetch(`https://fruit-test.herokuapp.com/${store}.json`)
            .then(response => response.json())
            .then(json => dispatch(receiveItems(store, json)))
    }
}

// function shouldFetchPosts(state, store) {
//     const items = state.itemsByStore[store]
//     if (!items) {
//         return true
//     } else if (items.isFetching) {
//         return false
//     } else {
//         return items.didInvalidate
//     }
// }
//
// export function fetchItemsIfNeeded(store) {
//     return (dispatch, getState) => {
//         if (shouldFetchPosts(getState().rootReducer, store)) {
//             console.log("Going to fetch!!");
//             return dispatch(fetchItems(store))
//         }
//     }
// }