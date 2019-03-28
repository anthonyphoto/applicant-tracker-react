import React from 'react';

export default function ListAllPage(props) {
    return (
                <ul id='js-ul' className='al_center' aria-live='polite'>
                <li className='li_main'>
                    <div className='w2 li_title'>&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
                    <div className='w2 li_title'>Name</div>
                    <div className='w3 li_title'>Title</div>
                    <div className='w1a li_title'>Reporter</div>
                    <div className='w1 li_title'>Status</div>
                    <div className='w1a li_title'> </div>
                    </li>
                    {props.list}
                </ul>
                
    );

}