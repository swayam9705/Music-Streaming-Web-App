import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <section className="Sidebar">
            <div className="Sidebar__title">Your Library</div>
            <div className="Sidebar__parts">
                <div className="Sidebar__part">
                    <div className="Sidebar__part__title">Previously Played</div>
                    <div className="Sidebar__part__content"></div>
                </div>
            </div>
        </section>
    )
}

export default Sidebar;