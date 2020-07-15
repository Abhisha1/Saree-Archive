import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from "../../components/Navbar";
import './view.scss';

function View(){
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState([]);
    const [crowd, setCrowd] = useState([]);
    const [tags, setTags] = useState([]);


    useEffect(() => {
        axios.post('https://geethasaree.herokuapp.com/auth/getCurrentUser', { token: localStorage.getItem("token") })
            .then(user => {
                setLocations(user.data.locations);
                setCrowd(user.data.crowd);
                setTags(user.data.tags)
                setLoading(false);
            })
            .catch(err => {
                console.log("Couldn't get user's records");
            })
    }, [])

    return (
        <div className="viewPage">
            <Navbar />
            <div className="filterAndSearch">
                <button id="filterSearchButton">Filter</button>
                <select name="sortDropDown" id="filterSearchButton" placeholder="Sort">
                    <option id="dropDownOptions" value="defaultValue">Sort</option>
                    <option id="dropDownOptions" value="newly-added">Newly Added</option>
                    <option id="dropDownOptions" value="new-old">Purchase date ascending</option>
                    <option id="dropDownOptions" value="old-new">Purchase date descending</option>
                    <option id="dropDownOptions" value="last worn">Last worn</option>
                </select>
                <div className="collapsibleFilter">
                    <form>
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
                            <div className="filterRow">
                                {tags.map((item, index) => (
                                    <div key={index} className="checkBox">
                                        <input type="checkbox" id={item} name={item} value={item} />
                                        <label className="checkboxLabel" htmlFor={item}> {item}</label><br />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default View;