import { Table } from 'react-bootstrap';
import './job.css'

export const jobDetail = (created, updated, description) => {

    return ( 
    <div className="job-detail">
        <Table responsive="sm">
            <thead>
            <tr>
                <th>Created Date</th>
                <th>Last Updated</th>
                
            </tr>

            </thead>
            <tbody>
            <tr>
                <td>{created}</td>
                <td>{updated}</td>
            </tr>
            <tr>
                <td colSpan={4}>
                    <div className="detail">
                    <div className="description"><b>Full Description</b> <br/> {description}</div>
                    </div>
                </td>
                
            </tr>
            </tbody>
        </Table>
    </div> 
    );
}
 
