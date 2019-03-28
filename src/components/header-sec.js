import React, {useState, useEffect, useContext} from 'react';
import SignInSec from './sign-in-sec';
import EventContext from './event-context';
import {getAuthInfo} from './util';

export default function HeaderSec(props) {
    const [user, setUser] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setSignup] = useState(false);

    const eventContext = useContext(EventContext);

    useEffect(()=>{
        setUser(getAuthInfo());
        eventContext.updateUser(getAuthInfo());
    }, []);


    const handleLoginSec = e => {
        e.preventDefault();
        if (user){
            console.log("usr", user);
            eventContext.updateRedirect('/post');
            // props.history.push('/post');

        } else setShowLogin(true);
    }

    const closeLogin = () => {
        setShowLogin(false);
        setUser(getAuthInfo());
    }

    const onLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('authToken');
        setUser(getAuthInfo());
    }

    return (
        <React.Fragment>  
            <header className='banner'>
                <div className='row'> 
                    <div id='js-main' className='col-12'>
                        <section id='js-top-link' className="top al_left">
                        { user ? <a onClick={e => onLogout(e)} id='js-login-link' href='signout'>Sign Out</a> 
                                : <a onClick={e => handleLoginSec(e)} id='js-logout-link' href='signin'>Sign In</a>
                        }
                        </section>
                        <p className='font_el ind_l mg_top'>{user ? <span id='js-name-main'>{`Hi, ${user.firstName}!`}<br/></span> : ""}Looking for<br />Software Engineer Jobs?</p>
                        <p className='font_m ind_l'>Please drop your resume here</p>
                        <button onClick={e => handleLoginSec(e)} type="submit" className="btn_black ind_l">
                            { user ? "Post Your Resume" : "Start Here" }
                        </button>
                        <div className='mg_top'></div>
                    </div>
                </div>
            </header>
            { showLogin ? 
                <SignInSec 
                    onLogin={()=>closeLogin()} 
                /> 
                : "" 
            }
        </React.Fragment>  
    );

}
