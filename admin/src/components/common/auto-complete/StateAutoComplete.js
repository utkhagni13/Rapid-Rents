import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const AutoComplete = ({ list, setState, state, query }) => {
    const handleOnSelect = (item) => {
        if (query === "name") setState(item.name);
        else setState(item.cityName);
    };

    const handleOnClear = () => {
        setState("");
    };

    return (
        <div>
            <ReactSearchAutocomplete
                items={list}
                fuseOptions={{ keys: [query] }}
                resultStringKeyName={query}
                onSelect={handleOnSelect}
                showIcon={false}
                onClear={handleOnClear}
                placeholder={state.length ? state : "Type something..."}
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
