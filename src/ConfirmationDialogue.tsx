import React from 'react'
import { ConfirmationSVG } from '../lib/svg/FormSVG';
import '../styles/ConfirmationDialogue.css';

interface ConfirmationDialogueTypes {
  setConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  confirmation: boolean;
  submitData: (() => Promise<void>) & (() => Promise<any>);
  isValid: boolean
}

function ConfirmationDialogue({ isValid, submitData, confirmation, setConfirmation }: ConfirmationDialogueTypes) {
  return (
    <section id="confirmation-dialogue" style={!confirmation ? { display: 'none' } : {}}>
      <div className={`confirmation-wrapper ${confirmation ? 'confirmation-wrapper--open' : 'confirmation-wrapper--close'}`}>
        <ConfirmationSVG />
        <h1 className="lead-text">Are you sure everything is correct?</h1>
        <p style={{ marginBottom: '30px' }} className='paragraph'>You won't be able to edit your reservation.</p>
        <button aria-label="edit reservation" onClick={() => {
          setConfirmation(false)
        }} type="button" className="yellow-rounded paragraph confirmation-false">Check back</button>
        <button aria-label="submit reservation" type="button" onClick={() => {
          if (isValid) {
            submitData();
          }
        }} className="yellow-rounded paragraph confirmation-true">All correct</button>
      </div>
    </section>
  )
}

export default ConfirmationDialogue