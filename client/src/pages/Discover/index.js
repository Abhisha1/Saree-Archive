import React, {useEffect, useState} from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import "./discover.scss";
import Spinner from "../../components/Spinner";
export default function Discover(){
    const [sarees, setSarees] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://geethasaree.herokuapp.com/api/users/getAllUsers')
        .then(users => {
            let newSarees = [];
            users.data.map((user) => {
                if (user.sarees.length > 0){
                    user.sarees.map((item) => {
                        newSarees.push(item)
                    })
                }
            })
            setSarees(newSarees);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            console.log("Couldn't get user's records");
        })
    }, [])

    return(
        <div id="discoverPage">
        <Navbar />
        <div id="discoverContent">
        <div className="viewDescBox">
            </div>
            <h1 id="discoverHeading">Discover</h1>
            <p id="discoverDescription">View an assortment of the best sarees added to our site</p>
            <div className="viewDescBox">
            </div>
        {loading ? <Spinner /> :
        (sarees && sarees.map((item, index) => (
            <LazyLoadImage key={index} alt="saree" className="previewImage" src={item.imgs[0]} effect="opacity"></LazyLoadImage>
        )))}</div>
        </div>
    )
}