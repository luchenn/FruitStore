import { combineReducers } from 'redux'
import {
    SELECT_STORE,
    INVALIDATE_STORE,
    REQUEST_ITEMS,
    RECEIVE_ITEMS
} from '../actions/fetcher'


function selectedStore(state = "fruit", action) {
    switch (action.type) {
        case SELECT_STORE:
            return action.store
        default:
            return state
    }
}


const INITIAL = {
    isFetching: false,
    didInvalidate: false,
    fruitItems: []
};

function items(state = INITIAL, action) {
    switch (action.type) {
        case INVALIDATE_STORE:
            return {...state, didInvalidate: true}

        case REQUEST_ITEMS:
            return {...state, isFetching: true, didInvalidate: false}

        case RECEIVE_ITEMS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                fruitItems: action.items,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

function itemsByStore(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_STORE:
        case RECEIVE_ITEMS:
        case REQUEST_ITEMS:
            return Object.assign({}, state, {
                [action.store]: items(state[action.store], action)
            })
        default:
            return state
    }
}

const fetcherReducer = combineReducers({
    itemsByStore,
    selectedStore
})

export default fetcherReducer