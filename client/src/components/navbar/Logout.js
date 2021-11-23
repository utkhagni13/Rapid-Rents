import React from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { logout } from "../../requests/Authentication";

const Logout = ({ setLoggedIn }) => {
    const history = useHistory();
    const handleLogout = async () => {
        const res = await logout();
        if (res.data && res.error === null) {
            setLoggedIn(false);
            window.location.reload(true);
            history.push("/");
        } else {
            Swal.fire({
                title: `<strong>Some error occured</strong>`,
                text: `${res.error}`,
                icon: "error",
                position: "top-end",
            });
        }
    };

    return (
        <div className="logout-btn common_btn">
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
