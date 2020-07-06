import React, { useState, useEffect } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import "./add.scss";
import Navbar from "../../components/Navbar";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Add() {
    const [lastWorn, setLastWorn] = useState(false);
    const [showHasEvent, setShowHasEvent] = useState(false);
    const [eventDate, setEventDate] = useState(new Date());
    const [showImage, setShowImage] = useState(false);
    const [saree, setSaree] = useState(null);
    const [showPurchase, setShowPurchase] = useState(false);
    const [hideAskPurchase, setHideAskPurchase] = useState(false);
    const [purchaseDate, setPurchaseDate] = useState(new Date());

    const hasEventToAdd = () => {
        setLastWorn(true);
        setShowHasEvent(true);
    }
    const hasPurchaseToAdd = () => {
        setShowPurchase(true);
        setHideAskPurchase(true);
    }
    return (
        <div className="homeContainer">
            <Navbar></Navbar>
        
        <form className="form">
            <div className="leftAdd">
                <h1 id="addHeading">
                    Add a saree
                </h1>
                {
                    showImage ?
                    <img></img>
                    :
                    (saree ? 
                    <img src={saree}/>
                    :
                    <div id="placeholderImage">
                        <label htmlFor="myfile" id="uploadButton">Upload</label>
                        <input type="file" id="myfile" accept="image/*" onChange={(event)=> setSaree(URL.createObjectURL(event.target.files[0]))} />
                    </div>
                    )
                }
                <h2 className="addSubHeading">
                    Last Worn History
                </h2>
                <h6 hidden={showHasEvent}>Do you have an event that you want to add?</h6>
                <div className="btn-group btn-group-toggle eventCheck" data-toggle="buttons" hidden={showHasEvent}>
                    
                    <label className="btn btn-secondary active firstActive">
                        <input type="radio" name="options" id="option1" autoComplete="off" /> No
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="options" id="option2" autoComplete="off" onClick={() => hasEventToAdd()} /> Yes
                    </label>
                    
                </div>
                {lastWorn && 
                <div className="lastWornEvent">
                    <div className="eventTop">
                        <div className="leftField split">
                            Event date
                            <DatePicker
                                className="customDate"
                                selected={eventDate}
                                onChange={date => setEventDate(date)}
                            />
                            </div>
                        <div className="leftField split">
                            <div className="customHeading">
                            Crowd
                            </div>
                        <input type="text" className="form-control" placeholder="Crowd" aria-label="Crowd" aria-describedby="basic-addon1"></input>
                        </div>
                    </div>
                    <div className="leftField">
                        Description
                        <textarea className="form-control" aria-label="Description"></textarea>
                    </div>
                </div>
                    }
            </div>
            <div className="rightAdd">
                
                <h2 className="addSubHeading">
                    Details
                </h2>
                <div className="eventTop">
                    <div className="leftField split">
                        Location of saree*
                        <div className="form-group dropdown">
                            <select className="form-control" id="exampleFormControlSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            </select>
                        </div>
                    </div>
                    <div className="leftField split">
                        Stitched blouse?
                        <div id="blouseCheck" className="btn-group btn-group-toggle eventCheck" data-toggle="buttons" hidden={showHasEvent}>
                        
                        <label className="btn btn-secondary active firstActive">
                            <input type="radio" name="options" id="option1" autoComplete="off" /> No
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio" name="options" id="option2" autoComplete="off" /> Yes
                        </label>
                        
                        </div>
                     </div>
                </div>
                <h2 className="addSubHeading">
                    Purchase history
                </h2>
                <h6 hidden={hideAskPurchase}>Do you remember details about the saree's purchasing?</h6>
                <div className="btn-group btn-group-toggle eventCheck" data-toggle="buttons" hidden={hideAskPurchase}>
                    
                    <label className="btn btn-secondary active firstActive">
                        <input type="radio" name="options" id="option1" autoComplete="off" /> No
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="options" id="option2" autoComplete="off" onClick={() => hasPurchaseToAdd()} /> Yes
                    </label>
                </div> 
                {
                    showPurchase &&
                        <div className="lastWornEvent">
                            <div className="eventTop">
                                <div className="leftField split">
                                    Date saree bought
                                    <DatePicker
                                        className="customDate"
                                        selected={eventDate}
                                        onChange={date => setPurchaseDate(date)}
                                    />
                                    </div>
                                <div className="leftField split">
                                    <div className="customHeading">
                                    Where saree was bought
                                    </div>
                                <input type="text" className="form-control" placeholder="e.g. Pothys" aria-label="Where did you purchase?" aria-describedby="basic-addon1"></input>
                                </div>
                            </div>
                        </div>

                }
                <h2 className="addSubHeading">
                    Additional notes
                    <h6>Any other comments or notes you want to make about this saree</h6>
                    <textarea className="form-control" aria-label="Additional notes"></textarea>
                </h2>
                
            </div>
            

        </form>
        </div>
    )
}

export default Add;
