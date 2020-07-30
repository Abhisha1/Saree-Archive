import React, {useEffect, useState} from 'react';
import {
    useParams
  } from "react-router-dom";
import axios from 'axios';
import Navbar from "../../components/Navbar";
import Spinner from "../../components/Spinner";
import Tag from "../../components/Tag";
import { LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import './edit.scss';
import Tagger from "../../components/Tagger";
import History from "../../components/History";
import { ReactComponent as Mandala } from '../../assets/homepage.svg';


function Edit(props){
    const params = useParams();
    const [saree, setSaree] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currImg, setCurrImg] = useState(0)
    const [showLeftBar, setShowLeftBar] = useState(false);
    const [tags, setTags] = useState(null);
    const [crowdOptions, setCrowdOptions] = useState([]);
    const [history, setHistory] = useState([]);
    const [blouse,setBlouse] = useState(null);
    const [tagOptions, setTagOptions] = useState([])
    useEffect(() => {
        axios.post('https://geethasaree.herokuapp.com/api/sarees/getSaree', { token: localStorage.getItem("token"), _id: params.id })
            .then(saree => {
                setSaree(saree.data.item[0].sarees);
                setTags(saree.data.item[0].sarees.tags)
                if(saree.data.item[0].worn){
                    setHistory(saree.data.item[0].worn)
                }
                setBlouse(saree.data.item[0].sarees.blouseStitched);
                setCrowdOptions(saree.data.item[0].crowd);
                setTagOptions(saree.data.item[0].tags);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                console.log("Couldn't get user's records");
            })
    }, []);
    useEffect(() => {
        if (!loading && crowdOptions.length > 0){
            axios.post('https://geethasaree.herokuapp.com/api/users/addCrowd', { token: localStorage.getItem("token"), crowd: crowdOptions })
            .then((crowds) => console.log(crowds))
            .catch(err => {
                console.log("Couldn't get user's records");
            })  
         }  
    }, [crowdOptions]);
    const update = () => {
        console.log(blouse);
        console.log(history);
        console.log(tags);
        let newSaree = saree;
        newSaree.blouseStitched = blouse
        newSaree.tags = tags;
        newSaree.worn = history;
    }
    useEffect(() => {
        if (!loading){
            let newTags=  [];
            tags.forEach((item) => {
                if (!tagOptions.includes(item)){
                    newTags.push(item);
                }
            })
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
    return(
        <div>
            <Navbar />
            {loading? <Spinner /> : 
            <div className="flexContentContainer">
                <div id="flexRightImage" className={showLeftBar ? "blur" : ""}>
                    <LazyLoadImage alt="saree" id="mainImage" className="previewImage" src={saree.imgs[currImg]} effect="opacity"></LazyLoadImage>
                    <div className="imagePickerBox">
                    {saree.imgs.length > 1 && saree.imgs.map((item, index) => (
                        <div key={index} customshow={index === currImg ? "hide": "show"} id="selected">
                        <Mandala id="imagePicker" key={index} onClick={() => setCurrImg(index)}/>
                        </div>
                    ))}
                    </div>
                </div>
                <div id="flexLeftText" className={showLeftBar ? "blur" : ""}>
                    <div id="productHeading">
                        {saree.blouseStitched ? "Stitched saree" : "Unstitched saree"}
                    </div>
                    {saree.purchase.datePurchased && <div>
                        <div className="thinLine" />
                        <div id="purchaseDetail">
                        {console.log(saree.purchase.datePurchased)}
                        <div id="subHeading">Purchased </div>
                        <div className="detail">
                            When: <div id="purchaseDate">{new Date(saree.purchase.datePurchased).toLocaleDateString().replace(/\//g, ".")}</div>
                        </div>
                        <div className="detail">
                            Where: <div id="purchaseWhere">{saree.purchase.wherePurchased}</div>
                        </div>
                    </div>
                    </div>}
                    <div className="thinLine" />
                    <div id="locationHeading">
                    <div id="subHeading">Location </div>
                        {saree.location}
                    </div>
                    <div className="thinLine" />
                    <div id="locationHeading">
                    <div id="subHeading">Saree type </div>
                        {saree.type}
                    </div>
                    <div className="thinLine" />
                    <div id="locationHeading">
                    <div id="subHeading">Tags</div>
                    <div className="tags" id="nonRemovalTags">
                        {saree.tags.length > 0 ?
                        saree.tags.map((item, index) => (
                            <Tag item={item} key={index}></Tag>   
                        ))
                    : <div> No tags yet</div>}
                        </div>
                    </div>
                    <div className="editWrapper">
                    <button id="editButton" onClick={() => setShowLeftBar(true)}> Edit</button>
                    </div>
                </div>
                <div className={showLeftBar ? "leftBar show" : "leftBar"}>
                    <div className="leftBarContents">
                <h2 className="addSubHeading">Stitched blouse? </h2>
                    <div className="form-group dropdown">
                        
                            {blouse ? 
                            <select className="form-control" id="exampleFormControlSelect1" field="blouseStitched" onChange={(event) => {
                                if(event.target.value === "Yes"){
                                    setBlouse(true)
                                }
                                else{setBlouse(false)}
                            }}><option> Yes </option>
                            <option> No </option>
                            </select>
                        :
                        <select className="form-control" id="exampleFormControlSelect1" field="blouseStitched" onChange={(event) => {
                            if(event.target.value === "Yes"){
                                setBlouse(true)
                            }
                            else{setBlouse(false)}
                        }}>
                        <option> No </option>
                            <option> Yes </option>
                            </select>} 
                    </div>
                    <Tagger tags={tags} action={setTags}></Tagger>
                <h2 className="addSubHeading">
                        Add an event
                    </h2>
                <History crowdOptions={crowdOptions} history={history} action={setHistory} setcrowd={setCrowdOptions}></History>
                <div className="buttonGroup">
                <button id="editButton" onClick={update}> Update</button>
                <button id="editButton" onClick={() => setShowLeftBar(false)}> Cancel</button>
                </div>
                </div>
                </div>
            </div>
            }
        </div>
    )
}
export default Edit;

