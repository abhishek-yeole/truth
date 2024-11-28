import React from 'react';

export function PermissionIcon(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}><defs><mask id="ipTPermissions0"><g fill="none" stroke="#fff" strokeLinecap="round" strokeWidth={4}><path strokeLinejoin="round" d="M20 10H6a2 2 0 0 0-2 2v26a2 2 0 0 0 2 2h36a2 2 0 0 0 2-2v-2.5"></path><path d="M10 23h8m-8 8h24"></path><circle cx={34} cy={16} r={6} fill="#555" strokeLinejoin="round"></circle><path strokeLinejoin="round" d="M44 28.419C42.047 24.602 38 22 34 22s-5.993 1.133-8.05 3"></path></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTPermissions0)"></path></svg>);
}