import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { addNewSite } from "../../../../requests/Sites";

const siteLables = [
    {
        label: "Name",
        value: "",
        type: "text",
        required: true,
    },
    {
        label: "Type",
        value: "",
        type: "text",
        required: true,
    },
    {
        label: "Location",
        value: "",
        type: "text",
        required: true,
    },
    {
        label: "Rent/month",
        value: "",
        type: "number",
        required: true,
    },
    {
        label: "BHK Number",
        value: "",
        type: "number",
        required: false,
    },
    {
        label: "Number of Rooms",
        value: "",
        type: "number",
        required: true,
    },
    {
        label: "Number of Bathrooms",
        value: "",
        type: "number",
        required: true,
    },
    {
        label: "Number of Kitchen",
        value: "",
        type: "number",
        required: true,
    },
    {
        label: "Net Area(in sq. feet)",
        value: "",
        type: "number",
        required: true,
    },
    {
        label: "Length(in feet)",
        value: "",
        type: "number",
        required: true,
    },
    {
        label: "Width(in feet)",
        value: "",
        type: "number",
        required: true,
    },
];

const ownerDataLabels = [
    {
        label: "Full Name",
        value: "",
        type: "text",
        required: true,
    },
    {
        label: "Email",
        value: "",
        type: "email",
        required: true,
    },
    {
        label: "Phone",
        value: "",
        type: "number",
        required: true,
    },
];

const imageLabels = [
    {
        label: "Image Link 1",
        value: "",
        type: "text",
        required: true,
    },
    {
        label: "Image Link 2",
        value: "",
        type: "text",
        required: false,
    },
    {
        label: "Image Link 3",
        value: "",
        type: "text",
        required: false,
    },
    {
        label: "Image Link 4",
        value: "",
        type: "text",
        required: false,
    },
    {
        label: "Image Link 5",
        value: "",
        type: "text",
        required: false,
    },
];

const model = (props) => {
    Swal.fire({
        title: `<strong>${props.title}</strong>`,
        text: props.text,
        icon: props.icon,
        position: "top-end",
    });
};

