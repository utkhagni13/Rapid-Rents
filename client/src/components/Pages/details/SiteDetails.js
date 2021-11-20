import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../../styles/SiteDetails.scss";

const getImageArray = (imgArray) => {
    const images = [];
    for (let i = 0; i < 5; i++) {
        if (imgArray[i].length === 0) {
            break;
        }
        images.push(imgArray[i]);
    }
    return images;
};

const SiteDetails = ({ loggedIn }) => {
    const { siteid } = useParams();
    const sitesData = useSelector((state) => state.AllSites);
    const site = sitesData.find((site) => site._id === siteid);
    return (
        <>
            {!loggedIn ? (
                <></>
            ) : (
                <div className="site-container">
                    <div className="main-details">
                        <Carousel>
                            {getImageArray(site.imageArray).map((link) => (
                                <div>
                                    <img style={{ width: "100%" }} src={link} alt="site-img" />
                                    <p className="legend">Legend 1</p>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <div className="site-details">
                        <h3>Site-Details</h3>
                    </div>
                </div>
            )}
        </>
    );
};

export default SiteDetails;
