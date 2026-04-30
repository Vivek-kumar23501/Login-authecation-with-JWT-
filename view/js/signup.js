const signup=async (e)=>{
    try {
        e.preventDefault()
        const form=e.target
        const elements=form.elements

    const payload = {
      fullname: elements.fullname.value,
      email: elements.email.value,
      password: elements.password.value,
      mobile: elements.mobile.value
    };
    const res = await axios.post('http://localhost:8080/signup', payload);

    if (res.data) {
  alert("Signup successful 🎉");
  window.location.href = "./index.html";
}

  } catch (err) {
    console.log(err.response?.data || err.message);
   
  }
}
