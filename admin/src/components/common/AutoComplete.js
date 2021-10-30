import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { states } from "../../data/Data";

const AutoComplete = ({ setState, state }) => {
    const handleOnSelect = (item) => {
        console.log(item);
        setState(item.name);
    };

    return (
        <div>
            <ReactSearchAutocomplete
                items={states}
                fuseOptions={{ keys: ["name"] }} // Search on both fields
                resultStringKeyName="name" // String to display in the results
                onSelect={handleOnSelect}
                showIcon={false}
                placeholder={state.length ? state : "Type the name of a state"}
                styling={{
                    height: "56px",
                    border: "1px solid gray",
                    borderRadius: "4px",
                    backgroundColor: "white",
                    boxShadow: "none",
                    hoverBackgroundColor: "var(--themeColor)",
                    color: "var(--textColor)",
                    fontSize: "var(--smallestFontSize)",
                    fontFamily: "var(--bodyFont)",
                    iconColor: "var(--textColor)",
                    lineColor: "var(--buttonColor)",
                    placeholderColor: "gray",
                    clearIconMargin: "3px 8px 0 0",
                    zIndex: 5,
                }}
            />
        </div>
    );
};

export default AutoComplete;
