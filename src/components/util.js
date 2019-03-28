import React from 'react';
import {SKILL_LIST} from './skill-form';


export const getAuthInfo = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const obj = JSON.parse(window.atob(base64));
      return obj.user;   
    }
}

/* custom date format e.g. [ "Feb 09, 2019", "8:09 PM"] */
export const customDate = (dt) => {
    const dateOp = {month: 'short', day: '2-digit', year: 'numeric'};
    const timeOp = { hour: '2-digit', minute: '2-digit'};
    return [ dt.toLocaleString('en-US', dateOp), dt.toLocaleString('en-US', timeOp) ];
}

export const normalizePhone = (phone = "") => {
    if (phone.length===10){
        return phone.slice(0,3) + '-' + phone.slice(3,6) + '-' + phone.slice(6,10);
    }
    else return phone;
}

export const parseResumeForm = (target, compNum) => {
    const skill = [];
    for (let i = 0; i < SKILL_LIST.length; i++) {
        if (target[`s${i}`].checked) {
            skill.push(target[`s${i}`].value);
        }
    }

    const experience = [];
    for (let i = 1; i <= compNum; i++) {
      const company = target[`company${i}`].value;
      const location = target[`loc${i}`].value;
      const title = target[`title${i}`].value;
      const desc = target[`desc${i}`].value;
      const startYM = target[`start${i}`].value;
      const endYM = target[`end${i}`].value;
      /* Error handling */
      if (company) {
        // console.log("valid", company);
        let error, focus;
        if (!location) {
          error = `Location is missing in ${company}`;
          focus = `loc${i}`;
        }
        if (!title) {
          error = `Title is missing in ${company}`;
          focus = `title${i}`;
        }
        if (!desc) {
          error = `Description is missing in ${company}`;
          focus = `desc${i}`;
        }
        if (!endYM) {
          error = `End date is missing in ${company}`;
          focus = `end${i}`;
        }
        if (!startYM) {
          error = `Start date is missing in ${company}`;
          focus = `start${i}`;
        }
        if (startYM > endYM) {
          error = `Start data is later than End date in ${company}`;
          focus = `start${i}`;
        }
        if (error) {
          const err = { title: "Error", message: error, color: "red", focus };
          return err; 
        } 
      experience.push({ company, location, title, desc, startYM, endYM });
      }
    }
    // sort company list in chronological order 
    experience.sort((x, y)=> {
        const first = x.endYM.split(/-/).reduce((a, b)=> a + b);
        const second = y.endYM.split(/-/).reduce((a, b)=> a + b);
        return second - first;
      });

    const education = {
      school: target.school.value,
      location: target.locs.value,
      degree: target.degree.value,
      major: target.major.value
    }

    const resume = {
      firstName:  target.fname.value,
      lastName:   target.lname.value,
      email:      target.email.value,
      phone:      target.phone.value,
      linkedIn:   target.linkedin.value,
      location:   target.loc.value,
      title:      target.title.value,
      summary:    target.summary.value,
      skill,
      experience,
      education  
    }
    return resume;
}


export const getSkillDetailJsx = (skills = "") => {
    if (!skills) return "";
    return skills.map((s, i) => (<div key={`skill${i}`} className='skill-box flx'><img className='valign_m' src='/img/circle-check.svg' alt='checked' /> <span className='valign_m w300'>{s}</span></div>));
}

export const getCompanyDetailJsx = exp => {
    if (!exp) return "";
    
    let expJsx = [];
    for (let i = 0; i < exp.length; i++) {
        // const desc = exp[i].desc;
        const desc = exp[i].desc.split("</li><li>").map((txt, ind) => <li key={ind}>{txt}</li>);

        expJsx.push(<div key={`exp${i}`}><div className='blk'>
            <div className="company-div font_m blue">{exp[i].company}</div>
        </div>
        <div className='blk'>
            <div className="al_right w300 pos_comploc">{exp[i].location}</div>
        </div>
        <div className='clr'></div>
        <div className='blk'>
            <div className='font_ms'>{exp[i].title}</div>
        </div>
        <div className='blk'>
            <div className='w300 al_right'>({exp[i].startYM} - {exp[i].endYM})</div>
        </div>
        <div className='clr'></div>
        <div className='blk'>
            <div className='inp-full line2'>
                <ul className='ls-s'>
                    {desc}
                    {/* <li> {exp[i].desc}</li> */}
                </ul>
            </div>
        </div>
        <div className='clr'></div></div>);
    }

    return <div><legend className='font_m section-border'>Professional Experience</legend>
    <div id='js-exp-detail'>
        {expJsx}
    </div></div>;
}

export const getSchoolDetailJsx = (education = "") => {
    if (!education.school) return "";

    let degMajor = "";
    const degree = education.degree;
    const major = education.major;

    if (!(degree || major)) degMajor = "";
    if (degree && major) degMajor = `${degree} in ${major}`;
    if (degree && !major) degMajor = degree;
    if (!degree && major) degMajor = 'Major in ' + major;

    return (<div><legend className='font_m section-border'>Education</legend>
        <div id='js-exp-detail'>
            <div className='blk'>
            <div className="company-div font_m blue">{education.school}</div>
        </div>
        <div className='blk'>
            <div className="al_right w300 pos_comploc">{education.location}</div>
        </div>
        <div className='clr'></div>
            <div className='blk'>
                <div className='inp-full'>
                    <div className='font_ms'>{degMajor}</div>
                </div>
            </div>
        <div className='clr'></div>
    </div></div>);
}