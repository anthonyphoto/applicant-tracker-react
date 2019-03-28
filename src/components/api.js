import {API_BASE_URL} from '../config';
import {getAuthInfo} from './util';

// Sign in 
export const postLogin = usr => {
  return fetch(API_BASE_URL + '/api/auth/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(usr)    
    })
    .then(response=>new Promise( (resolve) => setTimeout(()=> resolve(response), 500)))  
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then(data => {
      localStorage.setItem('authToken', data.authToken);
      return data;
    })
    .catch(err => {
      console.error(err);
      return err;
    });
}

// Sign up new user
export const postSignup = usr => {
  return fetch(API_BASE_URL + '/api/users', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(usr)
  })
  .then(response=>new Promise( (resolve) => setTimeout(()=> resolve(response), 500)))  
  .then(response => {
    if (response.ok) return response.json();
    throw new Error(response.statusText);
  })
  .catch(err=> {
    console.error(err);
    return err;
  });
}

// returns array of all resumes (all access)
export const getResumes = () => {
  return fetch(API_BASE_URL + '/resumes')
    .then(response=>new Promise( (resolve) => setTimeout(()=> resolve(response), 300)))  
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .catch(err => {
      console.error(err);
      return err;
    });
}

/* parameter: username */
export const getResumeByUser = username => {
  const authToken = localStorage.getItem('authToken');
  return fetch(API_BASE_URL + '/resumes/user/' + username, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        method: 'GET'
      })
      .then(response=>new Promise( (resolve) => setTimeout(()=> resolve(response), 300)))  
      .then(response => {
        // console.log("get /resumes", response);
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .catch(err => {
        console.error(err);
        return err;
      });
}

// Get a resume by resume id (all access)
export const getResume = id => {
  const authToken = localStorage.getItem('authToken');
  return fetch(API_BASE_URL + '/resumes/' + id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      method: 'GET'
    })
    .then(response=>new Promise( (resolve) => setTimeout(()=> resolve(response), 400)))  
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .catch(err => {
      console.error(err);
      return err;
    });
}

// Post a resume (logged user)
export const postResume = resume => {
  const authToken = localStorage.getItem('authToken');
  return fetch(API_BASE_URL + '/resumes', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      method: 'POST',
      body: JSON.stringify(resume)
    })
    .then(response=>new Promise( (resolve) => setTimeout(()=> resolve(response), 600)))  
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .catch(err => {
      console.error(err);
      return err;
    });
}

// Modify a resume (owner access)
export const putResume = (resume, id) => {
  const authToken = localStorage.getItem('authToken');
  return fetch(API_BASE_URL + '/resumes/' + id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      method: 'PUT',
      body: JSON.stringify(resume)
    })
    .then(response=>new Promise( (resolve) => setTimeout(()=> resolve(response), 600)))  
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .catch(err => {
      console.error(err);
      return err;
    });
}

// Delete resume (owner access)
export const deleteResume = id => {
  const authToken = localStorage.getItem('authToken');
  return fetch(API_BASE_URL + '/resumes/' + id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      method: 'DELETE'
    })
    .then(response=>new Promise( (resolve) => setTimeout(()=> resolve(response), 600)))  
    .then(response => {
      if (response.ok) {
        return;
      }
      throw new Error(response.statusText);
      
    })
    .catch(err => {
      console.error(err);
      return err;
    });
}