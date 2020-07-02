import React, { Component } from 'react';
import "./home.scss";
import kolam from '../../assets/kolam.jpg';
import Navbar from "../../components/Navbar"

export default class Home extends Component {

    render() {
        return (
            <div className="homeContainer">
                <Navbar></Navbar>
                <div id="header-home">
                <div className="headings">
                    <h1 id="firstHeading" >Welcome </h1>
                    <p id="intromessage1">
                        This product aims to simplify the tracking of sarees. Through providing a simple inventory with customisable tags, you can easily track what sarees your wearing the most and what sarees you have forgotten. To get started, get some photos of your sarees and upload them below.
                    </p>
                </div>
                <div className="image">
                    <img src={kolam} alt="Kolam" />
                   </div> 
                </div>
                <div className="cards">
                    <div className="card1">
                        <div className="card-body">
                            Upload a new saree so that you can keep track of when and wear you wear this. 
                        </div>
                        <button type="button" className="btn btn-outline-primary home-button">Add new saree</button>
                    </div>
                    <div className="card1">
                        <div className="card-body">
                            View your saree collection and find a saree that suits your needs.
                        </div>
                        <button type="button" className="btn btn-outline-primary home-button">View my sarees</button>
                    </div>
                    <div className="card1">
                        <div className="card-body">
                            View the online trade platform to exchange or buy a saree.
                        </div>
                        <button type="button" className="btn btn-outline-primary home-button">Discover</button>
                    </div>
                </div>
            </div>

        );
    }
}



