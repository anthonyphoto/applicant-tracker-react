import React from 'react';

export default function PersonalForm(props) {

    return (
      <fieldset name="personalInfo">
        <div className='blk'>
          <label htmlFor="fname">First Name <span className='red-bold'>*</span></label>
          <input defaultValue={props.firstName} type="text" name="fname" id="fname" className="inp" placeholder="" required />
        </div>
        <div className='blk'>
          <label htmlFor="lname">Last Name <span className='red-bold'>*</span></label>
          <input defaultValue={props.lastName} type="text" name="lname" id="lname" className="inp" placeholder="" required />
        </div>
        <div className='clr'></div>
        <div className='blk'>
          <label htmlFor="email">Email <span className='red-bold'>*</span></label>
          <input defaultValue={props.email} type="email" name="email" id="email"className="inp" placeholder="foo@bar.com" required />
        </div>
        <div className='blk'>
            <label htmlFor="phone">Phone <span className='red-bold'>*</span></label>
            <input defaultValue={props.phone} type="number" name="phone" id="phone" className="inp" placeholder="8885551234" required />
        </div>
        <div className='clr'></div>
        <div className='blk'>
          <label htmlFor="linkedin">LinkedIn</label>
          <input defaultValue={props.linkedIn} type="url" name="linkedin" id="linkedin" className="inp" placeholder="https://www.linkedin.com/in/xyz" />
        </div>
        <div className='blk'>
            <label htmlFor="loc">Location <span className='red-bold'>*</span></label>
            <input defaultValue={props.location} type="text" name="loc" id="loc" className="inp" placeholder="Philadelphia, PA" required />
        </div>
      </fieldset>
    );

}