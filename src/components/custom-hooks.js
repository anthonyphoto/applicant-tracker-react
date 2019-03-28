import React, {useState} from 'react';
import {Route, withRouter} from 'react-router-dom';


export function ListAllSec(props) {
    return (
        <main className='main_bg' role='main'>
        <div className='row'> 
          <div className='col-12'>
            <section id='js-list' className='' role='regional' aria-live='polite'>
              <p id='js-list-title' className='font_l ind_l float'>All Applicants List</p>
              <a id='js-all-list-link' className='clr link_bot' href="myList">Go to Your list ></a>
              <p className="line_sp"></p>
              <ul id='js-ul' className='al_center' aria-live='polite'>
              </ul>
              
              <div id='js-demo-note' className='ind_l line_sp'>* Currently this app is set to allow all users to view the list for demo purpose.</div>
              <p className="mg_top"></p> 
            </section>
          </div>
        </div>
      </main>
    );

}