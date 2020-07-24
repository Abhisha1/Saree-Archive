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
function Edit(props){
    const params = useParams();
    const [saree, setSaree] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currImg, setCurrImg] = useState(0)

    useEffect(() => {
        axios.post('https://geethasaree.herokuapp.com/api/sarees/getSaree', { token: localStorage.getItem("token"), _id: params.id })
            .then(saree => {
                setSaree(saree.data.item.sarees[0]);
                console.log(saree.data.item.sarees[0])
                setLoading(false);
            })
            .catch((err) => {
                console.log("Couldn't get user's records");
            })
    }, []);
    return(
        <div>
            <Navbar />
            {loading? <Spinner /> : 
            <div className="flexContentContainer">
                <div id="flexRightImage">
                    <LazyLoadImage alt="saree" id="mainImage" className="previewImage" src={saree.imgs[currImg]} effect="opacity"></LazyLoadImage>
                </div>
                <div id="flexLeftText">
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
                    <button id="editButton"> Edit</button>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
export default Edit;

