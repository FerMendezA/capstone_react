import { Person, Persons, Party } from "./lib/svg/FormSVG";

function numberRange(start, end) {
    return new Array(end - start + 1).fill(0).map((_, i) => i + start);
}

const peopleDatas = [
    { id: 0, number: '1-4', logo: <Person /> },
    { id: 1, number: '5-8', logo: <Persons /> },
    { id: 2, number: '9-12', logo: <Party /> },
];

export default function PeopleComponent({ peopleAmount, setPeopleAmount }) {
    return (
        <div className="people-component">
            {
                peopleDatas.map((people) => (
                    <button
                        type="button"
                        key={people.id}
                        className={`paragraph form-button ${peopleAmount === people.id ? 'form-button-active' : ''}`}
                        onClick={() => setPeopleAmount(people.id)}
                    >
                        {people.number} {people.logo}
                    </button>
                ))
            }
            <select
                style={{ textAlign: 'center' }}
                onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'custom') {
                        setPeopleAmount(0);
                        return;
                    }
                    setPeopleAmount(Number(val));
                }}
                className={`paragraph form-button ${peopleAmount >= 13 ? 'form-button-active' : ''}`}
            >
                <option value="custom">Custom</option>
                {
                    numberRange(13, 50).map((num, idx) => (
                        <option key={idx} value={num}>{num}</option>
                    ))
                }
            </select>
        </div>
    );
}
