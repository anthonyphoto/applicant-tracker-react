import React from 'react';

/* Planning to migrate this variable to database so admin can manage */
export const SKILL_LIST = ["HTML5", "CSS3", "Javascript", "jQuery", "C", "C++", "Java", "Redux", "Angular.js", "React.js", "Vue.js", "Express", "Node.js", "Python","Ruby", "C#.net", "MongoDB", "PostgreSQL", "Oracle", "MySQL", "Git", "Docker", "Mocha", "Chai", "Travis CI", "Perl"];

export default function SkillForm(props) {
    // selected skills from the prev submission
    const selectedSkills = props.skill || []; 
    
    const skillSet = [];
    for (let i = 0; i < SKILL_LIST.length; i++) {
        const checked = selectedSkills.find(skill => skill === SKILL_LIST[i]) ? true : false;

        skillSet.push(
        <div key={`key${i}`} className='skill-box'>
            <input defaultChecked={checked} type="checkbox" name={`s${i}`} id={`s${i}`} value={SKILL_LIST[i]}/>
            <label htmlFor={`s${i}`}> {SKILL_LIST[i]}</label>
        </div>
        );
    }

    return (
        <fieldset name="skills">
        <label htmlFor="title">Title <span className='red-bold'>*</span></label>
        <select defaultValue={props.title} className="inp" id="title" required>
          <option value="">--Please select a title--</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Web Developer">Web Developer</option>
          <option value="Fullstack Software Engineer">Fullstack Software Engineer</option>
          <option value="Front-end Developer">Front-end Developer</option>
          <option value="Back-end Developer">Back-end Developer</option>
          <option value="DevOps Engineer">DevOps Engineer</option>
          <option value="Data Scientist">Data Scientist</option>
          <option value="Embedded Software Engineer">Embedded Software Engineer</option>
          <option value="QA Engineer">QA Engineer</option>
        </select><br/><br/>
        <div className='clr'></div>
        <label htmlFor="summary">Summary <span className='red-bold'>*</span></label><br/>
        <textarea defaultValue={props.summary} name="summary" id="summary" className="inp-full inp" placeholder="Please describe your summary in a couple of sentences" rows="5" minLength='3' maxLength='1200' required ></textarea><br/><br/>
        <label htmlFor="skills">Tech Skills - Check all that apply</label>
        <div id='js-skill' className='inp-full line2'>
            {skillSet}
            <div className='clr'></div>
        </div>
      </fieldset>
    );

}