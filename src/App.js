import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import './App.css';
import web3 from './utils/InitWeb3';
import crowdfunding from './eth/CrowdFunding';
import project from './eth/Project';
import AllProjects from './page/AllProjects';
import Project from './page/Project';

class App extends Component {
    refreshAccount = async () => {
        const accounts = await web3.eth.getAccounts();
        this.setState({ currentAccount: accounts[0] });
    }
    
    compateStartTime = (a, b) => {
        return a.projectStartTime - b.projectStartTime;
    };
    
    getProjects = async () => {
        console.log('get projects');
        const newProjectsInfo = [];
        const projects = await crowdfunding.methods.getProjects().call();
        let cnt = 1;


        await Promise.all(
            projects.map(async projectAddress => {
                const projectInstance = project(projectAddress);
                const projectInfo = await projectInstance.methods.getDetail().call({
                    from: this.state.currentAccount,
                });
                projectInfo.contract = projectInstance;
                projectInfo.projectTarget_eth = web3.utils.fromWei(projectInfo.projectTarget) + 'ETH';
                projectInfo.projectBalance_eth = web3.utils.fromWei(projectInfo.projectBalance) + 'ETH';
                projectInfo.projectTotal_eth = web3.utils.fromWei(projectInfo.projectTotal) + 'ETH';
                projectInfo.projectContribution_eth = web3.utils.fromWei(projectInfo.projectContribution) + 'ETH';
                projectInfo.projectTarget += 'WEI';
                projectInfo.projectBalance += 'WEI';
                projectInfo.projectTotal += 'WEI';
                projectInfo.projectContribution += 'WEI';
                if (projectInfo.projectState === "0") {
                    let timestamp = (new Date()).getTime();
                    if (timestamp > Number(projectInfo.projectDeadline) * 1000) projectInfo.projectState = 'Failed';
                    else projectInfo.projectState = 'Ongoing';
                }
                else if (projectInfo.projectState === "1") projectInfo.projectState = 'Failed';
                else if (projectInfo.projectState === "2") projectInfo.projectState = 'Succeeded';
                else if (projectInfo.projectState === "3") projectInfo.projectState = 'Paidoff';
                projectInfo.projectStartTime = new Date(Number(projectInfo.projectStartTime) * 1000).toLocaleString("en-GB");
                projectInfo.projectDeadline = new Date(Number(projectInfo.projectDeadline) * 1000).toLocaleString("en-GB");
                if (projectInfo.projectCompleteTime === "0") projectInfo.projectCompleteTime = '-';
                else projectInfo.projectCompleteTime = new Date(Number(projectInfo.projectCompleteTime) * 1000).toLocaleString("en-GB");
                if (projectInfo.projectEndTime === "0") projectInfo.projectEndTime = '-';
                else projectInfo.projectEndTime = new Date(Number(projectInfo.projectEndTime) * 1000).toLocaleString("en-GB");
                projectInfo.key = cnt++;
                newProjectsInfo.push(projectInfo);
            })
        );
        // newProjectsInfo.sort(this.compateStartTime);
        this.setState({ projectsInfo: newProjectsInfo });
    }

    formatProjectInfo = async (projectInfo) => {
        projectInfo.projectTarget_eth = web3.utils.fromWei(projectInfo.projectTarget) + 'ETH';
        projectInfo.projectBalance_eth = web3.utils.fromWei(projectInfo.projectBalance) + 'ETH';
        projectInfo.projectTotal_eth = web3.utils.fromWei(projectInfo.projectTotal) + 'ETH';
        projectInfo.projectContribution_eth = web3.utils.fromWei(projectInfo.projectContribution) + 'ETH';
        projectInfo.projectTarget += 'WEI';
        projectInfo.projectBalance += 'WEI';
        projectInfo.projectTotal += 'WEI';
        projectInfo.projectContribution += 'WEI';
        if (projectInfo.projectState === "0") {
            let timestamp = (new Date()).getTime();
            if (timestamp > Number(projectInfo.projectDeadline) * 1000) projectInfo.projectState = 'Failed';
            else projectInfo.projectState = 'Ongoing';
        }
        else if (projectInfo.projectState === "1") projectInfo.projectState = 'Failed';
        else if (projectInfo.projectState === "2") projectInfo.projectState = 'Succeeded';
        else if (projectInfo.projectState === "3") projectInfo.projectState = 'Paidoff';
        projectInfo.projectStartTime = new Date(Number(projectInfo.projectStartTime) * 1000).toLocaleString("en-GB");
        projectInfo.projectDeadline = new Date(Number(projectInfo.projectDeadline) * 1000).toLocaleString("en-GB");
        if (projectInfo.projectCompleteTime === "0") projectInfo.projectCompleteTime = '-';
        else projectInfo.projectCompleteTime = new Date(Number(projectInfo.projectCompleteTime) * 1000).toLocaleString("en-GB");
        if (projectInfo.projectEndTime === "0") projectInfo.projectEndTime = '-';
        else projectInfo.projectEndTime = new Date(Number(projectInfo.projectEndTime) * 1000).toLocaleString("en-GB");
        return projectInfo;
    }

