import { Link, NavLink } from 'react-router-dom';
import { category } from './category';
import './sidebar.css';
import {AnimatePresence, motion} from 'framer-motion';
import {useDispatch, useSelector} from 'react-redux'
import { getTriggerLeftBar, setTriggerLeftBar, setTriggerLeftBarFalse } from '../../../features/adminSlice/adminSlice';
import { useEffect, useRef, useState } from 'react';
import { faXmark, faCaretDown, faCaretRight,faCodeFork, faChartLine} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fontWeight } from '@mui/system';


const Sidebar = () => {
    //Redux Toolkit
    const dispatch = useDispatch();
    const isOpenLeftBar= useSelector(getTriggerLeftBar);
    const refLeftBar = useRef(null);

    //All States
    const [isTriggerSection, setIsTriggerSection] = useState('');

    //Handle Trigger Section
    const handleTriggerSection = (index)=>{
        

        if(isTriggerSection === index ){
            setIsTriggerSection('');
        }else if(isTriggerSection !== index ){
            setIsTriggerSection(index);
        }
        else{
            setIsTriggerSection(index);
        }

    }

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
                   <div className='close-trigger'><FontAwesomeIcon onClick={()=>dispatch(setTriggerLeftBarFalse(true))} style={{fontSize: '30px', color: 'black', alignItems: 'right', cursor: 'pointer', padding: '0px 10px'}} icon={faXmark} /></div>
                    <br />
                    {category.map((cate, index)=>(
                        <div key={index}>
                        <div onClick={(e)=>handleTriggerSection(index)} className="my-section-title" style={{textDecoration:'none',padding: '0px 10px', cursor:'pointer'}}>
                            <><div style={{}}>
                                <FontAwesomeIcon style={{color: cate.color}}  icon={cate.logo} />
                            </div></>
                                
                                {isTriggerSection === index ?<div className='cate-title' style={{fontWeight: 'bold'}}><div>{cate.title}</div></div>
                                :<div className='cate-title'><div>{cate.title}</div></div>
                                }
                            <>
                                {isTriggerSection === index ? 
                                <FontAwesomeIcon style={{color: 'black', marginTop: '3px'}}  icon={faCaretDown} />
                                :<FontAwesomeIcon style={{color: 'black' , marginTop: '3px'}}  icon={faCaretRight} />
                                }
                            </>
                        </div>
                        {isTriggerSection === index && <>
                        {cate.items.map((item, index)=>(
                        <div className="my-section-item" key={index} style={{}}>
                            <div onClick={()=>setTriggerLeftBarFalse(true)}  key={index}>
                                
                                <NavLink to={item.link} className="my-item">
                                <>
                                <div style={{}} className="my-item-child" >
                                    <FontAwesomeIcon style={{color: item.color, fontSize: '16px'}}  icon={item.logo} />
                                    {' '}<div style={{width:'184px', marginTop: '-3px', color:'black'}}>{item.title}</div>
                                </div>
                                </>
                                </NavLink>
                            </div>
                        </div>
                            
                            ))
                        }</>}<div style={{width: '20px', height:'5px', backgroundColor: 'tranparent'}}></div>
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
                 className={isOpenLeftBar?'sidebar':'sidebar-mini'}>
                   <div className="sidebar-container"><br />
                   {category.map((cate, index)=>(
                        <div key={index}>
                        <div onClick={(e)=>handleTriggerSection(index)} className="my-section-title" style={{textDecoration:'none',padding: '0px 10px', cursor:'pointer'}}>
                            <><div style={{}}>
                                <FontAwesomeIcon style={{color: cate.color}}  icon={cate.logo} />
                            </div></>
                                
                                {isTriggerSection === index ?<div className='cate-title' style={{fontWeight: 'bold'}}><div>{cate.title}</div></div>
                                :<div className='cate-title'><div>{cate.title}</div></div>
                                }
                            <>
                                {isTriggerSection === index ? 
                                <FontAwesomeIcon style={{color: 'black', marginTop: '3px'}}  icon={faCaretDown} />
                                :<FontAwesomeIcon style={{color: 'black', marginTop: '3px'}}  icon={faCaretRight} />
                                }
                            </>
                        </div>
                        {isTriggerSection === index && <>
                        {cate.items.map((item, index)=>(
                        <div className="my-section-item" key={index} style={{}}>
                            <div onClick={()=>setTriggerLeftBarFalse(true)}  key={index}>
                                
                                <NavLink to={item.link} className="my-item">
                                <>
                                <div style={{}} className="my-item-child" >
                                    <FontAwesomeIcon style={{color: item.color, fontSize: '16px'}}  icon={item.logo} />
                                    {' '}<div style={{width:'184px', marginTop: '-3px', color:'black'}}>{item.title}</div>
                                </div>
                                </>
                                </NavLink>
                            </div>
                        </div>
                            
                            ))
                        }</>}<div style={{width: '20px', height:'5px', backgroundColor: 'tranparent'}}></div>
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