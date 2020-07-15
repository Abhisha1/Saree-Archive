import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import Navbar from "../../components/Navbar";
import './view.scss';

function View(){
    const [loading, setLoading] = useState(true);
    const node = useRef();
    const [locations, setLocations] = useState([]);
    const [crowd, setCrowd] = useState([]);
    const [sarees, setSarees] = useState([])
    const [tags, setTags] = useState([]);


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
                    saree.imgs.forEach((img) => {
                        setSarees(sarees => [...sarees, img]);
                    })

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
        if(e.target.getAttribute('id') === "filterSearchButton"){
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
                <button ref={node} id="filterSearchButton">Filter</button>
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
                            <div className="filterRow">
                                {tags.map((item, index) => (
                                    <div key={index} className="checkBox">
                                        <input type="checkbox" id={item} name={item} value={item} />
                                        <label className="checkboxLabel" htmlFor={item}> {item}</label><br />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="filterButton" type="submit">Filter</button>
                </div>
                </form>
            </div>
            <div className="sareeGallery">
                {sarees.length > 0 && sarees.map((item, index) => (
                    <img className="previewImage" key={index} src={item}></img>
                ))}
            </div>
        </div>
    )
}

export default View;