    getMyProjects = async () => {
        console.log('get projects');
        const newProjectsInfo = [];
        const projects = await crowdfunding.methods.getProjects().call();
        let cnt = 1;
        await Promise.all(
            projects.map(async projectAddress => {
                const projectInstance = project(projectAddress);
                const projectInfo = await projectInstance.methods.getDetail().call({
                    from: this.state.currentAccount,
                });
                if (projectInfo.projectCreator === this.state.currentAccount) {
                    projectInfo.contract = projectInstance;
                    projectInfo.projectTarget_eth = web3.utils.fromWei(projectInfo.projectTarget) + 'ETH';
                    projectInfo.projectBalance_eth = web3.utils.fromWei(projectInfo.projectBalance) + 'ETH';
                    projectInfo.projectTotal_eth = web3.utils.fromWei(projectInfo.projectTotal) + 'ETH';
                    projectInfo.projectContribution_eth = web3.utils.fromWei(projectInfo.projectContribution) + 'ETH';
                    projectInfo.projectTarget += 'WEI';
                    projectInfo.projectBalance += 'WEI';
                    projectInfo.projectTotal += 'WEI';
                    projectInfo.projectContribution += 'WEI';
                    projectInfo.projectStartTime = new Date(Number(projectInfo.projectStartTime) * 1000).toLocaleString("en-GB");
                    projectInfo.projectDeadline = new Date(Number(projectInfo.projectDeadline) * 1000).toLocaleString("en-GB");
                    if (projectInfo.projectCompleteTime === "0") projectInfo.projectCompleteTime = '-';
                    else projectInfo.projectCompleteTime = new Date(Number(projectInfo.projectCompleteTime) * 1000).toLocaleString("en-GB");
                    if (projectInfo.projectEndTime === "0") projectInfo.projectEndTime = '-';
                    else projectInfo.projectEndTime = new Date(Number(projectInfo.projectEndTime) * 1000).toLocaleString("en-GB");
                    if (projectInfo.projectState === "0") {
                        let timestamp = (new Date()).getTime();
                        if (timestamp > Number(projectInfo.projectDeadline) * 1000) projectInfo.projectState = 'Failed';
                        else projectInfo.projectState = 'Ongoing';
                    }
                    else if (projectInfo.projectState === "1") projectInfo.projectState = 'Failed';
                    else if (projectInfo.projectState === "2") projectInfo.projectState = 'Succeeded';
                    else if (projectInfo.projectState === "3") projectInfo.projectState = 'Paidoff';
                    projectInfo.key = cnt;
                    newProjectsInfo.push(projectInfo);
                }
                cnt++;
            })
        );
        // newProjectsInfo.sort(this.compateStartTime);
        this.setState({ myProjectsInfo: newProjectsInfo });
    }

