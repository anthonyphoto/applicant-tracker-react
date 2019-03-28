import React from 'react';

export default function EducationForm(props) {
    
    return (
      <fieldset name="education">
        <div className='blk'>
          <label htmlFor="school">School</label>
          <input defaultValue={props.school} type="text" name="school" id="school" className="inp" placeholder="e.g. University of Florida" />
        </div>
        <div className='blk'>
          <label htmlFor="locs">Location</label>
          <input defaultValue={props.location} type="text" name="locs" id="locs" className="inp" placeholder="e.g. Gainesville, FL" />
        </div>
        <div className='clr'></div>
        <div className='blk'>
          <label htmlFor="major">Major</label><br/>
          <input defaultValue={props.major} type="text" name="major" id="major" className="inp" placeholder="e.g. Computer Engineering" />
        </div>
        <div className='blk'><br/>
          <label htmlFor="degree">Degree</label>
          <select defaultValue={props.degree} className="inp" id="degree" >
            <option value="">--Please select a degree--</option>
            <option value="Bachelor Degree">Bachelor Degree</option>
            <option value="Master Degree">Master Degree</option>
            <option value="Doctorial Degree">Doctorial Degree</option>
            <option value="Associate Degree">Associate Degree</option>
            <option value="High School">High School</option>
          </select><br/><br/>
        </div>
        <div className='clr'></div>
      </fieldset>
    );
}