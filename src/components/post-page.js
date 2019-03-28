import React, {useState, useEffect, useContext} from 'react';
import EventContext from './event-context';
import PersonalForm from './personal-form';
import SkillForm from './skill-form';
import CompanyForm from './company-form';
import EducationForm from './education-form';
import {postResume} from './api';
import {getAuthInfo, parseResumeForm} from './util';
import {Link} from 'react-router-dom';


export default function PostPage(props) {
    const eventContext = useContext(EventContext);
    const [companyQty, setCompanyQty] = useState(1);
    const [submitSuccess, setSubmitSuccess] = useState(null);
    const [focus, setFocus] = useState(null);
    const loggedUser = getAuthInfo();

    useEffect(() => {
        if (eventContext.redirect === props.match.path) {
            eventContext.updateRedirect(null);
            console.log("update called");
        }
        if (focus) {
            document.getElementById(focus).focus();
        }

    });



    if (!loggedUser) {
        props.history.push('/');
    }
    

    const companyFormJsx = [];
    for (let i = 1; i <= companyQty; i++) {
        companyFormJsx.push(<CompanyForm key={`com${i}`} id={i} />);
    }

    // add additional company section
    const addComp = e => {
        e.preventDefault();
        setCompanyQty(companyQty + 1);
    }


    const handleSubmit = async e => {
        e.preventDefault();
        const resume = parseResumeForm(e.target, companyQty);
        console.log("resumte: ", resume);
        if (resume.title === "Error") {
            eventContext.updateError(resume);
            setFocus(resume.focus);
            return;
        }
        eventContext.updateLoading(true);
        const result = await postResume(resume);  
        eventContext.updateLoading(false);

        if (result instanceof Error) {
            eventContext.updateError(result);
          }
          else {
            setSubmitSuccess({
                title: "Thank you",
                message: 'Your resume is succefully submitted.',
                id: result._id
            });
            console.log("res: ", result);
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
                    <p id='js-name-post' className='font_l ind_l'>{loggedUser ? loggedUser.firstName : ""},</p>
                    <p id='js-msg-post' className='font_m ind_l'>Please submit your resume. We will proceed with your application process.</p>
                    <p className="line_sp"></p>
                    <form onSubmit={e => handleSubmit(e)} id='ant-1' className="ind_l" method="post">
                    <legend className='font_m blue section-border'>Personal Info</legend>
                        <PersonalForm />
                    <legend className='font_m  blue section-border'>Summary & Skills</legend>
                        <SkillForm />
                    <legend className='font_m blue section-border'>Professional Experience</legend>
                        {companyFormJsx}
                    <a onClick={e => addComp(e)} id='js-add-company' href='addcom'>Add another company ></a>
                    <legend className='font_m blue section-border'>Education</legend>
                        <EducationForm />
                    <div id='js-btn2'>
                        <button id="js-btn-post" type="submit" className="button inp">Submit</button>
                    </div>
                    <Link to='/' href='cancel'>Cancel and go back to List ></Link>
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

