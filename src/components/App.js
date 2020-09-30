import React, {Component} from 'react';
import {findIndex, without} from "lodash";

import '../css/App.css';
import AddAppointments from '../components/AddAppointments';
import ListAppointments from '../components/ListAppointments';
import SearchAppointments from '../components/SearchAppointments';

class App extends Component {

    constructor() {
        super();

        this.state = {
            formDisplay: false,
            appnts: [],
            lastIndex: 0,
            orderBy: 'petName',
            queryText: '',
            orderDir: 'asc'
        }

        this.deleteAppointment = this.deleteAppointment.bind(this);
        this.addAppointment = this.addAppointment.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.searchRecord = this.searchRecord.bind(this);
    }

    toggleForm = () => {
        this.setState({
            formDisplay: !this.state.formDisplay
        });
    };

    // Function to search for the appointment
    searchRecord = (query) => {
        this.setState({queryText: query})
    }

    //update a Record
    updateAppointment = (name, value, id) => {
        let tempApts = this.state.appnts;
        let aptIndex = findIndex(this.state.appnts, {
            aptId: id
        })

        tempApts[aptIndex][name] = value;
        this.setState({
            appnts: tempApts
        })
    }

    // Add a new Appointment
    addAppointment = (apt) => {
        let temApts = this.state.appnts;
        apt.aptId = this.state.lastIndex;
        temApts.unshift(apt);

        this.setState({
            myAppointments: temApts,
            lastIndex: this.state.lastIndex + 1
        });
    }

    // delete an appointment
    deleteAppointment(item) {
        let tempApts = this.state.appnts;
        tempApts = without(tempApts, item);

        this.setState({appnts: tempApts})
    }

    componentDidMount() {
        fetch('./data.json').then(res => res.json()).then(result => {
            const appointments = result.map(item => {
                item.aptId = this.state.lastIndex;
                this.setState({
                    lastIndex: this.state.lastIndex + 1
                });
                return item;
            })

            this.setState({appnts: appointments});

        });
    }

    render() { // filterting and sorting the list
        let order;
        let filteredAppointments = this.state.appnts;

        if (this.state.orderDir === 'asc') {
            order = 1;
        } else {
            order = -1;
        } 
        
        filteredAppointments = filteredAppointments.sort((a, b) => {
            if (a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()) {
                return -1 * order;
            } else {
                return 1 * order;
            }
        }).filter(each => {
            return (
                each['petName']
                .toLowerCase()
                .includes(this.state.queryText.toLowerCase()) ||
                each['ownerName']
                .toLowerCase()
                .includes(this.state.queryText.toLowerCase()) ||
                each['aptNotes']
                .toLowerCase()
                .includes(this.state.queryText.toLowerCase())
            )
        });

        return (
            <main className="page bg-white" id="petratings">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 bg-white">
                            <div className="container">
                                <div>
                                    <AddAppointments formDisplay={
                                            this.state.formDisplay
                                        }
                                        toggleForm={
                                            this.toggleForm
                                        }
                                        addAppointment={
                                            this.addAppointment
                                        }/>
                                    <SearchAppointments orderBy={
                                            this.state.orderBy
                                        }
                                        searchRecord={
                                            this.searchRecord
                                        }
                                        orderDir={
                                            this.state.orderDir
                                        }/>
                                    <ListAppointments appnts={filteredAppointments}
                                        deleteAppointment={
                                            this.deleteAppointment
                                        }
                                        updateAppointment = {
                                            this.updateAppointment}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default App;
