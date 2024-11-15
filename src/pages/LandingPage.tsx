const LandingPage = () => {
    const role = localStorage.getItem("role");
    return role === "admin" ? "/admin" : "/user";
};

export default LandingPage;
