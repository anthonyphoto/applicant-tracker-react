import React, {useState, useEffect, useContext} from 'react';
import EventContext from './event-context';
import {getResume, deleteResume, putStatus} from './api';
import AdminForm from './admin-form';
import {getAuthInfo, normalizePhone, customDate, getCompanyDetailJsx, getSkillDetailJsx, getSchoolDetailJsx} from './util';

export default function DetailPage(props) {
    const eventContext = useContext(EventContext);
    const [resume, setResume] = useState({});   // get resume object from db
    const [deleteReq, setDeleteReq] = useState(false);  // trigger confirm window 
    const [deleteSuccess, setDeleteSuccess] = useState(false);  // trigger notice window 
    const id = props.match.params.id;
    const loggedUser = getAuthInfo() || {};

    useEffect(() => {
        getDetail();
        document.getElementById('content-top').scrollIntoView();
    }, []);
    useEffect(() => {
        if (eventContext.redirect) props.history.push(eventContext.redirect);
    });


    const getDetail = () => {
        eventContext.updateLoading(true);
        getResume(id)
        .then(result => {
            eventContext.updateLoading(false);
            if (result instanceof Error) {
                eventContext.updateError(result);
            }
            else setResume(result || {});
        })
    }

    const handleDeleteClick = e => {
        e.preventDefault();
        setDeleteReq(true);
    }
    
    const handleDeleteConfirm = e => {
        e.preventDefault();
        setDeleteReq(false);

        eventContext.updateLoading(true);
        deleteResume(id)
        .then(result => {
            eventContext.updateLoading(false);
            if (result instanceof Error) {
                eventContext.updateError(result);
            }
            else setDeleteSuccess(true);
        })
    }

    const onSubmitRedirect = e => {
        e.preventDefault();
        setDeleteSuccess(null);
        document.getElementById('content-top').scrollIntoView();
        props.history.push(`/mylist`);
      }

    const updateStatus = e => {
        e.preventDefault();
        putStatus(id, e.target.status.value)
        .then(result => {
            if (result instanceof Error) {
                alert(result.message);
            }
            else {
                alert("Success!");
                getDetail();    // update the current page
            };
        })
    }

    
    return (
        <main className='main_bg_form fi' id="content-top" role='main'>
            <div className='row'> 
                <div className='col-12'>
                    <section id='js-detail' className='ind_l mg_top' role='regional' aria-live='polite'>
                    <div className='section-border mg0-all'></div>
                    
                    <div className='blk line15'>
                        <span>{normalizePhone(resume.phone)}</span><br/>
                        <span>{resume.location}</span>
                    </div>
                    <div className='blk line15 al_right'>
                        <a className='thin' href={`mailto:${resume.email}`}>{resume.email}</a><br/>
                        <a className='thin' target='_blank' href={resume.linkedIn}>{resume.linkedIn}</a>
                    </div>
                    <div className='clr'></div>     
                    <div className='blk line_sp'>
                        <p className='font_l b inp-full'>{resume.firstName} {resume.lastName}</p>            
                        <div className='font_m mg0'>{resume.title}</div>
                        <div className='inp-full ls-s line2'>{resume.summary}
                        </div>
                    </div>
                    <div className='clr'></div>
                    <div className='blk'>
                        <div id='js-skill-detail' className='inp-full line2'>
                        {getSkillDetailJsx(resume.skill)}
                        </div>
                    </div>
                    <div className='clr'></div>
                    {getCompanyDetailJsx(resume.experience)}
                    {getSchoolDetailJsx(resume.education)}
                    <div className='section-border'></div>
                    <div className='blk line15 inp-full'>
                        <span className='red'>REF#: {id.slice(-5).toUpperCase()}</span><br/>
                        Submitted by: { resume.submitter ? resume.submitter.username: "" }<br/>
                        Created on: {customDate(new Date(resume.created))[0]}<br/>
                        Last updated on : {customDate(new Date(resume.updated))[0]}<br/><br/>
                        <div className='inp-full'>
                        <img src={`/img/${resume.status}.png`} alt={`Status: ${resume.status}`} className='img_w' />
                        </div>
                    </div>
                        <div className='clr'></div>
                        <div id='js-detail-btn'>
                        { Object.keys(loggedUser).length ?
                            <button onClick={()=>props.history.push('/mylist')} type="submit" id="js-go-list" className="btn_black">Back to MyList</button>
                          :
                            <button onClick={()=>props.history.push('/')} type="submit" id="js-go-list" className="btn_black">Back to List</button>
                        } 
                        {  loggedUser && resume.submitter ? 
                            ((loggedUser.username === resume.submitter.username || loggedUser.admin)) ? 
                            <React.Fragment>
                                <button onClick={()=>props.history.push(`/edit/${id}`)} type="submit" id="js-update" value={id} className="btn_black ind_l">Modify</button>
                                <button onClick={e => handleDeleteClick(e)} type="submit" id="js-delete" value={id} className="btn_black ind_l">Delete</button>
                            </React.Fragment>
                            : "" : ""
                        }
                        </div>
                        <div className="line_sp">* Only admin or submitter can modify or delete the posts.</div>
                        <p className="mg_top"></p> 
                        { 
                            (loggedUser.admin && resume.status) ? 
                            <React.Fragment>
                            <div className='section-border'></div>
                            <div className='blk line15 inp-full'>
                                <p className='font_ms red'>Status Update (Admin only)</p>
                                <form onSubmit={e => updateStatus(e)} id='js-status-update' method='post'>
                                    <AdminForm status={resume.status} />
                                    <button id="js-btn-status" type="submit"> Update</button>
                                </form>
                            </div>
                          </React.Fragment>
                            : ""
                        }

                    </section>

                    { deleteReq ?
                        <div>
                            <div id='js-popup-bg' className='dark'></div>
                            <section className='popup' id="js-popup">
                                <div id='js-err-title' className='font_l red'>Confirm</div><br/>
                                <div id='js-err-message' className='font_m mg0'>Are you sure to delete this item?</div>
                                <div id='js-btn'>
                                <button onClick={e => handleDeleteConfirm(e)} id='js-btn-ok' className="button btn-ok">O K</button>&nbsp; &nbsp; &nbsp;
                                <button onClick={e => setDeleteReq(false)} id='js-btn-cancel' className="button btn-ok">Cancel</button>
                                </div>
                            </section>
                        </div>
                        : ""
                    }
                    { deleteSuccess ?
                        <div>
                        <div id='js-popup-bg' className='dark'></div>
                        <section className='popup' id="js-popup">                  
                            <div id='js-err-title' className='font_l green'>Success</div><br/>
                            <div id='js-err-message' className='font_m mg0'>Your resume is successfully deleted.</div>
                            <div id='js-btn'><button onClick={e => onSubmitRedirect(e)} id='js-btn-ok' className="button btn-ok">O K</button></div>
                        </section>
                        </div>
                        : ""
                    }
                    
                </div>
            </div>
        </main>
    );
}

