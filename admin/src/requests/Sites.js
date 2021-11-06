import axios from "./Axios";

export const addNewSite = async (data) => {
    const url = "/addnewrentalsite";
    const body = {
        name: data.SiteData[0].value,
        type: data.SiteData[1].value,
        location: data.SiteData[2].value,
        rent: parseInt(data.SiteData[3].value),
        bhk: parseInt(data.SiteData[4].value),
        rooms: parseInt(data.SiteData[5].value),
        bathrooms: parseInt(data.SiteData[6].value),
        kitchen: parseInt(data.SiteData[7].value),
        measurements: [
            parseInt(data.SiteData[8].value),
            parseInt(data.SiteData[9].value),
            parseInt(data.SiteData[10].value),
        ],
        description: data.SiteBigData.Description,
        garageFacility: data.SiteBigData.GarageFacility,
        imageArray: data.SiteBigData.ImagesArray.map((image) => {
            return image.value;
        }),
        ownerData: {
            fullName: data.SiteOwnerData[0].value,
            email: data.SiteOwnerData[1].value,
            phone: data.SiteOwnerData[2].value,
        },
        city: data.CityName,
        state: data.StateName,
    };
    console.log(body);
    try {
        const res = await axios.post(url, body);
        return res.data;
    } catch (err) {
        console.log(err.response);
        return err.response
            ? err.response.data
            : { data: null, error: "Not connected to the server" };
    }
};
