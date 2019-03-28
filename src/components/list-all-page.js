import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import ListSec from './list-sec';
import EventContext from './event-context';
import {getAuthInfo, customDate} from './util';
import {getResumes} from './api';



export default function ListAllPage(props) {
    const [list, setList] = useState([]);
    const eventContext = useContext(EventContext);
    const loggedUser = getAuthInfo() || "";

    let listJsx = [];
    useEffect(() => {
        getList();
        window.scrollTo(0,0);

    }, []);
    useEffect(() => {
        if (eventContext.redirect) props.history.push(eventContext.redirect);

    });

    // ajax call
    const getList = () => {
        eventContext.updateLoading(true);
        getResumes()
        .then(result => {
            eventContext.updateLoading(false);
            if (result instanceof Error) {
                eventContext.updateError(result);
                }
                else renderList(result);
        })
    }
    
    // // async function is not working in useEffect(), so I used promise instead
    // const getList = async () => {
    //     eventContext.updateLoading(true);
    //     const result = await getResumes();
    //     eventContext.updateLoading(false);
    //     if (result instanceof Error) {
    //         eventContext.updateError(result);
    //       }
    //       else renderList(result);
    // }

    const renderList = resumes => {
        for (let i = 0; i < resumes.length; i++) {
            const id = resumes[i]._id;
            const created = customDate(new Date(resumes[i].created))[0];
            const name = resumes[i].firstName + ' ' + resumes[i].lastName;
            const title = resumes[i].title;
            const username = resumes[i].submitter.username;
            const admin = resumes[i].submitter.admin;
            const recruiter = resumes[i].submitter.recruiter;
            const status = resumes[i].status;
            listJsx.push(
            <li key={id} className='li_main'>
                <div className='w2'><div><img src='/img/circle-check.svg' alt='checked' /></div>
                &nbsp; {created}</div>
                <div className='w2'>{name}</div>
                <div className='w3'>{title}</div>
                <div className='w1a'>{username}
                {
                    admin ? <span className='red b'> (administrator)</span>
                        :   recruiter ? <span className='green b'> (recruiter)</span> : ""
                }
                </div>
                <div className='w1'>{status}</div>
                <div className='w1a'><Link to={`/view/${id}`} className='thin'>View Detail ></Link></div>
            </li>
            );
        };
        setList(listJsx);
    }

    return (
        <main className='main_bg fi' role='main'>
            <div className='row'> 
                <div className='col-12'>
                    <section id='js-list' className='' role='regional' aria-live='polite'>
                    <p id='js-list-title' className='font_l ind_l float'>All Applicants List</p>
                    { 
                        loggedUser ?
                            <Link to="/mylist" id='js-all-list-link' className='clr link_bot'>Go to Your list ></Link> 
                        : ""
                    }

                    <p className="line_sp"></p>
                    <ListSec list={list} />
                    
                    <div id='js-demo-note' className='ind_l line_sp'>* Currently this app is set to allow all users to view the list for demo purpose.</div>
                    <p className="mg_top"></p> 
                    </section>
                </div>
            </div>
      </main>
    );

}