    getContributedProjects = async () => {
        console.log('get projects');
        const newProjectsInfo = [];
        const projects = await crowdfunding.methods.getProjects().call();
        let cnt = 1;
        await Promise.all(
            projects.map(async projectAddress => {
                const projectInstance = project(projectAddress);
                const projectInfo = await projectInstance.methods.getDetail().call({
                    from: this.state.currentAccount,
                });
                if (projectInfo.projectContribution !== '0') {
                    projectInfo.contract = projectInstance;
                    projectInfo.projectTarget_eth = web3.utils.fromWei(projectInfo.projectTarget) + 'ETH';
                    projectInfo.projectBalance_eth = web3.utils.fromWei(projectInfo.projectBalance) + 'ETH';
                    projectInfo.projectTotal_eth = web3.utils.fromWei(projectInfo.projectTotal) + 'ETH';
                    projectInfo.projectContribution_eth = web3.utils.fromWei(projectInfo.projectContribution) + 'ETH';
                    projectInfo.projectTarget += 'WEI';
                    projectInfo.projectBalance += 'WEI';
                    projectInfo.projectTotal += 'WEI';
                    projectInfo.projectContribution += 'WEI';
                    projectInfo.projectStartTime = new Date(Number(projectInfo.projectStartTime) * 1000).toLocaleString("en-GB");
                    projectInfo.projectDeadline = new Date(Number(projectInfo.projectDeadline) * 1000).toLocaleString("en-GB");
                    if (projectInfo.projectCompleteTime === "0") projectInfo.projectCompleteTime = '-';
                    else projectInfo.projectCompleteTime = new Date(Number(projectInfo.projectCompleteTime) * 1000).toLocaleString("en-GB");
                    if (projectInfo.projectEndTime === "0") projectInfo.projectEndTime = '-';
                    else projectInfo.projectEndTime = new Date(Number(projectInfo.projectEndTime) * 1000).toLocaleString("en-GB");
                    if (projectInfo.projectState === "0") {
                        let timestamp = (new Date()).getTime();
                        if (timestamp > Number(projectInfo.projectDeadline) * 1000) projectInfo.projectState = 'Failed';
                        else projectInfo.projectState = 'Ongoing';
                    }
                    else if (projectInfo.projectState === "1") projectInfo.projectState = 'Failed';
                    else if (projectInfo.projectState === "2") projectInfo.projectState = 'Succeeded';
                    else if (projectInfo.projectState === "3") projectInfo.projectState = 'Paidoff';
                    projectInfo.key = cnt;
                    newProjectsInfo.push(projectInfo);
                }
                cnt++;
            })
        );
        // newProjectsInfo.sort(this.compateStartTime);
        this.setState({ contributedProjectsInfo: newProjectsInfo });
    }

    createProject = async (title, description, deadline, target) => {
        try {
            await crowdfunding.methods.createProject(
                title, description, Math.round(deadline / 1000), web3.utils.toWei(target.toString())
            ).send({
                from: this.state.currentAccount,
                gas: '3000000',
            });
            alert('Creation Succeeded');
        } catch (e) {
            console.log(e);
            alert('Creation Failed');
        }
        this.getProjects();
    }

    createDraw = async (index, title, description, amount) => {
        try {
            const projectContract = this.state.projectsInfo[index].contract;

            await projectContract.methods.createUsage(title, description, web3.utils.toWei(amount)).send({
                from: this.state.currentAccount,
                gas: '3000000',
            });
            alert('Creation Succeeded');
        } catch (e) {
            console.log(e);
            alert('Creation Failed');
        }
    }

    contribute = async (index, amount) => {
        try {
            console.log('contribute');
            const projectContract = this.state.projectsInfo[index].contract;
            await projectContract.methods.contribute().send({
                from: this.state.currentAccount,
                value: web3.utils.toWei(amount, 'ether'),
                gas: '3000000',
            });
            alert('Contribution Succeeded');
        } catch (e) {
            console.log(e);
            alert('Contribution Failed');
        }
        this.getProjects();
    }

    constructor() {
        super();
        this.state = {
            currentAccount: '',
            projectsInfo: [],
            myProjectsInfo: [],
            contributedProjectsInfo: [],
        };
    };

    async componentDidMount() {
        await this.refreshAccount();
        await this.getProjects();
        await this.getMyProjects();
        await this.getContributedProjects();
    }

    render() {
        const {
            currentAccount,
            projectsInfo,
            myProjectsInfo,
            contributedProjectsInfo,
        } = this.state;
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/project/:index" children={
                            <Project
                                currentAccount={currentAccount}
                                projectsInfo={projectsInfo}
                                getProjects={this.getProjects}
                                refreshAccount={this.refreshAccount}
                                createProject={this.createProject}
                                createDraw={this.createDraw}
                                contribute={this.contribute}
                            />
                        }>
                        </Route>
                        <Route exact path="/mine">
                            <AllProjects
                                currentAccount={currentAccount}
                                projectsInfo={myProjectsInfo}
                                getProjects={this.getMyProjects}
                                refreshAccount={this.refreshAccount}
                                createProject={this.createProject}
                                createDraw={this.createDraw}
                                contribute={this.contribute}
                                index='2'
                            />
                        </Route>
                        <Route exact path="/contributed">
                            <AllProjects
                                currentAccount={currentAccount}
                                projectsInfo={contributedProjectsInfo}
                                getProjects={this.getContributedProjects}
                                refreshAccount={this.refreshAccount}
                                createProject={this.createProject}
                                createDraw={this.createDraw}
                                contribute={this.contribute}
                                index='3'
                            />
                        </Route>
                        <Route path="/">
                            <AllProjects
                                currentAccount={currentAccount}
                                projectsInfo={projectsInfo}
                                getProjects={this.getProjects}
                                refreshAccount={this.refreshAccount}
                                createProject={this.createProject}
                                createDraw={this.createDraw}
                                contribute={this.contribute}
                                index='1'
                            />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;
