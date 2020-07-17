import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import Navbar from "../../components/Navbar";
import './view.scss';
import {ReactComponent as Spinner} from "../../assets/spinner.svg";
import AutoComplete from "../../components/AutoComplete";

function View(){
    const [loading, setLoading] = useState(true);
    const node = useRef();
    const [locations, setLocations] = useState([]);
    const [crowd, setCrowd] = useState([]);
    const [sarees, setSarees] = useState([])
    const [tags, setTags] = useState([]);
    const [chosenTags, setChosenTags] = useState([]);
    const types = ["Kanchipuram", "Soft Silk", "Fancy", "Georgette", "Linen",
    "Cotton", "Pattu"];

    useEffect(() => {
        axios.post('https://geethasaree.herokuapp.com/auth/getCurrentUser', { token: localStorage.getItem("token") })
            .then(user => {
                setLocations(user.data.locations);
                setCrowd(user.data.crowd);
                setTags(user.data.tags)
                setLoading(false);
            })
            .then(() => axios.post('https://geethasaree.herokuapp.com/api/sarees/getUsersSarees', { token: localStorage.getItem("token") }))
            .then(sareesList => {
                sareesList.data.data.forEach((saree) => {
                    setSarees(sarees => [...sarees, saree]);

                })
            })
            .catch(err => {
                console.log(err);
                console.log("Couldn't get user's records");
            })
    }, [])
    const handleClick = e => {
        if (document.getElementById("filterForm").contains(e.target)) {
          // inside click
          return;
        }
        // outside click
        if(e.target.getAttribute('id') === "filterSearchButton" && e.target.value === "filter"){
            document.querySelector('#collapsibleFilter').classList.toggle('show');
            e.target.classList.toggle("active")
        }
        else if (document.querySelector('#collapsibleFilter').classList.contains('show')){
            console.log(e.target);
            document.querySelector('#collapsibleFilter').classList.toggle('show');
        }
         
      };
    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);
    const addChosenFilter = (filter, field) => {
        let temp = []
        console.log(field);
        if (document.querySelectorAll(`[name=${field}]`).forEach((element) => {
            if (element.checked){
                temp.push(element.value);
            }
        }))
        console.log(temp);
        if(temp.length > 0){
            console.log(temp);
            filter[field] = temp
        }
    }

    const filter = (event) => {
        event.preventDefault();
        let filter = {};
        if(chosenTags.length>0){
            filter[tags] = chosenTags;
        }
        if (document.querySelectorAll('[name="blouse"]').forEach((element) => {
            if (element.checked){
                filter["blouseStitched"] = element.value === "true" ? true : false;
            }
        }))
        
        addChosenFilter(filter, "crowd");
        addChosenFilter(filter, "types");
        addChosenFilter(filter, "location");
        document.querySelector('#collapsibleFilter').classList.toggle('show');
        axios.post('https://geethasaree.herokuapp.com/api/sarees/filterSarees', { token: localStorage.getItem("token"), filters: filter })
        .then(sarees => {
            let filteredSarees = []
            console.log(sarees);
            sarees.data.sarees.forEach((saree) => {
                filteredSarees.push(saree.sarees)
            })
            setSarees(filteredSarees);
        })
    }
    return (
        <div className="viewPage">
            <Navbar />
            <div className="filterAndSearch">
                <button ref={node} id="filterSearchButton" value="filter">Filter</button>
                <select name="sortDropDown" id="filterSearchButton" placeholder="Sort">
                    <option id="dropDownOptions" value="defaultValue">Sort</option>
                    <option id="dropDownOptions" value="newly-added">Newly Added</option>
                    <option id="dropDownOptions" value="new-old">Purchase date ascending</option>
                    <option id="dropDownOptions" value="old-new">Purchase date descending</option>
                    <option id="dropDownOptions" value="last worn">Last worn</option>
                </select>
                
                    <form id="filterForm">
                        <div id="collapsibleFilter">
                        <div className="filterBlock">
                            <h6 className="filterTitle">Blouse stitched</h6>
                            <div className="filterRow">
                                <div className="checkBox">
                                    <input type="radio" id="stitched" name="blouse" value={true} />
                                    <label className="checkboxLabel" htmlFor="stitched"> Stitched</label><br />
                                </div>
                                <div className="checkBox">
                                    <input type="radio" id="unstitched" name="blouse" value={false} />
                                    <label className="checkboxLabel" htmlFor="unstitched"> Unstitched</label><br />
                                </div>
                            </div>
                        </div>
                        <div className="filterBlock">
                            <h6 className="filterTitle">Location</h6>
                            <div className="filterRow">
                                {locations.map((item, index) => (
                                    <div key={index} className="checkBox">
                                        <input type="checkbox" id={item} name="location" value={item} />
                                        <label className="checkboxLabel" htmlFor={item}> {item}</label><br />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="filterBlock">
                            <h6 className="filterTitle">Crowds</h6>
                            <div className="filterRow">
                                {crowd.map((item, index) => (
                                    <div key={index} className="checkBox">
                                        <input type="checkbox" id={item} name="crowd" value={item} />
                                        <label className="checkboxLabel" htmlFor={item}> {item}</label><br />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="filterBlock">
                            <h6 className="filterTitle">Types</h6>
                            <div className="filterRow">
                                {types.map((item, index) => (
                                    <div key={index} className="checkBox">
                                        <input type="checkbox" id={item} name="types" value={item} />
                                        <label className="checkboxLabel" htmlFor={item}> {item}</label><br />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="filterBlock">
                            <h6 className="filterTitle">Tags</h6>
                        </div>
                        <AutoComplete action={setChosenTags} allOptions={tags}></AutoComplete>
                        <button id="filterButton" type="submit" onClick={filter}>Filter</button>
                </div>
                </form>
            </div>
            {loading &&
                <Spinner></Spinner>}
            <div className="sareeGallery">
                {sarees.length > 0 && sarees.map((item, index) => (
                    <div key={index} className="sareeItem">
                        <img alt="saree" className="previewImage" src={item.imgs[0]}></img>
                        <div className="sareeDescription">
                            <h6>{item.blouseStitched ? 'Stitched': 'Unstitched'}</h6>
                            {
                                item.purchase.datePurchased && <h6>Purchased on {new Date(item.purchase.datePurchased).toLocaleDateString()}</h6>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default View;