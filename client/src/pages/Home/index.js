import React, { Component } from 'react';
import "./home.scss";
import {ReactComponent as Mandala} from '../../assets/homepage.svg';
import {ReactComponent as Elephant} from '../../assets/elephant.svg';
import Navbar from "../../components/Navbar"

export default class Home extends Component {

    render() {
        return (
            <div className="homeContainer">
                <Navbar></Navbar>
                <div id="header-home">
                    <div className="headings">
                        <h1 id="firstHeading" >Welcome</h1>
                        <p id="intromessage1">
                            This product aims to simplify the tracking of sarees. Through providing a simple inventory with customisable tags, you can easily track what sarees your wearing the most and what sarees you have forgotten. To get started, get some photos of your sarees and upload them below.
                    </p>
                    </div>
                    <div className="image">
                        <Elephant></Elephant>
                    </div>
                </div>
                <div className="cards">
                    <div className="card1">
                         <Mandala></Mandala>
                        <p type="button" className="home-button" onClick={() => this.props.history.push("/add")}>Add</p>
                    </div>
                    <div className="card1">
                        <Mandala />
                        <p type="button" className="home-button" onClick={() => this.props.history.push("/view")}>View</p>
                    </div>
                    <div className="card1">
                         <Mandala />
                         <p type="button" className="home-button" onClick={() => this.props.history.push("/discover")}>Discover</p>
                    </div>
                </div>
            </div>

        );
    }
}



