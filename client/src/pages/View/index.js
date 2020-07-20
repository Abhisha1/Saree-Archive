import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import Navbar from "../../components/Navbar";
import './view.scss';
import {ReactComponent as Lotus} from "../../assets/lotus.svg";
import AutoComplete from "../../components/AutoComplete";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function View(){
    const [loading, setLoading] = useState(true);
    const node = useRef();
    const form = useRef();
    const [locations, setLocations] = useState([]);
    const [crowd, setCrowd] = useState([]);
    const [sarees, setSarees] = useState([])
    const [tags, setTags] = useState([]);
    const [chosenTags, setChosenTags] = useState([]);
    const [chosenBlouse, setChosenBlouse] = useState(null);
    const [chosenTypes, setChosenTypes] = useState([]);
    const [chosenSort, setChosenSort] = useState('');
    const [chosenCrowd, setChosenCrowd] = useState([]);
    const [chosenLocations, setChosenLocations] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [show, setShow] = useState("");
    const [active, setActive] = useState("")
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
                setFetching(false);
            })
            .catch(err => {
                console.log("Couldn't get user's records");
            })
    }, [])
    function toggle(){
        if (show === ""){
            setShow("show")
        }
        else{
            setShow("")
        }
        active === "" ? setActive("active") : setActive("")
    }
    const handleClick = e => {
        if (form.current.contains(e.target)) {
          // inside click
          return;
        }
        // outside click
        console.log("outside")
        if(e.target === node.current || show === "show"){
            toggle();
        }
         
      };
    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [show, active]);

    const filter = (event) => {
        event.preventDefault();
        let sort = ''
        let filter = {};
        setFetching(true);
        if (chosenBlouse !== null){
            filter["blouseStitched"] = chosenBlouse
        }
        if (chosenCrowd.length > 0){
            filter["crowd"] = chosenCrowd
        }
        if (chosenTypes.length > 0){
            filter["type"] = chosenTypes
        }
        if (chosenLocations.length > 0){
            filter["location"] = chosenLocations
        }
        if (chosenTags.length > 0){
            filter["tags"] = chosenTags
        }
        console.log(filter);
        if(event.target.id === "filterButton"){
            toggle();
            sort = chosenSort;
        }
        else{
            sort = event.target.value;
        }
        axios.post('https://geethasaree.herokuapp.com/api/sarees/filterSarees', { token: localStorage.getItem("token"), filters: filter, sort: sort })
        .then(sarees => {
            let filteredSarees = []
            sarees.data.sarees.forEach((saree) => {
                filteredSarees.push(saree.sarees)
            })
            setSarees(filteredSarees);
            setFetching(false);
        })
    }
    return (
        <div className="viewPage">
            <Navbar />
            <ToastContainer />
            <div className="filterAndSearch">
                <button ref={node} id="filterSearchButton" value="filter" className={active}>Filter</button>
                <select name="sortDropDown" id="filterSearchButton" placeholder="Sort" value={chosenSort} onChange={(event) => {
                    setChosenSort(event.target.value);
                    filter(event);}}>
                    <option hidden id="dropDownOptions" value="Sort">Sort</option>
                    <option id="dropDownOptions" value="newly-added">Newly Added</option>
                    <option id="dropDownOptions" value="new-old">Purchase date ascending</option>
                    <option id="dropDownOptions" value="old-new">Purchase date descending</option>
                </select>
                <div className="formPosition">
                    <form ref={form} id="filterForm">
                        <div id="collapsibleFilter" className={show}>
                        <div className="filterBlock">
                            <h6 className="filterTitle">Blouse stitched</h6>
                            <div className="filterRow">
                                <div className="checkBox">
                                <div className="pretty p-default p-round p-smooth">
                                    <input type="radio" id="stitched" name="blouse" value={true} />
                                    <div className="state">
                                    <label onClick={() => {
                                        if(chosenBlouse === true){
                                            setChosenBlouse(null)
                                        }else{
                                        setChosenBlouse(true);}
                                        }} className="checkboxLabel" htmlFor="stitched"> Stitched</label>
                                        </div>
                                        </div>
                                </div>
                                <div className="checkBox">
                                <div className="pretty p-default p-round p-smooth">
                                    <input type="radio" id="unstitched" name="blouse" value={false} />
                                    <div className="state">
                                    <label onClick={() => {
                                        if(chosenBlouse === false){
                                            setChosenBlouse(null)
                                        }else{
                                            console.log("false")
                                        setChosenBlouse(false);}}} className="checkboxLabel" htmlFor="unstitched"> Unstitched</label>
                                        </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="filterBlock">
                            <h6 className="filterTitle">Location</h6>
                            <div className="filterRow">
                                {locations.map((item, index) => (
                                    <div key={index} className="checkBox">
                                        <div className="pretty p-default p-curve p-smooth">
                                        <input type="checkbox" id={item} name="location" value={item} />
                                            <div className="state">
                                            <label onClick={() => {
                                        if(chosenLocations.length > 0 && chosenLocations.includes(item)){
                                            let newLocs = chosenLocations;
                                            let index = chosenLocations.indexOf(item)
                                            if (index!== -1){
                                                newLocs.splice(index,1)
                                                setChosenLocations(newLocs);
                                            }
                                        }else{
                                        setChosenLocations(chosenLocations => [...chosenLocations,item]);}}} className="checkboxLabel" htmlFor={item}> {item}</label>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="filterBlock">
                            <h6 className="filterTitle">Crowds</h6>
                            <div className="filterRow">
                                {crowd.map((item, index) => (
                                    <div key={index} className="checkBox">
                                        <div className="pretty p-default p-curve p-smooth">
                                        <input type="checkbox" id={item} name="crowd" value={item} />
                                        <div className="state">
                                        <label className="checkboxLabel" htmlFor={item} onClick={() => {
                                        if(chosenCrowd.length > 0 && chosenCrowd.includes(item)){
                                            let newLocs = chosenCrowd;
                                            let index = chosenCrowd.indexOf(item)
                                            if (index!== -1){
                                                newLocs.splice(index,1)
                                                setChosenCrowd(newLocs);
                                            }
                                        }else{
                                        setChosenCrowd(chosenCrowd => [...chosenCrowd,item]);}}}> {item}</label><br />
                                    </div>
                                    </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="filterBlock">
                            <h6 className="filterTitle">Types</h6>
                            <div className="filterRow">
                                {types.map((item, index) => (
                                    <div key={index} className="checkBox">
                                        <div className="pretty p-default p-curve p-smooth">
                                        <input type="checkbox" id={item} name="types" value={item} />
                                        <div className="state">
                                        <label  onClick={() => {
                                        if(chosenTypes.length > 0 && chosenTypes.includes(item)){
                                            let newLocs = chosenTypes;
                                            let index = chosenTypes.indexOf(item)
                                            if (index!== -1){
                                                newLocs.splice(index,1)
                                                setChosenTypes(newLocs);
                                            }
                                        }else{
                                        setChosenTypes(chosenTypes => [...chosenTypes,item]);}}} className="checkboxLabel" htmlFor={item}> {item}</label><br />
                                    </div>
                                    </div>
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
            </div>
            {fetching && <div className="lotusWrapper"><Lotus></Lotus></div>}
            {loading ?
                <div className="lotusWrapper"><Lotus></Lotus></div>:
            <div className={fetching ? "sareeGallery loading": "sareeGallery"}>
                {sarees.length > 0 && sarees.map((item, index) => (
                    <div key={index} className="sareeItem">
                        <img alt="saree" className="previewImage" src={item.imgs[0]}></img>
                        <div className="sareeDescription">
                            <h6>{item.blouseStitched ? 'Stitched': 'Unstitched'}</h6>
                            {
                                item.purchase.datePurchased && <h6>Purchased on {new Date(item.purchase.datePurchased).toLocaleDateString()}</h6>
                            }
                        </div>
                        <button className="viewItem">View this saree</button>
                    </div>
                ))
            }
            {sarees.length === 0 && !fetching &&
            <h6>Sorry, you don't have any sarees matching these filters</h6>}
            </div>
        }
        </div>
    )
}

export default View;