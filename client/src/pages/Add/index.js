import React, { useState, useEffect } from 'react';
import "./add.scss";
import Navbar from "../../components/Navbar";
import axios from 'axios';
import PreferenceModal from '../../components/PreferenceModal';
import History from '../../components/History';
import ImageUpload from '../../components/ImageUpload';
import { MdError } from "react-icons/md";
import SinglePopUp from "../../components/SinglePopUp";
import MonthPicker from "../../components/MonthPicker";
import Tagger from "../../components/Tagger";



function Add() {
    const [showHasEvent, setShowHasEvent] = useState(false);
    const typeOptions = ["Kanchipuram", "Soft Silk", "Fancy", "Georgette", "Linen",
        "Cotton", "Pattu"];
    const [saree, setSaree] = useState([]);
    const [showPurchase, setShowPurchase] = useState(false);
    const [hideAskPurchase, setHideAskPurchase] = useState(false);
    const [purchaseDate, setPurchaseDate] = useState(new Date(new Date().getFullYear()+'-'+new Date().getMonth()+'-1'));
    const [locationOptions, setLocationOptions] = useState([]);
    const [crowdOptions, setCrowdOptions] = useState([]);
    const [history, setHistory] = useState([]);
    const [tagOptions, setTagOptions] = useState([])
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const [formFields, setFormFields] = useState({
        blouseStitched: true,
        type: typeOptions[0],
        purchase: {
            datePurchased: null,
            wherePurchased: ''
        },
        location: '',
        tags: [],
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
        setFormFields(form);
    }

    const uploadSaree = (event) => {
        event.preventDefault();
        let form = formFields;
        if (showPurchase) {
            form.purchase.datePurchased = purchaseDate;
        }
        if (!showPurchase) {
            form.purchase.datePurchased = null;
        }
        form.imgs = saree;
        form.worn = history;
        form.tags = tags;
        setFormFields(form);
        console.log(formFields);
        console.log(saree)
        if (saree.length === 0){
            setShowError(true);
            console.log(showError);
            return;
        }
        const formData = new FormData();
        formFields.imgs.map((item) => {
            formData.append('files', item)
        })
        console.log(formFields.purchase)
        formData.set("fields", JSON.stringify(formFields));
        formData.set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZDM3YTk5MDRkM2UyNWI5OGY3OTExYyIsImlhdCI6MTU5NDYxNDU1NywiZXhwIjoxNTk0NzAwOTU3LCJpc3MiOiJHZWV0c1NhcmVlcyIsInN1YiI6InNlc3Npb24tdG9rZW4ifQ.wWW3BBXtiPD-doY-G2tTuF5RD6DB_geN2Bst0kMQss0")
        axios.post('http://localhost:5000/api/sarees/add', formData)
            .then(user => {
                console.log(user);
            })
            .catch(err => {
                console.log("Couldn't get user's records");
            })
        
    }
    useEffect(() => {
        axios.post('https://geethasaree.herokuapp.com/auth/getCurrentUser', { token: localStorage.getItem("token") })
            .then(user => {
                setLocationOptions(user.data.locations);
                setCrowdOptions(user.data.crowd);
                setLoading(false);
                if(user.data.tags){
                    setTagOptions(user.data.tags);
                }
                if (user.data.locations.length === 0 || user.data.crowd.length === 0) {
                    setShowModal(true);
                }
                console.log(user)
            })
            .catch(err => {
                console.log("Couldn't get user's records");
            })
    }, [])

    useEffect(() => {
        setShowError(false);
    }, [saree]);

    useEffect(() => {
        if (!loading && crowdOptions.length > 0){
            axios.post('https://geethasaree.herokuapp.com/api/users/addCrowd', { token: localStorage.getItem("token"), crowd: crowdOptions })
            .then((crowds) => console.log(crowds))
            .catch(err => {
                console.log("Couldn't get user's records");
            })  
         }  
    }, [crowdOptions]);
    useEffect(() => {
        if (!loading && locationOptions.length > 0){
            axios.post('https://geethasaree.herokuapp.com/api/users/addLocation', { token: localStorage.getItem("token"), locations: locationOptions })
            .then((locs) => console.log(locs))
            .catch(err => {
                console.log("Couldn't get user's records");
            })    
        }
    }, [locationOptions]);

    useEffect(() => {
        if (!loading){
            let newTags=  [];
            tags.forEach((item) => {
                if (!tagOptions.includes(item)){
                    newTags.push(item);
                }
            })
            console.log(newTags)
            if (newTags.length > 0){
                newTags.forEach((item)=> {
                    setTagOptions(tagOptions => [...tagOptions, item])
                })
            }
        }
    }, [tags]);

    useEffect(() => {
        console.log(tagOptions);
        if(!loading && tagOptions.length > 0){
            axios.post('https://geethasaree.herokuapp.com/api/users/addTags', { token: localStorage.getItem("token"), tags: tagOptions })
        .then((locs) => console.log(locs))
        .catch(err => {
            console.log("Couldn't get user's records");
        }) 
        }
        
    }, [tagOptions])

    const updateList = (list) => {
        console.log(list)
        setLocationOptions(list);
        setShowPopUp(false);
    }
    const setMonth = (monthNumber) => {
        let tempDate = purchaseDate;
        tempDate.setMonth(monthNumber);
        setPurchaseDate(tempDate)
    }
    const setYear = (year) => {
        let tempDate = purchaseDate;
        tempDate.setFullYear(year);
        setPurchaseDate(tempDate)
    }
    return (
        <div className="addContainer">
            <Navbar></Navbar>
            <form className="form" encType="multipart/form-data">
                <div className="leftAdd">
                    <h1 id="addHeading">
                        Add a saree
                    </h1>
                    <ImageUpload action={setSaree} saree={saree}></ImageUpload>
                    {showError && <div id="noImageError">
                        <MdError size={30}></MdError>
                        <p id="imageErrorMessage"> Please upload at least one image</p> </div>}
                    <div>
                        <h2 className="addSubHeading">
                            Last Worn History
                        </h2>
                        <p className="descriptionText" hidden={showHasEvent}>Do you have an event that you want to add?</p>
                        <div className="btn-group btn-group-toggle eventCheck" data-toggle="buttons" hidden={showHasEvent}>

                            <label className="btn btn-secondary active">
                                <input type="radio" name="options" id="option1" autoComplete="off"/> No
                    </label>
                            <label className="btn btn-secondary">
                                <input type="radio" name="options" id="option2" autoComplete="off" onClick={() => {
                                    setShowHasEvent(true)
                                }} /> Yes
                    </label>

                        </div>
                        {showHasEvent &&
                        <History crowdOptions={crowdOptions} history={history} action={setHistory} setcrowd={setCrowdOptions}></History>
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
                            <a className="link" onClick={() => setShowPopUp(true)}>Add another location?</a>
                        </div>
                        {showPopUp &&
                    <SinglePopUp action={updateList} list={locationOptions} fieldName="Locations"></SinglePopUp>}
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
                                    <MonthPicker month={purchaseDate.getMonth()} year={purchaseDate.getFullYear()}
                                    setMonth={setMonth} setYear={setYear} minYear={1940}></MonthPicker>
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
                    <Tagger options={tagOptions} tags={tags} action={setTags}></Tagger>
                    <button type="submit" className="btn btn-primary" onClick={uploadSaree}>Add saree</button>
                </div>

            </form>
            <PreferenceModal hidden={!showModal} crowdOptions={crowdOptions} locationOptions={locationOptions} action={finishPreferenceSetting}></PreferenceModal>
        </div>
    )
}

export default Add;
