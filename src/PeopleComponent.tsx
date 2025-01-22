import { Person, Persons, Party } from "../lib/svg/FormSVG";

interface PeopleTypes {
    id: number;
    number: string;
    logo: JSX.Element;
}

interface PeopleComponentTypes {
    peopleAmount: number;
    setPeopleAmount: React.Dispatch<React.SetStateAction<number>>
}

function numberRange(start: number, end: number) {
    return new Array(end - start + 1).fill(0).map((d, i) => i + start);
}

const peopleDatas: PeopleTypes[] = [
    { id: 0, number: '1-4', logo: <Person /> },
    { id: 1, number: '5-8', logo: <Persons /> },
    { id: 2, number: '9-12', logo: <Party /> },
]

export default function PeopleComponent({ peopleAmount, setPeopleAmount }: PeopleComponentTypes) {
    return (
        <div className="people-component">
            {
                peopleDatas.map((people) => (
                    <button
                        type="button"
                        key={people.id} className={`paragraph form-button ${peopleAmount === people.id ? 'form-button-active' : ''}`}
                        onClick={() => { setPeopleAmount(people.id) }}>{people.number}  {people.logo}</button>
                ))
            }
            <select style={{ textAlign: 'center' }} onChange={(e) => {
                const val: number | string = e.target.value;
                if (val === 'custom') {
                    setPeopleAmount(0);
                    return;
                }
                setPeopleAmount(Number(val))
            }}
                className={`paragraph form-button ${peopleAmount >= 13 ? 'form-button-active' : ''}`}>
                <option value="custom">Custom</option>
                {
                    numberRange(13, 50).map((nums, idx) => (
                        <option key={idx} value={nums}>{nums}</option>
                    ))
                }
            </select>
        </div>
    )
}