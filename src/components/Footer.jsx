import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import { CodeIcon } from './Icons';
export default function App() {
  return (
    <MDBFooter  className='text-center text-lg-left'>
      <div className='text-center p-3' style={{ backgroundColor: '#020c1b' ,padding:'10px' ,textAlign:'center' 
  ,left: "0",
  bottom: "0"
  ,width: '100%'
  }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' style={{ textDecoration:'none',color:'white'}} href='https://mdbootstrap.com/'>
         Movie Club 
        </a>
        <p>By : <a href="https://aman-thakur.netlify.app/" style={{textDecoration:'none', color:'white', cursor:'pointer'}}>Aman Thakur</a></p>
      </div>
    </MDBFooter>
  );
}