const Siteform = ({ cityName, stateName, setShowForm }) => {
    // data states
    const [siteData, setSiteData] = useState(siteLables);
    const [siteBigData, setSiteBigData] = useState({
        ImagesArray: imageLabels,
        Description: "",
        GarageFacility: false,
    });
    const [siteOwnerData, setSiteOwnerData] = useState(ownerDataLabels);
    const [characterCount, setCharacterCount] = useState(0);
    const [clickSubmit, setClickSubmit] = useState(false);
    const maxCharacterCount = 300;

    const handleDescription = (text) => {
        if (text.length <= maxCharacterCount) {
            setSiteBigData({
                ...siteBigData,
                Description: text,
            });
            setCharacterCount(text.length);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setClickSubmit(true);
        console.log(siteBigData);
        console.log(siteOwnerData);
        console.log(siteData);

        // validation checks
        for (let i = 0; i < siteData.length; i++) {
            if (siteData[i].value === "") {
                model({
                    title: "Details Missing",
                    text: "Please fill the site details",
                    icon: "info",
                });
                return;
            }
        }
        for (let i = 0; i < siteOwnerData.length; i++) {
            if (siteOwnerData[i].value === "") {
                model({
                    title: "Details Missing",
                    text: "Please fill the owner's details",
                    icon: "info",
                });
                return;
            }
        }
        if (siteBigData.Description === "") {
            model({
                title: "Details Missing",
                text: "Please add a description for the site",
                icon: "info",
            });
            return;
        }
        if (siteBigData.ImagesArray[0].value === "") {
            model({
                title: "Details Missing",
                text: "Please add atleast one link for the image of site",
                icon: "info",
            });
            return;
        }

        // if all the validation checks are passed
        const data = {
            SiteData: siteData,
            SiteBigData: siteBigData,
            SiteOwnerData: siteOwnerData,
            CityName: cityName,
            StateName: stateName,
        };
        const addNewRentalSite = async () => {
            const res = await addNewSite(data);
            console.log(res);
            if (res.error === null && res.data === "Success") {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "<strong>New City Added</strong>",
                    showConfirmButton: false,
                    timer: 2000,
                });
                setTimeout(function () {
                    window.location.reload(true);
                }, 2500);
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `${res.error}`,
                    showConfirmButton: true,
                });
            }
        };
        addNewRentalSite();
    };

    return (
        <div className="in-middle form-container">
            <div style={{ flexDirection: "column-reverse" }} className="admin-forms">
                <div className="add-form">
                    <h2>Fill the details</h2>
                    <hr />
                    <div className="form-group">
                        <p>City Details</p>
                        <div className="big-form">
                            <div className="form-group">
                                <p>City Selected</p>
                                <TextField
                                    className="mu-input"
                                    variant="outlined"
                                    disabled
                                    value={cityName}
                                />
                            </div>
                            <div className="form-group">
                                <p>State Selected</p>
                                <TextField
                                    className="mu-input"
                                    variant="outlined"
                                    disabled
                                    value={stateName}
                                />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <p>Site Details</p>
                            <div className="big-form">
                                {siteData.map((site, index) => {
                                    return (
                                        <div key={index} className="form-group">
                                            <p>{site.label}</p>
                                            <TextField
                                                className="mu-input"
                                                label={site.label}
                                                variant="outlined"
                                                required={site.required}
                                                type={site.type}
                                                InputProps={{ inputProps: { min: 0 } }}
                                                error={
                                                    site.required &&
                                                    !site.value.length &&
                                                    clickSubmit
                                                }
                                                onChange={(e) => {
                                                    siteData[index].value = e.target.value;
                                                    setSiteData([...siteData]);
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                                <div className="form-group">
                                    <p>
                                        <label htmlFor="garageFac">Garage Facility</label>
                                        <input
                                            type="checkbox"
                                            id="garageFac"
                                            onChange={(e) => {
                                                setSiteBigData({
                                                    ...siteBigData,
                                                    GarageFacility: e.target.checked,
                                                });
                                            }}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="form-group">
                            <div className="oneline-text">
                                <p>Write a Description</p>
                                <p
                                    style={{
                                        color: characterCount < maxCharacterCount ? "green" : "red",
                                    }}
                                >
                                    Characters: {characterCount}/{maxCharacterCount}
                                </p>
                            </div>
                            <TextField
                                className="mu-input"
                                label="Description"
                                variant="outlined"
                                value={siteBigData.Description}
                                required={true}
                                type="text"
                                multiline
                                rows={4}
                                error={true && !siteBigData.Description.length && clickSubmit}
                                onChange={(e) => {
                                    handleDescription(e.target.value);
                                }}
                            />
                        </div>
                        <hr />
                        <div className="form-group">
                            <p>Add Owner's Data</p>
                            <div
                                className="oneline-text"
                                style={{ gap: "var(--smallestFontSize)" }}
                            >
                                {siteOwnerData.map((owner, index) => {
                                    return (
                                        <div key={index} className="form-group">
                                            <p>{owner.label}</p>
                                            <TextField
                                                className="mu-input"
                                                label={owner.label}
                                                variant="outlined"
                                                required={owner.required}
                                                type={owner.type}
                                                error={
                                                    owner.required &&
                                                    !owner.value.length &&
                                                    clickSubmit
                                                }
                                                onChange={(e) => {
                                                    siteOwnerData[index].value = e.target.value;
                                                    setSiteOwnerData([...siteOwnerData]);
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <hr />
                        <div className="form-group">
                            <p>Add Images</p>
                            <div className="big-form">
                                {siteBigData.ImagesArray.map((image, index) => {
                                    return (
                                        <div key={index} className="form-group">
                                            <p>{image.label}</p>
                                            <TextField
                                                className="mu-input"
                                                label={image.label}
                                                variant="outlined"
                                                required={image.required}
                                                type={image.type}
                                                error={
                                                    image.required &&
                                                    !image.value.length &&
                                                    clickSubmit
                                                }
                                                onChange={(e) => {
                                                    siteBigData.ImagesArray[index].value =
                                                        e.target.value;
                                                    setSiteBigData({
                                                        ...siteBigData,
                                                        ImagesArray: [...siteBigData.ImagesArray],
                                                    });
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setShowForm(false);
                            }}
                            type="reset"
                            style={{ backgroundColor: "var(--buttonColor)" }}
                        >
                            EDIT CITY DETAILS
                        </button>
                        <button onClick={handleSubmit} type="submit">
                            SUBMIT
                        </button>
                    </form>
                </div>
                <div
                    style={{ borderBottom: "1px solid var(--borderColor)" }}
                    className="instructions"
                >
                    <h3>Please Note...</h3>
                    <p>
                        -{">"} First select a state from the list in the dropdown menu. This will
                        denote the state where the city of the rental site is situated.
                    </p>
                    <p>
                        -{">"} After selecting the state, select a city from the list in the
                        dropdown menu. This will denote the city where the rental site is situated.
                    </p>
                    <p>-{">"} Click "Next" button to add the details of the rental site.</p>
                </div>
            </div>
        </div>
    );
};

export default Siteform;
