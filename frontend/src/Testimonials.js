import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './App.css';
import Axios from 'axios';

function Testimonials() {
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [messageText, setMessageText] = useState("");
  const [items, setItems] = useState([
    {
      name: "yiying",
      message: "hi hi"
    },
    {
      name: "toyo",
      message: "ho ho"
    }
  ]);

  // let handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let res = await fetch("https://henashah.com:3000/api/insert/", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         name: name,
  //         profile: profile || null,
  //         mobileNumber: mobileNumber,
  //         messageText: messageText
  //       }),
  //     });
  //     let resJson = await res.json();
  //     if (res.status === 200) {
  //       setName("");
  //       setProfile("");
  //       setMessage("User created successfully");
  //     } else {
  //       setMessage("Some error occured");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const submit = () => {
    Axios.post("/api/insert").then(() => {
      console.log("returned from post api");
      // alert("Succesfully added");
    });
  }

  const getTestimonies = () => {
    Axios.get("https://henashah.com:80/api/testimonies").then((results) => {
      console.log("returned from post api");
      setItems(results.data); //not sure if this line of code makes sense
      items = results.data;
     });
    return <div className="testimonies">
      <h3>Testimonials</h3>
      <div id="quotes">
      {items.map((item, index) => (
        <div className="quote" key={index}>
          <p className="quote-text">{item.message}</p>
          <p className="quote-author">{item.name}</p>
        </div>))}
    </div>
    </div>
  }

  return (
    <div className="content">
      <div className="App">
      <form onSubmit={submit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={profile}
          placeholder="LinkedIn"
          onChange={(e) => setProfile(e.target.value)}
        />
        <input
          type="text"
          value={messageText}
          placeholder="Share your experience"
          onChange={(e) => setMessageText(e.target.value)}
        />

        <Button variant="contained" type="submit" sx = {{backgroundColor : '#00A897' }}>Create</Button>
        {/* <getTestimonies /> */}
        {items.map((item, index) => (
        <div className="quote" key={index}>
          <p className="quote-text">{item.message}</p>
          <p className="quote-author">{item.user}</p>
        </div>))}
        {/* <div className="message">{message ? <p>{message}</p> : null}</div> */}
      </form>
    </div>
    </div>
  );
}

export default Testimonials;

/* <div id="newTestimonial">
        <h3>How was your experience working with Hena?</h3>
        <form name="newTestimonial" action="testimonials/add" method="post">
          <input type="text" id="form-user" name="user" placeholder="Your Name" />
          <br />
          <textarea name="text" rows="8" cols="60" placeholder="Enter your testimonial here" />
          <input type="hidden" name="approved" value="0" />
          <br />
          <input type="submit" value="add" />
        </form>
      </div>
      {addStatus !== undefined && addStatus === 'success' && (
        <div className="alert alert-success" role="alert">
          Your testimonial has been submitted!
        </div>
      )}
      <h3>Testimonials</h3>
      <hr /> */
      /* <div id="quotes">
        {items.map((item, index) => (
          <div className="quote" key={index}>
            <p className="quote-text">{item.text}</p>
            <p className="quote-author">{item.user}</p>
            <hr />
          </div>
        ))}
      </div> */