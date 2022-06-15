import { Link, NavLink } from 'react-router-dom';
import { category } from './category';
import './sidebar.css'

const Sidebar = () => {
    return ( 
        <div className="sidebar">
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
     );
}
 
export default Sidebar;