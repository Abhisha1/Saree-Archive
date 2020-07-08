import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import './preferenceModal.scss';
import { MdClear} from "react-icons/md";
import * as Validation from '../../validation/stringSanitising.js';

export function ModalContent(props){
    const [currentScreen, setCurrentScreen] = useState(0);
    const [locations, setLocations] = useState(props.locationOptions);
    const [crowd, setCrowd] = useState(props.crowdOptions);
    const [showLocationError,setshowLocationError] = useState(false)
    const [showCrowdError,setShowCrowdError] = useState(false);

    const updatePreferences = (value, field) => {
        if (field === "locationFields"){
            if(!locations.includes(value)){
                value = Validation.cleanTrailingSpaces(value);
                if (value.length !== 0){
                    setLocations(locations => [...locations, value]);
                }
                
            }
            else{
                toast("You already have entered this location")
            }
        }
        if (field === "crowdFields"){
            if(!crowd.includes(value)){
                value = Validation.cleanTrailingSpaces(value);
                if (value.length !== 0){
                    setCrowd(crowd => [...crowd, value]);
                }
            }
            else{
                toast("You already have entered this crowd")
            }
        }
    }
    const handleKeyDown = (event) => {
        if(event.key === "Enter"){
            event.preventDefault();
            updatePreferences(event.target.value, event.target.id);
            event.target.value = "";
        }
    }
    const remove = (event) => {
        // console.log(event.target.id);
        if(event.target.id === "locationRemove"){
            let oldLocations = [...locations];
            if (event.target.key !== -1){
                oldLocations.splice(event.target.key,1)
                setLocations(oldLocations);
            }
        }
        if(event.target.id === "crowdRemove"){
            let oldCrowd = [...crowd];
            if (event.target.key !== -1){
                oldCrowd.splice(event.target.key,1)
                setCrowd(oldCrowd);
            }
        }
    }
    return(
        <div>
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>
        <div hidden={currentScreen !== 0} id="firstScreen">
                    <h1 id="addHeading">
                        Hi There!
                    </h1>
                    <p className="leftField">
                        Before you add your first saree, we need a few details.
                    </p>
                    <button id="modalButton" className="btn btn-secondary" onClick={() => setCurrentScreen(1)}>Get started</button>
                </div>
                <div hidden={currentScreen !== 1} id="firstScreen">
                    <h1 id="addHeading">
                        Location
                    </h1>
                    <p className="leftField">
                        Please add at least one location for where your sarees are kept. This can be changed at any time later!
                    </p>
                    <form>
                    <input type="text" id="locationFields" onChange={() => setshowLocationError(false)} className="form-control" placeholder="e.g. Blue suitcase" aria-label="Locations sarees are kept in" onKeyDown={handleKeyDown}></input>
                    </form>
                    <div className="tags">
                        {console.log(locations.length)}
                    {locations.length > 0 &&
                        locations.map((item,index) => (
                            <div key={index} className="tag">
                                {item}
                                <MdClear key={index} onClick={remove} id="locationRemove" className="tagRemove"/>
                            </div>
                        ))
                        }
                    </div>
                    <div hidden={!showLocationError} className="alert alert-danger alert-dismissable fade show" role="alert">
                        Please enter at least one location!
                        
                    </div>
                    
                    <button id="modalButton" className="btn btn-secondary" onClick={() => {
                        if (locations.length === 0){
                            setshowLocationError(true);
                        }
                        else{
                            setCurrentScreen(2);
                        }
                        }}>Next</button>
                </div>
                <div hidden={currentScreen !== 2} id="firstScreen">
                    <h1 id="addHeading">
                        Crowd
                    </h1>
                    <p className="leftField">
                        Please add at least one crowd group to keep track of who sees the sarees you wear. This can be changed at any time later!
                    </p>
                    <form>
                    <input type="text" id="crowdFields" onChange={() => setShowCrowdError(false)} className="form-control" placeholder="e.g. Old school girls" aria-label="Crowd who sees sarees" onKeyDown={handleKeyDown}></input>
                    </form>
                    <div className="tags">
                        {console.log(crowd.length)}
                    {crowd.length === 0 ? <h6>Doesn't</h6>
                    :
                        crowd.map((item,index) => (
                            <div key={index} className="tag">
                                {item}
                                <MdClear key={index} onClick={remove} id="crowdRemove" className="tagRemove"/>
                            </div>
                        ))
                        }
                    </div>
                    <div hidden={!showCrowdError} className="alert alert-danger" role="alert">
                        Please enter at least one crowd group!
                    </div>
                    <button id="modalButton" className="btn btn-secondary" onClick={() => {
                        if (locations.length === 0){
                            setShowCrowdError(true);
                        }
                        else{
                            props.action(locations, crowd)
                        }
                        }}>Done</button>
                </div>
                </div>
    );
}




const PreferenceModal = (props) => {
    
    const setPreferences = (newLocations, newCrowd) => {
        props.action(newLocations, newCrowd);
    }

    return(
        <div>
            <ToastContainer />
        <Modal show={!props.hidden}>
            <Modal.Body>
            <ModalContent crowdOptions={props.crowdOptions} locationOptions={props.locationOptions} action={setPreferences}/>
            
            </Modal.Body>
        </Modal>
        </div>
    );
}

export default PreferenceModal;

