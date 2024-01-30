import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Layout.css';
import web3 from '../utils/InitWeb3';
import { Layout, Menu, Typography } from 'antd';
import DrawTable from '../components/DrawTable';
import { DollarTwoTone, FolderOpenTwoTone, ProfileTwoTone } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;

class Project extends PureComponent {
    getDraws = async () => {
        console.log('get draw');
        const projectContract = this.state.projectInfo.contract;
        const drawNum = await projectContract.methods.getUsageNum().call({
            from: this.props.currentAccount,
        });
        const newDrawsInfo = [];
        for (let i = 0; i < drawNum; i++) {
            const drawInfo = await projectContract.methods.getUsageDetail(i).call({
                from: this.props.currentAccount,
            });
            drawInfo.usageAmount_eth = web3.utils.fromWei(drawInfo.usageAmount) + 'ETH';
            drawInfo.usageAmount += 'WEI';
            drawInfo.usageStartTime = new Date(Number(drawInfo.usageStartTime) * 1000).toLocaleString("en-GB");
            if (drawInfo.usageEndTime === "0") drawInfo.usageEndTime = '-';
            else drawInfo.usageEndTime = new Date(Number(drawInfo.usageEndTime) * 1000).toLocaleString("en-GB");
            const total = Number(this.state.projectInfo.projectTotal.substring(0, this.state.projectInfo.projectTotal.length - 3));
            drawInfo.approval = Number(drawInfo.usageApprovalContribution) / total * 100 + '%';
            drawInfo.disapproval = Number(drawInfo.usageDisapprovalContribution) / total * 100 + '%';
            drawInfo.creator = this.state.projectInfo.projectCreator;
            if (drawInfo.usageState === "0") drawInfo.usageState = 'Ongoing';
            else if (drawInfo.usageState === "1") drawInfo.usageState = 'Failed';
            else if (drawInfo.usageState === "2") drawInfo.usageState = 'Succeeded';
            else if (drawInfo.usageState === "3") drawInfo.usageState = 'Paidoff';
            drawInfo.key = i + 1;
            newDrawsInfo.push(drawInfo);
        }
        this.setState({ drawsInfo: newDrawsInfo });
    }

    vote = async (index, ballot) => {
        try {
            console.log('vote');
            console.log(index);
            const projectContract = this.state.projectInfo.contract;
            await projectContract.methods.vote(ballot, index).send({
                from: this.props.currentAccount,
                gas: '3000000',
            })
            alert('Vote Succeeded');
        } catch (e) {
            console.log(e);
            alert('Vote Failed');
        }
        this.getDraws();
    }

    constructor() {
        super();
        this.state = {
            projectInfo: {},
            drawsInfo: [],
        }
    }

    async componentDidMount() {
        await this.props.refreshAccount();
        await this.props.getProjects();
        this.setState({
            projectInfo: this.props.projectsInfo[this.props.match.params.index],
        })
        await this.getDraws();
    }

    render() {
        return (
            <Layout className="layout">
                <Header className='header'>
                    <Menu style={{ background: 'rgb(23, 32, 59)' }} mode="horizontal" defaultSelectedKeys={['0']} >
                        <Menu.Item key="1" icon={<FolderOpenTwoTone />}>
                            <Link style={{ color: 'white' }} to="/">All Projects</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<ProfileTwoTone />}>
                            <Link style={{ color: 'white' }} to="/mine">My Projects</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<DollarTwoTone />}>
                            <Link style={{ color: 'white' }} to="/contributed">My Contributions</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '50px 50px' }}>
                    <div className="site-layout-content">
                        <Typography>
                            <Title>{this.state.projectInfo.projectTitle}</Title>
                        </Typography>
                        <DrawTable
                            currentAccount={this.props.currentAccount}
                            drawsInfo={this.state.drawsInfo}
                            projectInfo={this.state.projectInfo}
                            vote={this.vote}
                        ></DrawTable>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default withRouter(Project);
