import { useState } from 'react';
import { Collapse } from 'react-collapse';
import { CheckmarkChecked, CheckmarkUnchecked, Chevron } from './lib/svg/FormSVG';

import './styles/AdditionalInformation.css';

const occasionDatas = [
    { id: 0, occasion: 'Casual', key: "new" },
    { id: 1, occasion: 'Formal', key: "key" },
    { id: 2, occasion: 'Party', key: "ree" },
];

const checkmarkDatas = [
    [
        { id: 0, occasion: 'Smoking' },
        { id: 1, occasion: 'Indoor' },
        { id: 2, occasion: 'Outdoor' }
    ],
    [
        { id: 3, occasion: 'Prepare Cutlery' },
        { id: 4, occasion: 'Baby Seat' }
    ]
];

export default function AdditionalInformation({ occasion, setOccasion, checkmark, setCheckmark }) {
    const [isOpened, setIsOpened] = useState(true);

    return (
        <>
            <button
                aria-label="expand-menu"
                title="Expand"
                className="mt-24 lead-text additional-information"
                type="button"
                onClick={() => setIsOpened(!isOpened)}
            >
                Additional Information <Chevron className={`${isOpened ? 'chevron--opened' : ""}`} />
            </button>
            <Collapse isOpened={isOpened}>
                <div style={{ justifyContent: 'space-around' }} className="people-component">
                    {occasionDatas.map((occasions) => (
                        <button
                            type="button"
                            aria-label="pick occasion"
                            key={occasions.key}
                            onClick={() => setOccasion(occasions.id)}
                            className={`paragraph form-button ${occasion === occasions.id ? 'form-button-active' : ""}`}
                        >
                            {occasions.occasion}
                        </button>
                    ))}
                </div>
                {checkmarkDatas.map((data, dataIndex) => (
                    <div className="checkmark-container" key={`${dataIndex}-key`}>
                        {data.map((occasions) => {
                            const exists = checkmark.includes(occasions.id);

                            return (
                                <div
                                    key={occasions.id}
                                    onClick={() => {
                                        if (occasions.id === 1 && checkmark.includes(2)) {
                                            const newCheckmark = checkmark.filter((check) => check !== 2);
                                            setCheckmark([...newCheckmark, 1]);
                                            return;
                                        } else if (occasions.id === 2 && checkmark.includes(1)) {
                                            const newCheckmark = checkmark.filter((check) => check !== 1);
                                            setCheckmark([...newCheckmark, 2]);
                                            return;
                                        }
                                        if (exists) {
                                            const newCheckmark = checkmark.filter((check) => check !== occasions.id);
                                            setCheckmark(newCheckmark);
                                            return;
                                        }
                                        setCheckmark([...checkmark, occasions.id]);
                                    }}
                                >
                                    {exists ? <CheckmarkChecked /> : <CheckmarkUnchecked />}
                                    <p className='paragraph'>{occasions.occasion}</p>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </Collapse>
        </>
    );
}
