import React from "react";
import Swal from "sweetalert2";
import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../../styles/SiteDetails.scss";
import { MdDescription, MdOutlineKitchen } from "react-icons/md";
import { RiRuler2Line } from "react-icons/ri";
import { GrUserManager } from "react-icons/gr";

import { getPaymentOrder, addBooking } from "../../../requests/Booking";

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

const SiteDetails = ({ loggedIn }) => {
    const { siteid } = useParams();
    const history = useHistory();
    const allSitesData = useSelector((state) => state.AllSites);
    const userData = useSelector((state) => state.Userinfo);
    const siteData = allSitesData.find((site) => site._id === siteid);

    const handleBooking = async (transactionId, paymentId) => {
        console.log("handleBooking: ", transactionId, paymentId);
        const paymentDetails = { transactionId: transactionId, paymentId: paymentId };
        const date = new Date();
        console.log("date: ", date);
        const bookingDetails = {
            siteID: siteid,
            bookingDate: date,
            amount: 500,
            paymentDetails: paymentDetails,
        };
        const res = await addBooking(bookingDetails);
        if (res.data && res.error === null) {
            Swal.fire({
                title: "Booking Successful",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
            });
            setTimeout(function () {
                history.push("/bookings");
            }, 2500);
        } else {
            Swal.fire({
                title: `${res.error}`,
                text: "Please contact the customer service",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    };

    // razorpay promise
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const proceedPayment = async () => {
        const load = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!load) {
            Swal.fire({
                icon: "error",
                title: "Some error occured",
                text: "Payment Option failed to load. Please check you internet connection",
            });
            return;
        }
        const res = await getPaymentOrder(500);
        if (res.data === null || res.error !== null) {
            Swal.fire({
                icon: "error",
                title: "Some error occured",
                text: `${res.error}`,
            });
            return;
        }
        console.log(res);
        const options = {
            key: "rzp_test_afIzm8MsEeKmfQ",
            currency: res.data.currency,
            amount: res.data.amount,
            transaction_id: res.data.id,
            name: "Rapid-Rents",
            description: "Please verify your phone number and email",
            handler: async function (response) {
                console.log(response);
                if (response.razorpay_payment_id) {
                    await handleBooking(res.data.id, response.razorpay_payment_id);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Some error occured",
                        text: "Please contact the customer service",
                    });
                }
            },
            prefill: {
                email: userData.email,
                contact: userData.mobile,
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const bookSite = async () => {
        if (!loggedIn) {
            Swal.fire({
                title: "User not logged in",
                text: "Please login to continue",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "var(--buttonColor2)",
                cancelButtonColor: "var(--buttonColor3)",
                confirmButtonText: "Login",
            }).then((result) => {
                if (result.isConfirmed) {
                    history.push("/login");
                }
            });
            return;
        }
        Swal.fire({
            title: "<strong>Select the date of joining</strong>",
            icon: "info",
            html:
                `<form>` +
                '<input type="date" name="date">' +
                "<button>Submit</button>" +
                "</form>",
            showCancelButton: true,
            confirmButtonColor: "var(--buttonColor2)",
            cancelButtonColor: "var(--buttonColor3)",
            confirmButtonText: "NEXT",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Booking Charges - Rs. 500",
                    text: "This booking charge will be refunded to your account after you pay your first settlement to the owner.",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonColor: "rgb(0, 94, 8)",
                    cancelButtonColor: "var(--buttonColor3)",
                    confirmButtonText: "Proceed to Payment",
                }).then((result) => {
                    if (result.isConfirmed) {
                        proceedPayment();
                    }
                });
            }
        });
    };

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
                            <button className="btn-details-book" onClick={() => bookSite()}>
                                Book Now
                            </button>
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
