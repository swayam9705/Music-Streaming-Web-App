import React from 'react';
import './Sidebar.css';
import ListItem from './ListItem';

import { useStateValue } from '../ContextManager';

const Sidebar = () => {

    const [ state, dispatch ] = useStateValue()

    return (
        <section className="Sidebar">
            <div className="Sidebar__title">Your Library</div>
            <div className="Sidebar__parts">
                <div className="Sidebar__part">
                    <div className="Sidebar__part__title">Previously Played</div>
                    <div className="Sidebar__part__content">
                        {
                            state.recents.length != 0 && 
                            state.recents.map(song => (
                                <ListItem song={song} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Sidebar;