import React, {Component} from "react";
import '../css/App.css';
import '../css/index.css';

import { FaTimes } from 'react-icons/fa'
import Moment from "react-moment";


class ListAppointments extends Component {

    render() {
        return (
            <div className="appointment-list item-list mb-3">
                {
                this.props.appnts.map(item => (
                    <div className="pet-item col media py-3" key={item.aptId}>
                        <div className="mr-3">
                            <button className="pet-delete btn btn-sm btn-danger"
                            onClick={() => {this.props.deleteAppointment(item)}}>
                                <FaTimes />
                            </button>
                        </div>

                        <div className="pet-info media-body">
                            <div className="pet-head d-flex">
                                <span className="pet-name" contentEditable suppressContentEditableWarning onBlur={e => this.props.updateAppointment('petName', e.target.innerText, item.aptId)}>{item.petName}</span>
                                <span className="apt-date ml-auto">
                                    <Moment 
                                        date={item.aptDate}
                                        parse="YYYY-MM-dd hh:mm"
                                        format="MMM-D h:mma"
                                    />
                                </span>
                            </div>

                            <div className="owner-name">
                                <span className="label-item" contentEditable suppressContentEditableWarning onBlur={e => this.props.updateAppointment('ownerName', e.target.innerText, item.aptId)}>Owner:
                                </span>
                                <span >{item.ownerName}</span>
                            </div>
                            <div className="apt-notes" contentEditable suppressContentEditableWarning onBlur={e => this.props.updateAppointment('aptNotes', e.target.innerText, item.aptId)}>{item.aptNotes}</div>
                        </div>
                    </div>
                ))};
            </div>
        );
    }
}

export default ListAppointments;
