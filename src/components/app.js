import React from 'react';
import HeaderSec from './header-sec';
import ListAllPage from './list-all-page';
import ListMyPage from './list-my-page';
import PostPage from './post-page';
import DetailPage from './detail-page';
import EditPage from './edit-page';
import EventContext from './event-context';
import {Route} from 'react-router-dom';


export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            error: null,
            loading: false,
            redirect: null
        }
    }

    updateUser = (user) => {
        this.setState(Object.assign({}, this.state, { user }));
        // this.setState({ user })
    }

    updateError = (error) => {
        this.setState(Object.assign({}, this.state, { error }));
    }

    updateLoading = (loading) => {
        this.setState(Object.assign({}, this.state, { loading }));
    }

    updateRedirect = (redirect) => {
        this.setState(Object.assign({}, this.state, { redirect }));
    }
    
    onConfirm = e => {
        e.preventDefault();
        this.updateError(null);
    }

    componentDidUpdate() { 
        // console.log(3, this.state.redirect);
        // if (this.state.redirect) this.props.history.push(this.state.redirect);
    }

    render(){
        const eventContext = {
            user: this.state.user,
            error: this.state.error,
            loading: this.state.loading,
            redirect: this.state.redirect,
            updateUser: this.updateUser,
            updateError: this.updateError,
            updateLoading: this.updateLoading,
            updateRedirect: this.updateRedirect
        }

        return (
        <EventContext.Provider value={eventContext}>
            <HeaderSec />
            <Route exact path="/" component={ListAllPage} />
            <Route exact path="/mylist" component={ListMyPage} />
            <Route exact path="/view/:id" component={DetailPage} />
            <Route exact path="/edit/:id" component={EditPage} />
            <Route exact path="/post" component={PostPage} />
            {/* <Route exact path="/intro" component={IntroPage} />
            <Route exact path="/calendar" component={SchedulePage} />
            <Route exact path="/book" component={BookPage} />
            <Route exact path="/myacct" component={MyacctPage} />
            <Route exact path="/myacct/gallery/:id" component={MygalleryPage} />
            <Route exact path="/signin" component={LoginPage} />
            <Route exact path="/signup" component={RegistrationPage} /> */}
            {   eventContext.error ? 
                <div className='fi1'>
                    <div id='js-popup-bg' className='dark'></div>
                    <section className='popup' id="js-popup">                  
                        <div id='js-err-title' className='font_l red'>Error</div><br/>
                        <div id='js-err-message' className='font_m mg0'>{eventContext.error.message}</div>
                        <div id='js-btn'><button onClick={() => this.updateError(null)} id='js-btn-ok' className="button btn-ok">O K</button></div>
                    </section>
                </div>
              : ""
            }
            {   eventContext.loading ? 
                <div className='fi1'>
                    <section className='loading' id="js-loading">
                        <img width="300" height="300" src="/img/ld-13.gif" alt="loading" />
                    </section>
                </div>
              : ""
            }
        </EventContext.Provider>
    
        );
    
    }

}