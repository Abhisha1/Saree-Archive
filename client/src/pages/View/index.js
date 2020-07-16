import React, {ReactComponent, useState, useRef, useEffect} from 'react';
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
        console.log(e.target)
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
                                    <input type="checkbox" id="stitched" name="stitched" value="Bike" />
                                    <label className="checkboxLabel" htmlFor="stitched"> Stitched</label><br />
                                </div>
                                <div className="checkBox">
                                    <input type="checkbox" id="unstitched" name="unstitched" value="Car" />
                                    <label className="checkboxLabel" htmlFor="unstitched"> Unstitched</label><br />
                                </div>
                            </div>
                        </div>
                        <div className="filterBlock">
                            <h6 className="filterTitle">Location</h6>
                            <div className="filterRow">
                                {locations.map((item, index) => (
                                    <div key={index} className="checkBox">
                                        <input type="checkbox" id={item} name={item} value={item} />
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
                                        <input type="checkbox" id={item} name={item} value={item} />
                                        <label className="checkboxLabel" htmlFor={item}> {item}</label><br />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="filterBlock">
                            <h6 className="filterTitle">Tags</h6>
                        </div>
                        <AutoComplete action={setChosenTags} allOptions={tags}></AutoComplete>
                        <button id="filterButton" type="submit">Filter</button>
                </div>
                </form>
            </div>
            {loading &&
                <Spinner></Spinner>}
            <div className="sareeGallery">
                {sarees.length > 0 && sarees.map((item, index) => (
                    <div key={index} className="sareeItem">
                        {item.imgs.map((image,imgIndex) => (
                            <img className="previewImage" key={imgIndex} src={image}></img>
                        ))
                        }
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