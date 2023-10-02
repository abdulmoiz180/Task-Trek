import { Card } from 'antd';
import EditSvg from '../assets/images/edit-pencil 1.svg';
import MoreSvg from '../assets/images/more.svg';
import dotSvg from '../assets/images/Ellipse 12.svg';
import MenuBar from '../layout/MenuBar';
import Sidebar from './sidebar/Sidebar';
import { UserContext } from './userprofile';
import { useContext } from 'react';


const Project = () => {
    // const name = useContext(UserContext)
    // console.log(name)
    const cardInfo = [
        { title: "Dashboard", status: "Active", start_Date: "20-09-2023", members: "Anum, Amna, Moiz", progress: "60%" },
        { title: "Sidebar", status: "Completed", start_Date: "19-09-2023", members: "Amna", progress: "100%" },
        { title: "Navbar", status: "Active", start_Date: "25-09-2023", members: "Anum", progress: "10%" },
        { title: "Report page", status: "Inactive", start_Date: "27-09-2023", members: "Anum", progress: "0%" },
        { title: "Module Page", status: "Inactive", start_Date: "28-08-2023", members: "Anum", progress: "0%" },
    ]

    const cardRender = (card, index) => {
        return (
            <div className="card-render" >
                <Card key={index}>
                    <div className="card-header">
                        <h1>{card.title}</h1>
                        <div className="icon">
                            <span> <img src={EditSvg} alt="edit icon" /> </span>
                            <span><img src={MoreSvg} alt="edit icon" /></span>
                        </div>
                    </div>
                    <div className="status">
                        <span> <img src={dotSvg} alt='dot svg' /> </span>
                        <p>{card.status}</p>
                    </div>
                    <div className="startDate">
                        <p>Start Date</p>
                        <span>{card.start_Date}</span>
                    </div>
                    <div className="avatars">
                        <p>Members</p>
                        <span>{card.members}</span>
                    </div>
                    <div className="progress">
                        <p>Progress</p>
                        <span>{card.progress} </span>
                    </div>
                </Card>
            </div>
        );

    }
    return (
        <>
        <MenuBar />
            <Sidebar />
            <div className='card'>
                {cardInfo.map(cardRender)}
            </div>
        </>
    );
}
export default Project;