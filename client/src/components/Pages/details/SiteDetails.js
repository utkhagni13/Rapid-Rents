import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../../styles/SiteDetails.scss";
import { MdDescription, MdOutlineKitchen } from "react-icons/md";
import { RiRuler2Line } from "react-icons/ri";
import { GrUserManager } from "react-icons/gr";

const getImageArray = (imgArray) => {
    const images = [];
    for (let i = 0; i < imgArray.length; i++) {
        if (imgArray[i].length === 0) {
            break;
        }
        images.push(imgArray[i]);
    }
    return images;
};

const SiteDetails = () => {
    const { siteid } = useParams();
    const allSitesData = useSelector((state) => state.AllSites);
    const siteData = allSitesData.find((site) => site._id === siteid);
    console.log(siteData);

    return (
        <>
            {siteData === undefined ? (
                <></>
            ) : (
                <div className="site-container">
                    <div className="image-details">
                        <Carousel
                            autoPlay={true}
                            stopOnHover={true}
                            infiniteLoop={true}
                            showThumbs={false}
                        >
                            {getImageArray(siteData.imageArray).map((link, id) => (
                                <div key={id}>
                                    <img className="site-image" src={link} alt="site-img" />
                                </div>
                            ))}
                        </Carousel>
                        <div className="rent-details">
                            <p>
                                Rent: Rs. {siteData.rent}
                                <span>/Month</span>
                            </p>
                        </div>
                        <div className="btn-details">
                            <button className="btn-details-book">Book Now</button>
                            <button className="btn-details-wishlist">Add to Wishlist</button>
                        </div>
                    </div>
                    <div className="site-details">
                        <h3>SITE DETAILS</h3>
                        <div className="details-list">
                            <div className="site-details-name">
                                {siteData.name} ({siteData.type})
                            </div>
                            <div className="site-details-info">
                                <b>Type:</b> {siteData.type}
                                <br />
                                <b>Located in:</b> {siteData.location}
                                <br />
                                <b>City:</b> {siteData.city}
                                <br />
                                <b>State:</b> {siteData.state}
                            </div>
                            <div className="site-heading">
                                <div className="site-heading-icon">
                                    <RiRuler2Line />
                                </div>
                                <div className="site-heading-name">Measurements</div>
                            </div>
                            <div>
                                <b>Area:</b> {siteData.measurements[0]} sq. ft.
                                <br />
                                <b>Site's Dimensions(in fts):</b> {siteData.measurements[1]}
                                {" x "}
                                {siteData.measurements[2]}
                            </div>
                            <div className="site-heading">
                                <div className="site-heading-icon">
                                    <MdOutlineKitchen />
                                </div>
                                <div className="site-heading-name">Amenities</div>
                            </div>
                            <div className="site-features">
                                <p>
                                    <b>BHK Value:</b> {siteData.bhk}
                                </p>
                                <p>
                                    <b>Rooms:</b> {siteData.rooms}
                                </p>
                                <p>
                                    <b>Kitchens:</b> {siteData.kitchen}
                                </p>
                                <p>
                                    <b>Bathrooms:</b> {siteData.bathrooms}
                                </p>
                                <p>
                                    <b>Garage-Facility:</b> {siteData.garageFacility ? "Yes" : "No"}
                                </p>
                            </div>
                            <div className="site-heading">
                                <div className="site-heading-icon">
                                    <MdDescription />
                                </div>
                                <div className="site-heading-name">Description</div>
                            </div>
                            <div className="site-details-info">
                                <b>About the site:</b>
                                <br />
                                {siteData.description}
                            </div>
                            <div className="site-heading">
                                <div className="site-heading-icon">
                                    <GrUserManager />
                                </div>
                                <div className="site-heading-name">Owner's Info</div>
                            </div>
                            <div className="owner-data">
                                <b>Owner's Name:</b> {siteData.ownerData.fullName}
                                <br />
                                <b>Contact Number:</b> +91-{siteData.ownerData.phone}
                                <br />
                                <b>Email:</b> {siteData.ownerData.email}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SiteDetails;
