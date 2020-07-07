import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import './preferenceModal.scss';
import { MdClear} from "react-icons/md";

export function ModalContent(props){
    const [currentScreen, setCurrentScreen] = useState(0);
    const [locations, setLocations] = useState(props.locationOptions);
    const [crowd, setCrowd] = useState(props.crowdOptions);

    const finished = () => {
        props.locationOptions = locations;
        props.crowdOptions = crowd;
        props.hidden = true;
    }
    const updatePreferences = (value, field) => {
        if (field === "locationFields"){
            if(!locations.includes(value)){
                setLocations(locations => [...locations, value]);
                
            }
            else{
                toast("You already have entered this location")
            }
        }
        if (field === "crowdFields"){
            if(!crowd.includes(value)){
                setCrowd(crowd => [...crowd, value]);
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
        <div hidden={currentScreen !== 0} id="firstScreen">
                    <h1 id="addHeading">
                        Hi There!
                    </h1>
                    <p className="leftField">
                        Before you add your first saree, we need a few details.
                    </p>
                    <button className="btn btn-secondary" onClick={() => setCurrentScreen(1)}>Get started</button>
                </div>
                <div hidden={currentScreen !== 1} id="firstScreen">
                    <h1 id="addHeading">
                        Location
                    </h1>
                    <p className="leftField">
                        Please add at least one location for where your sarees are kept. This can be changed at any time later!
                    </p>
                    <form>
                    <input type="text" id="locationFields" className="form-control" placeholder="e.g. Blue suitcase" aria-label="Locations sarees are kept in" onKeyDown={handleKeyDown}></input>
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
                    
                    <button className="btn btn-secondary" onClick={() => setCurrentScreen(2)}>Next</button>
                </div>
                <div hidden={currentScreen !== 2} id="firstScreen">
                    <h1 id="addHeading">
                        Crowd
                    </h1>
                    <p className="leftField">
                        Please add at least one crowd group to keep track of who sees the sarees you wear. This can be changed at any time later!
                    </p>
                    <form>
                    <input type="text" id="crowdFields" className="form-control" placeholder="e.g. Old school girls" aria-label="Crowd who sees sarees" onKeyDown={handleKeyDown}></input>
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
                    
                    <button className="btn btn-secondary" onClick={() => finished()}>Done</button>
                </div>
                </div>
    );
}




const PreferenceModal = (props) => {
    

    return(
        <div>
            <ToastContainer />
        <Modal show={!props.hidden}>
            <Modal.Body>
            <ModalContent crowdOptions={props.crowdOptions} locationOptions={props.locationOptions} />
            
            </Modal.Body>
        </Modal>
        </div>
    );
}

export default PreferenceModal;

