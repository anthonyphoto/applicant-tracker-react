import React, {useState, useContext} from 'react';
import EventContext from './event-context';
import {postLogin, postSignup} from './api';

export default function SignInSec(props) {

  const eventContext = useContext(EventContext);
  const [signupDone, setSignupDone] = useState(null);
  const [newUser, setNewUser] = useState(false);  // Signup page for new users

  const onSubmit = async e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const usr = { username, password };

    eventContext.updateLoading(true);
    const result = await postLogin(usr);
    eventContext.updateLoading(false);

    if (result instanceof Error) {
      eventContext.updateError(result);
    }
    else props.onLogin();
  }

  const onSignup = async e => {
    e.preventDefault();
    const username = e.target.username.value;
    const firstName = e.target.fname.value;
    const lastName = e.target.lname.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;
    const usr = { username, firstName, lastName, password };

    if (password !== password2){
      const msg = { 
        title: "Error",
        message: "Two passwords must match. Please enter again.",
        focus: "password"
      }
      eventContext.updateError(msg);
      return;
    }

    eventContext.updateLoading(true);
    const result = await postSignup(usr);
    eventContext.updateLoading(false);

    if (result instanceof Error) {
      eventContext.updateError(result);
    }
    else setSignupDone({
      title: result.firstName,
      message: 'You are successfully registered.  Please sign in to proceed',
    });
  }
  
  const onSignupDone = e => {
    e.preventDefault();
    setNewUser(false);
    setSignupDone(null);
  }

  const switchPage = (e, newFlag) => {
    e.preventDefault();
    if (newFlag) {
      document.getElementById('username-l').value = "";
      document.getElementById('password-l').value = "";
    }
    setNewUser(newFlag);
  }
  
  return (
    <React.Fragment>
    { 
        !newUser ? 
          <section className='login fi1' id="js-login" aria-live='polite'>                  
            <div className="form">
                <legend className='font_m'>Sign In</legend>
                <form onSubmit={e => onSubmit(e)} id="signin" method="post">
                    <fieldset name="login">
                      <label htmlFor="username-l">Username {eventContext.name}</label><br/>
                      <input defaultValue="demo" type="text" name="username" id="username-l" className="inp" placeholder="" required />
                      <label htmlFor="password-l">Password</label><br/>
                      <input defaultValue="guest" type="password" name="password" id="password-l" className="inp" required />
                      Demo Account: demo/guest
                    </fieldset>
                    <button type="submit" className="button inp">Sign In</button>
                </form>
                <div>
                  <p onClick={e=>switchPage(e, true)} className="ban_desc al_center">Don't have an account? <a href='signup' id='js-signup-link'>Sign up</a></p>
                  <p className="line_sp"></p> 
                </div>
            </div>
          </section>
        :
        <section className='login fi1' id="js-signup" aria-live='polite'>                  
          <div className="form">
              <legend className='font_m'>Sign up</legend>
              <form onSubmit={e => onSignup(e)} id="signup" method="post">
                  <fieldset name="signup">                
                    <label htmlFor="username-s">Username<br/></label>
                    <input defaultValue="" type="text" name="username" id="username-s" className="inp" minLength="5" placeholder="" required />
                    <label htmlFor="fname-s">First Name</label>
                    <input defaultValue="" type="text" name="fname" id="fname-s" className="inp" placeholder="" required />
                    <label htmlFor="lname-s">Last Name</label>
                    <input defaultValue="" type="text" name="lname" id="lname-s" className="inp" placeholder="" required />
                    <label htmlFor="password">Password</label>
                    <input defaultValue="" type="password" name="password" id="password" className="inp" minLength="5" required />
                    <label htmlFor="password2">Repeat Password</label>
                    <input defaultValue="" type="password" name="password2" id="password2" className="inp" minLength="5" required />
                  </fieldset>
                  <button type="submit" className="button inp">Sign up</button>
              </form>
              <div>
                <p onClick={e=>switchPage(e, false)} className="ban_desc al_center">Already have an account? <a id="js-login-link2" href="signin">Sign In</a></p>
                <p className="line_sp"></p>
              </div>
          </div>
        </section>
    }
    { signupDone ?
        <div>
          <div id='js-popup-bg fi1' className='dark'></div>
          <section className='popup' id="js-popup">                  
              <div id='js-err-title' className='font_l green'>{signupDone.title}</div><br/>
              <div id='js-err-message' className='font_m mg0'>{signupDone.message}</div>
              <div id='js-btn'><button onClick={e => onSignupDone(e)} id='js-btn-ok' className="button btn-ok">O K</button></div>
          </section>
        </div>
        : ""
    }
    </React.Fragment>
  )
}
