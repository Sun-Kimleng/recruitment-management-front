import { Link, NavLink } from 'react-router-dom';
import { category } from './category';
import './sidebar.css';
import {AnimatePresence, motion} from 'framer-motion';
import {useDispatch, useSelector} from 'react-redux'
import { getTriggerLeftBar, setTriggerLeftBar, setTriggerLeftBarFalse } from '../../../features/adminSlice/adminSlice';
import { useEffect, useRef, useState } from 'react';
import { faXmark} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = () => {
    const dispatch = useDispatch();
    const isOpenLeftBar= useSelector(getTriggerLeftBar);
    const refLeftBar = useRef(null);

    const triggerLeftBarVariant = {
        'show': {
            x: 0,
            transition: {
                duration: 0.4,
                type: 'tween'
            } 
        },

        'hide': {
            x: '-300px' 
        },

        'invisible': {
            x: '-300px',
            transition: {
                duration: 0.4,
                type: 'tween'
            }
        } 
    }

    const [width1366, setWidth1366] = useState(
        window.matchMedia('(max-width: 1366px)').matches
    );

    useEffect(()=>{
        window
        .matchMedia("(max-width: 1366px)")
        .addEventListener('change', e => setWidth1366( e.matches ));
    }, []);

    //click outside to close sidebar
    useEffect(()=>{ 

        const handleClickOutside = (e)=>{
            
            if(refLeftBar.current && !refLeftBar.current.contains(e.target)){
                dispatch(setTriggerLeftBarFalse(true));
            }

           
        }

        document.addEventListener('mousedown', handleClickOutside, true);

        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside, true)
        }

    }, [refLeftBar]);

    if (width1366){
        return ( 
            <div className={isOpenLeftBar?'':'sidebar-mini-parent'} >
                 <AnimatePresence>
                 {!isOpenLeftBar && 
                 <motion.div
                 ref={refLeftBar}
                 className={isOpenLeftBar?'sidebar':'sidebar-mini'}
                    variants={triggerLeftBarVariant}
                    initial='hide'
                    animate='show'
                    exit='invisible'
                 >
                   <div className="sidebar-container"><br />
                   <div className='close-trigger'><FontAwesomeIcon onClick={()=>dispatch(setTriggerLeftBarFalse(true))} style={{fontSize: '30px', color: 'white', alignItems: 'right', cursor: 'pointer'}} icon={faXmark} /></div>
                    {category.map((cate, index)=>(<div key={index}>
                        <div className="my-section-title">{cate.section}</div>
                        
                        {cate.item.map((item, index)=>(
                        <div className="my-section-item" key={index}>
                  
                            <div onClick={()=>setTriggerLeftBarFalse(true)} className="my-item" key={index}><NavLink className="my-navlink" to={`/admin/${item.toLowerCase()}`}>{item}</NavLink></div>
                            
                        </div>
        
                            ))
                        }
                        </div>
                        ))
                    }
                        </div>
                    </motion.div>}
                    </AnimatePresence>
                </div>
             );
    }else{
        return ( 
            <div className={isOpenLeftBar?'':'sidebar-mini-parent'} onClick={()=>dispatch(setTriggerLeftBarFalse())}>
                 <div
                 className={isOpenLeftBar?'sidebar':'sidebar-mini'}
                    
                 >
                   <div className="sidebar-container"><br />
                    {category.map((cate, index)=>(<div key={index}>
                        <div className="my-section-title">{cate.section}</div>
                        
                        {cate.item.map((item, index)=>(
                        <div className="my-section-item" key={index}>
                  
                            <div className="my-item" key={index}><NavLink className="my-navlink" to={`/admin/${item.toLowerCase()}`}>{item}</NavLink></div>
                            
                        </div>
        
                            ))
                        }
                        </div>
                        ))
                    }
                        </div>
                    </div>
                </div>
             );
    }

    
}
 
export default Sidebar;