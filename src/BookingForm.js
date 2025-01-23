import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from "react-router-dom";
import AdditionalInformation from './AditionalInformation';
import PeopleComponent from './PeopleComponent';
import { BackButton, SmallLogo } from './lib/svg/FormSVG';
import ConfirmationDialogue from './ConfirmationDialogue';
import './styles/BookingForm.css';


// Función para cambiar formato de fecha
function changeDate(date) {
    const options = { weekday: 'short', year: '2-digit', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString("en-GB", options);
}

// Componente para el selector de fecha
function DatePicker({ setProvidedDate, setDate }) {
    const now = new Date();
    return (
        <input
            type="date"
            className="date paragraph"
            data-date={changeDate(now)}
            onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                setDate(selectedDate);
                setProvidedDate(selectedDate);
                e.target.setAttribute('data-date', changeDate(selectedDate));
            }}
            min={now.toISOString().split("T")[0]}
            max={new Date(now.setDate(now.getDate() + 14)).toISOString().split("T")[0]}
        />
    );
}

// Componente principal
export default function BookingForm({ submitFormData, availableTimes, setDates }) {
    const [peopleAmount, setPeopleAmount] = useState(0);
    const [occasion, setOccasion] = useState(0);
    const [checkmark, setCheckmark] = useState([1]);
    const [confirmation, setConfirmation] = useState(false);
    const [time, setTime] = useState(availableTimes[0]);
    const [date, setDate] = useState(new Date());

    const navigate = useNavigate();

    const setProvidedDate = (selectedDate) => {
        setDates({ type: "GET DATE", data: selectedDate });
    };

    return (
        <Formik
            initialValues={{ email: '', name: '' }}
            validate={(values) => {
                const errors = {};
                if (!values.name) {
                    errors.name = "Required Field.";
                }
                if (!values.email) {
                    errors.email = 'Required Field.';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    const allValues = { ...values, time, date, checkmark, occasion, peopleAmount };
                    alert(JSON.stringify(allValues, null, 2));
                    submitFormData(true);
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ isValid, submitForm }) => (
                <Form className="form-container" style={confirmation ? { overflowY: 'hidden', height: '100vh' } : {}}>
                    <nav className="reserve-nav">
                        <div onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>
                            <BackButton />
                        </div>
                        <h1 className="section-title">Reserve a Table</h1>
                        <SmallLogo />
                    </nav>
                    {/* Información de contacto */}
                    <div className="container">
                        <h1 className="lead-text mb-12">Contact Information</h1>
                        <label htmlFor="name">
                            <h3 className="paragraph">Name</h3>
                        </label>
                        <Field type="text" name="name" placeholder="John Doe" className="form-input paragraph" />
                        <ErrorMessage name="name" component="div" className="error-text" />
                        <label htmlFor="email">
                            <h3 className="paragraph mt-12">Email</h3>
                        </label>
                        <Field type="email" name="email" placeholder="foo@bar.com" className="form-input paragraph" />
                        <ErrorMessage name="email" component="div" className="error-text" />
                        {/* Fecha y hora */}
                        <h1 className="lead-text mt-24 mb-9">Reservation Date and Time</h1>
                        <DatePicker setProvidedDate={setProvidedDate} setDate={setDate} />
                        <select className="time paragraph" onChange={(e) => setTime(e.target.value)}>
                            {availableTimes.map((time, idx) => (
                                <option key={idx} value={time}>{time}</option>
                            ))}
                        </select>
                        {/* Cantidad de personas */}
                        <h1 className="lead-text mt-24">Number of people</h1>
                        <PeopleComponent peopleAmount={peopleAmount} setPeopleAmount={setPeopleAmount} />
                        <AdditionalInformation
                            checkmark={checkmark}
                            setCheckmark={setCheckmark}
                            occasion={occasion}
                            setOccasion={setOccasion}
                        />
                        <h1 className="lead-text mt-24">Please notice that...</h1>
                        <ul className="paragraph">
                            <li>Your reservation confirmation will be sent to your email, so please make sure your contact information is correct.</li>
                            <li>If you don't arrive within 30 minutes, we will give your table to someone else.</li>
                            <li>There is an extra service charge of 50 cents for using our online reservation.</li>
                        </ul>
                    </div>
                    <div className="reserve-container">
                        <button
                            aria-label="reserve button"
                            title="Reserve"
                            type="button"
                            className="yellow-rounded lead-text"
                            onClick={() => setConfirmation(true)}
                        >
                            Reserve
                        </button>
                    </div>
                    <ConfirmationDialogue isValid={isValid} submitData={submitForm} confirmation={confirmation} setConfirmation={setConfirmation} />
                </Form>
            )}
        </Formik>
    );
}
