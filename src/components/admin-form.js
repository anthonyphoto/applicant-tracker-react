import React from 'react';

export default function AdminForm(props) {

    return (
        <React.Fragment>
            <select defaultValue={props.status} id="status" name="status" required>
            <option value="Submitted">Submitted</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="In Review">In Review</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
            </select>&nbsp; &nbsp; 
        </React.Fragment>
    );

}