import React, { useReducer } from 'react';
import { useNavigate } from "react-router-dom";
import BookingForm from './BookingForm';
import { fetchAPI, submitAPI } from './utils/utils';

export function initializeTimes() {
    return fetchAPI(new Date());
}

export function getDates(date) {
    return fetchAPI(date);
}

export function updateTimes(state, action) {
    switch (action.type) {
        case "INITIALIZE":
            return initializeTimes();
        case "GET DATE":
            return fetchAPI(action.data);
        default:
            return state;
    }
}

export default function BookingPage() {
    const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());
    const navigate = useNavigate();

    const submitFormData = (datas) => {
        if (submitAPI(datas)) {
            navigate("/success");
        }
    }

    return (
        <BookingForm 
            submitFormData={submitFormData} 
            availableTimes={availableTimes} 
            setDates={dispatch} 
        />
    );
}
