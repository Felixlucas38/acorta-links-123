import React from 'react';
import { Link } from 'react-router-dom';

// export default class NotFound extends React.Component {
//     render() {
//         return (
//             <div>
//                 <h1>NotFound Component</h1>
//             </div>
//         );
//     }
// }

export default () => {
    return (
        <div className="boxed-view">
            <div className="boxed-view__box">
                <h1>Page Not Found</h1>
                <p>Hmm, we're unable to find that page.</p>
                <Link className="button button--link" to="/">HEAD HOME</Link>
            </div>
        </div>
    );
};