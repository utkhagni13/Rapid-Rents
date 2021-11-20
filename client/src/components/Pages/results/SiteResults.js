import React from "react";
import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import "../../../styles/Results.scss";
import { AiOutlineSearch } from "react-icons/ai";

const SiteResults = ({ loggedIn }) => {
    const sitesData = useSelector((state) => state.AllSites);
    const { stateName, cityName } = useParams();
    const history = useHistory();
    const siteResults = sitesData.filter((site) => site.city === cityName);
    console.log(siteResults);

    const checkSiteDetails = (id) => {
        if (loggedIn) {
            history.push(`/site-details/${id}`);
        } else {
            Swal.fire({
                position: "top-end",
                icon: "info",
                title: "<strong>Please Login to continue</strong>",
                showConfirmButton: false,
                timer: 2000,
            });
            setTimeout(function () {
                history.push("/login");
            }, 2500);
        }
    };

    return (
        <div className="results-container">
            <div className="filters-section">
                <h3>Filters</h3>
                <div className="search-result">
                    <input type="text" placeholder="Search a site" />
                    <div>
                        <AiOutlineSearch />
                    </div>
                </div>
            </div>
            <div className="results-section">
                <h3>
                    Showing results for {cityName} ({stateName})
                </h3>
                <div className="results-list">
                    {sitesData.map((site) => (
                        <div className="results-item" key={site._id}>
                            <div className="results-item-info">
                                <div>
                                    <img src={site.imageArray[0]} alt="site-link" />
                                </div>
                                <div className="site-result-info">
                                    <div className="main-info">
                                        <p>{site.name}</p>
                                        <p>
                                            Rent: Rs. {site.rent}
                                            <span>/Month</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p>Type: {site.type}</p>
                                        <p>BHK Value: {site.bhk}</p>
                                    </div>
                                    <div>
                                        <p>Area's Location': {site.location}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="check-result-btn">
                                <button onClick={() => checkSiteDetails(site._id)}>
                                    Check it Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SiteResults;
