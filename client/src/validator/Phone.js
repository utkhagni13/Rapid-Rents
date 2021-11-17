export const validateMobileNumber = (phone) => {
    let re = /^\d{10}$/;
    return re.test(phone);
};
