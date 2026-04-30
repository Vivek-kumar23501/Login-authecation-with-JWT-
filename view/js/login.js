window.onload = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
        const res = await axios.get("http://localhost:8080/verify", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.data.valid) {
            window.location.href = "dashboard.html";
        }

    } catch (err) {
        localStorage.removeItem("token");
    }
};


const login = async (e) => {
    try {
        e.preventDefault();

        const form = e.target;
        const elements = form.elements;

        const payload = {
            email: elements.email.value,
            password: elements.password.value
        };

        const res = await axios.post("http://localhost:8080/login", payload);

        if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            alert("Login successful 🎉");
            window.location.href = "dashboard.html";
        }

    } catch (err) {
        console.log(err.response?.data || err.message);
    }
};