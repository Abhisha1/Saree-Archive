import React, {useEffect} from 'react';
import {
    useParams
  } from "react-router-dom";
import axios from 'axios';
import Navbar from "../../components/Navbar";
function Edit(props){
    const params = useParams();

    useEffect(() => {
        // axios.post
    })
    return(
        <div>
            <Navbar />
            {console.log(params)}
            {console.log(props)}
        </div>
    )
}
export default Edit;

