import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import * as Validation from '../../validation/stringSanitising.js';
import Tag from '../../components/Tag';
import './singlePopUp.scss';

export function Content(props){
    const [list, setList] = useState(props.list);
    const [showError,setShowError] = useState(false)

    const updatePreferences = (value) => {
        if(!list.includes(value)){
            value = Validation.cleanTrailingSpaces(value);
            if (value.length !== 0){
                setList(list => [...list, value]);
            }
            
        }
        else{
            if(props.fieldName === "Locations"){
                toast("You already have entered this location");
            }
            else{
                toast("You already have entered this crowd");
            }
        }
    }
    const handleKeyDown = (event) => {
        if(event.key === "Enter"){
            event.preventDefault();
            updatePreferences(event.target.value);
            event.target.value = "";
        }
    }
    const removeItem = (index) => {
        let oldList = [...list];
        if (index!== -1){
            oldList.splice(index,1)
            setList(oldList);
        }
    }
    return(
        <div>
                <div>
                    <h1 id="addHeading">
                        {props.fieldName}
                    </h1>
                    <p className="leftField">
                        Add your tags below
                    </p>
                    <form>
                    <div className="tagLine">
                    <input type="text" id="listField" onChange={() => setShowError(false)} className="form-control" placeholder="Press enter to add your tag" aria-label="Edit preferece" onKeyDown={handleKeyDown}></input>
                    <button id="modalButton" className="btn btn-secondary" onClick={(event) => {
                        event.preventDefault();
                        updatePreferences(document.getElementById("crowdFields").value, "listField");
                        document.getElementById("listField").value = "";
                    }}>Add</button>
                    </div>
                    </form>
                    <div className="tags">
                        {console.log(list)}
                        {list.length > 0 &&
                        list.map((item,index) => (
                            <Tag remove={removeItem} key={index} index={index} item={item}></Tag>
                        ))
                        }
                    </div>
                    <div hidden={!showError} className="alert alert-danger" role="alert">
                        Please enter at least one tag!
                    </div>
                    <button disabled={list.length === 0} id="modalButton" className="btn btn-secondary" onClick={() => {
                        if (list.length === 0){
                            setShowError(true);
                        }
                        else{
                            props.action(list)
                        }
                        }}>Done</button>
                </div>
                </div>
    );
}




const SinglePopUp = (props) => {
    
    const setList = (list) => {
        props.action(list);
    }

    return(
        <div>
            <ToastContainer />
        <Modal show={!props.hidden}>
            <Modal.Body>
            <Content list={props.list} action={setList} fieldName={props.fieldName} />
            </Modal.Body>
        </Modal>
        </div>
    );
}

export default SinglePopUp;

