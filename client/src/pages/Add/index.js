import React, { useState, useEffect } from 'react';
import "./add.scss";
import Navbar from "../../components/Navbar";
import DatePicker from 'react-datepicker';
import axios from 'axios';
import PreferenceModal from '../../components/PreferenceModal';
import History from '../../components/History';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import ImageUpload from '../../components/ImageUpload';

function Add() {
    const [showHasEvent, setShowHasEvent] = useState(false);
    const typeOptions = ["Kanchipuram", "Soft Silk", "Fancy", "Georgette", "Linen",
        "Cotton", "Pattu"];
    const [saree, setSaree] = useState([]);
    const [showPurchase, setShowPurchase] = useState(false);
    const [hideAskPurchase, setHideAskPurchase] = useState(false);
    const [purchaseDate, setPurchaseDate] = useState(new Date());
    const [locationOptions, setLocationOptions] = useState([]);
    const [crowdOptions, setCrowdOptions] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [formFields, setFormFields] = useState({
        blouseStitched: true,
        type: typeOptions[0],
        purchase: {
            datePurchased: null,
            wherePurchased: ''
        },
        location: '',
        notes: '',
        imgs: saree,
        worn: history
    })

    const onChange = (event) => {
        let existing = formFields;
        let field = event.target.getAttribute('field');
        setProgress(progress + 1);
        if (field === "purchase") {
            existing[event.target.getAttribute('subfield')] = event.target.value;
            setFormFields(existing);
        }
        if (field === "blouseStiched") {
            let blouse;
            event.target.value === 'yes' ? (blouse = true) : (blouse = false);
            existing["blouseStitched"] = blouse;
            setFormFields(existing);
        }
        else {
            existing[field] = event.target.value;
            setFormFields(existing);
        }
    }
    const hasPurchaseToAdd = () => {
        setShowPurchase(true);
        setHideAskPurchase(true);
    }

    const finishPreferenceSetting = (newLocations, newCrowd) => {
        setLocationOptions(newLocations);
        setCrowdOptions(newCrowd);
        setShowModal(false);
        let form = formFields;
        form["location"] = newLocations[0];
        setFormFields(formFields);
    }

    const uploadSaree = (event) => {
        event.preventDefault();
        let form = formFields;
        if (!hideAskPurchase) {
            form.purchase.datePurchased = purchaseDate;
        }
        if (hideAskPurchase) {
            form.purchase.datePurchased = null;
        }
        form.imgs = saree;
        form.worn = history;
        setFormFields(form);
        console.log(formFields);
    }
    useEffect(() => {
        axios.post('https://geethasaree.herokuapp.com/auth/getCurrentUser', { token: localStorage.getItem("token") })
            .then(user => {
                setLocationOptions(user.data.locations);
                setCrowdOptions(user.data.crowd);
                setLoading(false);
            })
            .then(() => {
                if (locationOptions.length === 0 || crowdOptions.length === 0) {
                    setShowModal(true);
                }
            })
            .catch(err => {
                console.log("Couldn't get user's records");
            })
    }, [])

    return (
        <div className="addContainer">
            <Navbar></Navbar>
            <form className="form">
                <div className="leftAdd">
                    <h1 id="addHeading">
                        Add a saree
                    </h1>
                    <ImageUpload action={setSaree} saree={saree}></ImageUpload>
                    <div>
                        <h2 className="addSubHeading">
                            Last Worn History
                        </h2>
                        <p className="descriptionText" hidden={showHasEvent}>Do you have an event that you want to add?</p>
                        <div className="btn-group btn-group-toggle eventCheck" data-toggle="buttons" hidden={showHasEvent}>

                            <label className="btn btn-secondary">
                                <input type="radio" name="options" id="option1" autoComplete="off" /> No
                    </label>
                            <label className="btn btn-secondary">
                                <input type="radio" name="options" id="option2" autoComplete="off" onClick={() => {
                                    setShowHasEvent(true)
                                }} /> Yes
                    </label>

                        </div>
                        {showHasEvent &&
                        <History crowdOptions={crowdOptions} history={history} action={setHistory}></History>
                        }
                    </div>
                </div>

                <div className="rightAdd">

                    <h2 className="addSubHeading">
                        Details
                </h2>
                    <div className="eventTop">
                        <div className="leftField split">
                            Location of saree*
                        <div className="form-group dropdown">
                                <select className="form-control" id="exampleFormControlSelect1" field="location" onChange={onChange}>
                                    {loading
                                        ? <option>Fetching locations</option>
                                        :
                                        locationOptions.map((item, index) => (
                                            <option key={index}> {item} </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        <div className="leftField split">
                            Stitched blouse?
                        <div className="form-group dropdown">
                                <select className="form-control" id="exampleFormControlSelect1" field="blouseStitched" onChange={onChange}>
                                    <option> Yes </option>
                                    <option> No </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="leftField sareeType">
                        Saree Type
                        <div className="btn-group btn-group-toggle eventCheck customHeading" data-toggle="buttons">

                            <div className="form-group dropdown">
                                <select field="type" onChange={onChange} className="form-control" id="exampleFormControlSelect1">
                                    {typeOptions.map((item, index) => (
                                        <option key={index}> {item} </option>
                                    ))}
                                </select>
                            </div>

                        </div>
                    </div>
                    <h2 className="addSubHeading">
                        Purchase history
                </h2>
                    <p className="descriptionText" hidden={hideAskPurchase}>Do you remember details about the saree's purchasing?</p>
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
                                        selected={purchaseDate}
                                        onChange={date => setPurchaseDate(date)}
                                    />
                                </div>
                                <div className="leftField split">
                                    <div className="customHeading">
                                        Where saree was bought
                                    </div>
                                    <input field="purchase" subfield="wherePurchased" onChange={onChange} type="text" className="form-control" placeholder="e.g. Pothys" aria-label="Where did you purchase?" aria-describedby="basic-addon1"></input>
                                </div>
                            </div>
                        </div>

                    }
                    <h2 className="addSubHeading">
                        Additional notes
                    <p className="descriptionText">Any other comments or notes you want to make about this saree</p>
                        <textarea field="notes" onChange={onChange} className="form-control" aria-label="Additional notes"></textarea>
                    </h2>
                    <button type="submit" className="btn btn-primary" onClick={uploadSaree}>Add saree</button>
                </div>

            </form>
            <PreferenceModal hidden={!showModal} crowdOptions={crowdOptions} locationOptions={locationOptions} action={finishPreferenceSetting}></PreferenceModal>
        </div>
    )
}

export default Add;
