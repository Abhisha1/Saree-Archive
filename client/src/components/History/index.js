import React, { useState, useEffect } from 'react';
import MonthPicker from "../../components/MonthPicker";
import {MdExpandLess, MdExpandMore} from 'react-icons/md';
import SinglePopUp from "../SinglePopUp";
import './history.scss';

function History(props) {
    const [eventDate, setEventDate] = useState(new Date(new Date().getFullYear()+'-'+new Date().getMonth()+'-1'));
    const [crowd, setCrowd] = useState(props.crowdOptions[0]);
    const [description, setDescription] = useState('');
    const [history, setHistory] = useState(props.history);
    const [currentEditEvent, setCurrentEditEvent] = useState(null);
    const [showPopUp, setPopUp] = useState(false);

    useEffect(() => {
        props.action(history);
        setCrowd(props.crowdOptions[0]);
        setDescription('');
        setEventDate(new Date(new Date().getFullYear()+'-'+new Date().getMonth()+'-1'));
    }, [history]);

    const addAnother = (event) => {
        event.preventDefault();
        setHistory(history => [...history, {
            lastWorn: eventDate,
            crowd: crowd,
            description: description
        }])
    }
    const updateList = (list) => {
        console.log(list)
        props.setcrowd(list);
        setPopUp(false);
    }
    const setMonth = (monthNumber) => {
        let tempDate = eventDate;
        tempDate.setMonth(monthNumber);
        setEventDate(tempDate)
    }
    const setYear = (year) => {
        let tempDate = eventDate;
        tempDate.setFullYear(year);
        setEventDate(tempDate)
    }
    return (
        <div>
            {
                history.length > 0 &&
                (history.map((item, index) => (
                    <div key={index} className="minimisedRow">
                        <p className="eventDescriptionMinimised">EVENT {index}</p>
                        <p hidden={index===currentEditEvent} className="trailingDescription" onClick={() => setCurrentEditEvent(index)}>View the details of the event </p>
                        {currentEditEvent === index ? 
                        <div>
                        <MdExpandLess className="closeButton" onClick={() => setCurrentEditEvent(null)}></MdExpandLess>
                        <p className="trailingDescription">DATE: {item.lastWorn.toDateString()}</p>
                        <p className="trailingDescription">CROWD: {item.crowd}</p>
                        <p className="trailingDescription">DESCRIPTION: {item.description}</p>
                        </div>
                        :
                        <MdExpandMore className="expandButton" onClick={() => setCurrentEditEvent(index)}></MdExpandMore>
                        }
                    </div>
                    )))

            }
            <div className="lastWornEvent">
                <div className="eventTop">
                    <div className="leftField split">
                        Event date
                        <MonthPicker month={eventDate.getMonth()} year={eventDate.getFullYear()}
                                    setMonth={setMonth} setYear={setYear} minYear={1940}></MonthPicker>
                    </div>
                    <div className="leftField split">
                        <div className="customHeading">
                            Crowd
                            </div>
                        <div className="form-group dropdown">
                            <select className="form-control" field="crowdDescription" id="exampleFormControlSelect1" value={crowd} onChange={(event) => setCrowd(event.target.value) }>
                                {
                                    props.crowdOptions.map((item, index) => (
                                        <option key={index}> {item} </option>
                                    ))
                                }
                            </select>
                        </div>
                        <a className="link" onClick={() => setPopUp(true)}>Add another crowd group?</a>
                    </div>
                </div>
                {showPopUp &&
                    <SinglePopUp action={updateList} list={props.crowdOptions} fieldName="Crowd"></SinglePopUp>}
                <div className="leftField">
                    Description
                        <textarea field="eventDescription" className="form-control" aria-label="Description" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>
                <button id="saveEventButton" className="btn btn-secondary" onClick={addAnother}> Save event</button>
            </div>
        </div>
    )
}

export default History;