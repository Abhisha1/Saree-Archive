import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import Navbar from "../../components/Navbar";
import './view.scss';
import {ReactComponent as Lotus} from "../../assets/lotus.svg";
import AutoComplete from "../../components/AutoComplete";
import {ToastContainer} from 'react-toastify';
import {IoMdArrowRoundUp} from 'react-icons/io';
import 'react-toastify/dist/ReactToastify.min.css';
import { LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { useHistory} from 'react-router-dom';

function View(){
    const [loading, setLoading] = useState(true);
    const node = useRef();
    const form = useRef();
    const page = useRef();
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
    const [gotAll, setGotAll] = useState(false);
    const [active, setActive] = useState("");
    const [showUp, setShowUp] = useState(false);
    const history = useHistory();
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
            .then(() => axios.post('https://geethasaree.herokuapp.com/api/sarees/getUsersSarees', { token: localStorage.getItem("token"), skip: 0 }))
            .then(sareesList => {
                sareesList.data.data.forEach((saree) => {
                    setSarees(sarees => [...sarees, saree.sarees]);
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
    const getFilter = () => {
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
        return filter
    }
    const filter = (event) => {
        event.preventDefault();
        if(gotAll){
            setGotAll(false);
        }
        let sort = ''
        let filter = getFilter();
        if(event.target.id === "filterButton"){
            toggle();
            sort = chosenSort;
        }
        else{
            sort = event.target.value;
        }
        axios.post('https://geethasaree.herokuapp.com/api/sarees/filterSarees', { token: localStorage.getItem("token"), filters: filter, sort: sort, skip: 0  })
        .then(sarees => {
            let filteredSarees = []
            sarees.data.sarees.forEach((saree) => {
                filteredSarees.push(saree.sarees)
            })
            setSarees(filteredSarees);
            setFetching(false);
        })
    }
    const fetchMore = () => {
        if(!loading && !gotAll){
            let filter = getFilter();
            setFetching(true);
            axios.post('https://geethasaree.herokuapp.com/api/sarees/filterSarees', { token: localStorage.getItem("token"), filters: filter, sort: chosenSort, skip: sarees.length  })
        .then(newSarees => {
            let filteredSarees = Array.from(sarees);
            if (newSarees.data.sarees.length > 0){
                newSarees.data.sarees.forEach((saree) => {
                    filteredSarees.push(saree.sarees)
                })
                setSarees(filteredSarees);
            }
            else{
                setGotAll(true);
            }
            setFetching(false);
        })
        .catch((err) => console.log(err));
        }
    }
    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight} = e.target
        if (Math.round(scrollTop) + offsetHeight >= scrollHeight && sarees.length > 0) {
          fetchMore()
        }
        if(!showUp && scrollTop >= offsetHeight){
            setShowUp(true);
        }
        if (showUp && scrollTop < offsetHeight){
            setShowUp(false);
        }
      }
    return (
        <div className="viewPage" ref={page} onScroll={handleScroll}>
            <Navbar />
            <ToastContainer />
            
                <h1 id="viewHeading">View</h1>
                <div className="viewDescBox">
                <p id="viewDesc" >View all of your sarees, and use our sort and filter to help find the details about your sarees.</p>
            </div>
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
                            <LazyLoadImage alt="saree" className="previewImage" src={item.imgs[0]} effect="opacity" onClick={() => history.push(`/edit/${item._id}`)}></LazyLoadImage>
                            <div className="sareeDescription">
                                <h6>{item.blouseStitched ? 'Stitched': 'Unstitched'}</h6>
                                {
                                    item.purchase.datePurchased && <h6 id="purchase">Purchased on {new Date(item.purchase.datePurchased).toLocaleDateString()}</h6>
                                }
                                <button className="viewItem" onClick={() => history.push(`/edit/${item._id}`)}>View this saree</button>
                            </div>
                        </div>
                    ))
                }
            {sarees.length === 0 && !fetching &&
            <h6>Sorry, you don't have any sarees matching these filters</h6>}
            </div>
        }
        {gotAll && <div className="embellishedBox"><p id="viewDesc">No more sarees to show.</p></div>}
        {showUp && <div id="scrollUpBox">
            <IoMdArrowRoundUp onClick={() => {
                document.getElementsByClassName("viewPage")[0].scrollTo({behaviour: "smooth", top: page.current.offsetTop});}} id="scrollButton" size="4em"/>
        </div>}
        </div>
    )
}

export default View;