import { faXmark, faChartLine, faCodeFork, faBriefcase, faJoint, faMap, faPeopleGroup, faPeopleRobbery, faPerson, faPeopleRoof, faPersonChalkboard, faBook, faFileContract, faIdCard, faGears, faUsersBetweenLines, faFileLines, faBorderAll, faCalendarCheck, faCheck, faFileCircleCheck, faTowerBroadcast, faCalendarDay, faPeopleLine, faFileCirclePlus, faUserGear, faCircleInfo, faBlog} from '@fortawesome/free-solid-svg-icons';

export const category = [
        //1
        {
        
            logo: faChartLine,
            title: 'DASHBOARD',
            color: '#42ba96',
            link: '/admin/dashboard',
            items: [

                {                 
                    logo: faChartLine,
                    color: '#1573ed',
                    title: 'Dashboard',
                    link: '/admin/dashboard'
                },
                {                 
                    logo: faUsersBetweenLines,
                    color: '#ad0794',
                    title: 'Developer',
                    link: '/admin/developer'
                },
            ]   
        },

        //2
        {
            logo: faMap,
            title: 'TEMPLATES',
            color: '#7c69ef',
            link:'/admin/templates',
            items: [

                {                 
                    logo: faFileLines,
                    color: '#bd290f',
                    title: 'Applications',
                    link: '/admin/applications'
                },
                {
                    logo: faBorderAll,
                    color: '#02c4b1',
                    title: 'Categories',
                    link: '/admin/categories'
                }
            ]   
        },
        //3
        {
            logo: faPeopleGroup,
            title: 'INTERVIEWS',
            color: '#c9024b',
            link:'/admin/interview',
            items: [

                {                 
                    logo: faCalendarCheck,
                    color: '#bd290f',
                    title: 'Scheduled',
                    link: '/admin/scheduled'
                },
                {                 
                    logo: faCheck,
                    color: '#0f6308',
                    title: 'Passed',
                    link: '/admin/passed'
                },
               
            ]   
        },

        //4
        {
            logo: faPersonChalkboard,
            title: 'RECRUITMENT',
            color: '#e6400e',
            link:'/admin/recruitment',
            items: [

                {                 
                    logo: faFileCircleCheck,
                    color: '#0c542f',
                    title: 'Applied',
                    link: '/admin/applied'
                },
                {                 
                    logo: faBriefcase,
                    color: '#8a0a2a',
                    title: 'Jobs',
                    link: '/admin/jobs'
                },
                {
                    logo: faTowerBroadcast,
                    color: '#2a0a8a',
                    title: 'Posting Job',
                    link: '/admin/posting_job'
                },
                {
                    logo: faBlog,
                    color: '#e30553',
                    title: 'Posts',
                    link: '/admin/posts'
                },
                {
                    logo: faCalendarDay,
                    color: '#e33302',
                    title: 'Calender',
                    link: '/admin/calender'
                }
            ]   
        },

        //5
        {
            logo: faPeopleRoof,
            title: 'CANDIDATES',
            color: '#0589fc',
            link:'/admin/candidates',
            items: [

                {                 
                    logo: faPeopleLine,
                    color: '#7b0ad1',
                    title: 'All Candidates',
                    link: '/admin/all_candidates'
                },
          
                ]   
            },

        //6
        {
            logo: faIdCard,
            title: 'REPORTS',
            color: '#5e0d3c',
            link:'/admin/report',
            items: [

                {                 
                    logo: faFileCirclePlus,
                    color: '#bd290f',
                    title: 'Create Report',
                    link: '/admin/create_report'
                },
                {
                    logo: faCodeFork,
                    color: '#0b8a68',
                    title: 'Print',
                    link: '/admin/print'
                }
            ]   
            },
            

            //7
            {
            logo: faGears,
            title: 'CONFIGURATION',
            color: '#2124c2',
            link:'/admin/configuration',
            items: [

                {                 
                    logo: faUserGear,
                    color: '#bd290f',
                    title: 'Manage User',
                    link: '/admin/manage_user'
                },
                {
                    logo: faCircleInfo,
                    color: '#870c3d',
                    title: 'Company Info',
                    link: '/admin/company_info'
                }
            ]   
        },
    
];