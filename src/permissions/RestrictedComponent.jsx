const RestrictedComponent = ({ roles, children, message = null }) => {
    const accessRole = sessionStorage.getItem("access_role");
    if (!accessRole || !roles.includes(accessRole)) {
        return message ? <>{message}</> : null;
    }

    return <>{children}</>;
};

export default RestrictedComponent;
