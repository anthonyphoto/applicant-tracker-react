import React, {useState, useEffect, useContext} from 'react';
import EventContext from './event-context';
import PersonalForm from './personal-form';
import SkillForm from './skill-form';
import CompanyForm from './company-form';
import EducationForm from './education-form';
import {getResume, putResume} from './api';
import {getAuthInfo, parseResumeForm} from './util';
import {Link} from 'react-router-dom';


export default function EditPage(props) {
    const eventContext = useContext(EventContext);
    const [resume, setResume] = useState({});   // get resume object from db
    const id = props.match.params.id;
    const [companyQty, setCompanyQty] = useState(1);
    const [submitSuccess, setSubmitSuccess] = useState(null);
    const [focus, setFocus] = useState(null);
    const loggedUser = getAuthInfo();

    if (!loggedUser) {
        props.history.push('/');
    }

    useEffect(() => getDetail(), []);
    useEffect(() => {
        if (eventContext.redirect) props.history.push(eventContext.redirect);
        if (focus) {
            document.getElementById(focus).focus();
        }
    });

    const getDetail = () => {
        eventContext.updateLoading(true);
        getResume(id)
        .then(result => {
            eventContext.updateLoading(false);
            if (result instanceof Error) {
                eventContext.updateError(result);
            }
            else {
                setResume(result);
                setCompanyQty(result.experience.length);
            }
        })
    }

    const companyFormJsx = [];
    for (let i = 1; i <= companyQty; i++) {

        let exp = "";
        if (resume.experience) {
            exp = resume.experience.length ? resume.experience[i - 1] : "";
        }
        companyFormJsx.push(<CompanyForm exp={exp} key={`com${i}`} id={i} />);
    }

    // add additional company section
    const addComp = e => {
        e.preventDefault();
        setCompanyQty(companyQty + 1);
    }


    const handleSubmit = async e => {
        e.preventDefault();
        const resume = parseResumeForm(e.target, companyQty);
        console.log("updated resume: ", resume);
        if (resume.title === "Error") {
            eventContext.updateError(resume);
            setFocus(resume.focus);
            return;
        }

        eventContext.updateLoading(true);
        const result = await putResume(resume, id);  
        eventContext.updateLoading(false);
        console.log("res: ", result);

        if (result instanceof Error) {
            eventContext.updateError(result);
        }
        else {
            setSubmitSuccess({
                title: "Thank you",
                message: 'Your resume is succefully updated.',
                id: result._id
            });
        }
    }

    const onSubmitRedirect = (e, eventId) => {
        e.preventDefault();
        setSubmitSuccess(null);
        console.log("eid", eventId);
        props.history.push(`/view/${eventId}`);
      }
        
    return (
        <main className='main_bg_form' role='main'>
            <div className='row'> 
                <div className='col-12'>
                    <section id='js-post' role='regional' aria-live='polite'>
                    <p id='js-name-post' className='font_l ind_l'>{loggedUser.firstName},</p>
                    <p id='js-msg-post' className='font_m ind_l'>You can update this resume by editing the form below.</p>
                    <p className="line_sp"></p>
                    <form onSubmit={e => handleSubmit(e)} id='ant-1' className="ind_l" method="post">
                    <legend className='font_m blue section-border'>Personal Info</legend>
                        <PersonalForm {...resume} />
                    <legend className='font_m  blue section-border'>Summary & Skills</legend>
                        {
                            resume.title ? 
                            <SkillForm {...resume} /> : ""

                        }
                    <legend className='font_m blue section-border'>Professional Experience</legend>
                        {companyFormJsx}
                    <a onClick={e => addComp(e)} id='js-add-company' href='addcom'>Add another company ></a>
                    <legend className='font_m blue section-border'>Education</legend>
                        { 
                            resume.education ? 
                            <EducationForm {...resume.education} /> : ""
                        }
                    <div id='js-btn2'>
                        <button id="js-btn-post" type="submit" className="button inp">Update</button>
                    </div>
                    <a id='js-post-cancel' href='cancel'>Cancel and go back to List ></a>
                    </form>
                    <p className="line_sp"></p>
                    </section>
                    { submitSuccess ?
                        <div>
                        <div id='js-popup-bg' className='dark'></div>
                        <section className='popup' id="js-popup" role="region">                  
                            <div id='js-err-title' className='font_l green'>{submitSuccess.title}</div><br/>
                            <div id='js-err-message' className='font_m mg0'>{submitSuccess.message}</div>
                            <div id='js-btn'><button onClick={e => onSubmitRedirect(e, submitSuccess.id)} id='js-btn-ok' className="button btn-ok">O K</button></div>
                        </section>
                        </div>
                        : ""
                    }
                </div>
            </div>
        </main>
    );
}

