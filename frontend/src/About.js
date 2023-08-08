import React, { useState } from 'react';
import './App.css';

function About () {
    return (
    <div className='app'>
        <img src="assets/img/hena-profile.jpg" class="profile" alt="hena-avatar"/>
        <h1>Hi! I'm Hena 👋🏼 </h1>I'm an Indian working as a Product Manager at <a href="https://www.tablecheck.com/en/" class="text-anchor">TableCheck Inc</a>, Tokyo. 
        I have an engineering background but as a firm believer in the concept of Ikigai,
        <em>a reason for being</em>, I'm on the quest of discovering purpose of life. Found Product Management on the way, and holding on to it tightly. Here's a sneak peek into my work and what I'm up to in life now
    </div>
    )
  }

export default About;