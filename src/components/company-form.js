import React from 'react';



export default function CompanyForm(props) {
    const id = props.id;
    const exp = props.exp || "";

    return (
        <fieldset id='js-exp-sec' name="experience">
        <div id={`js-company${id}`}>
          <div className='company-div blue'>
            Company {id}
          </div>
          <div className='blk'>
            <label htmlFor={`company${id}`}>Name</label>
            <input defaultValue={exp.company} type="text" name={`company${id}`} id={`company${id}`} className="inp" placeholder="Company Name" />
          </div>
          <div className='blk'>
            <label htmlFor={`loc${id}`}>Location</label>
            <input defaultValue={exp.location} type="text" name={`loc${id}`} id={`loc${id}`} className="inp" placeholder="e.g. Philadelphia, PA" />
          </div>
          <div className='clr'></div>
          <div className='blk'>
            <label htmlFor={`title${id}`}>Title</label><br/>
            <input defaultValue={exp.title} type="text" name={`title${id}`} id={`title${id}`} className="inp" placeholder="e.g. Software Engineer" />
          </div>
          <div className='blk'>
            <label htmlFor={`desc${id}`}>Description</label><br/>
            <input defaultValue={exp.desc} type="text" name={`desc${id}`} id={`desc${id}`} className="inp" placeholder="e.g. Developed web applications" />
          </div>
          <div className='clr'></div>
          <div className='blk'>
            <label htmlFor={`start${id}`}>Start Month</label><br/>
            <input defaultValue={exp.startYM} type="month" name={`start${id}`} id={`start${id}`} className="inp" />
          </div>
          <div className='blk'>
            <label htmlFor={`end${id}`}>End Month</label><br/>
            <input defaultValue={exp.endYM} type="month" name={`end${id}`} id={`end${id}`} className="inp" />
          </div>
          <div className='clr'></div>
        </div><br/>
      </fieldset>
    );

}