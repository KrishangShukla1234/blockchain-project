import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';
import { Layout, Menu } from 'antd';
import ProjectTable from '../components/ProjectTable';
import CreateProject from '../components/CreateProject';
import {
    FolderOpenTwoTone,
    DollarTwoTone,
    ProfileTwoTone
} from "@ant-design/icons";

const { Header, Content } = Layout;

class AllProjects extends PureComponent {
    async componentDidMount() {
        await this.props.refreshAccount();
        await this.props.getProjects();
        console.log(this.props);
    }

    render() {
        const {
            currentAccount,
            projectsInfo,
            createProject,
            createDraw,
            contribute,
            index
        } = this.props;
        return (
            <Layout className="layout">
                <Header className='header'>
                    <Menu style={{ background: 'rgb(23, 32, 59)' }} mode="horizontal" defaultSelectedKeys={[index]} >
                        <Menu.Item key="1" icon={<FolderOpenTwoTone />}>
                            <Link style={{ color: 'white' }} to="/">All Projects</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<ProfileTwoTone />}>
                            <Link style={{ color: 'white' }} to="/mine">My Projects</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<DollarTwoTone />}>
                            <Link style={{ color: 'white' }} to="/contributed">My Contributions</Link>
                        </Menu.Item>
                        <Menu.Item key="4" >
                            <CreateProject
                                currentAccount={currentAccount}
                                createProject={createProject}
                            ></CreateProject>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '50px 50px' }}>
                    <div className="site-layout-content">
                        <ProjectTable
                            currentAccount={currentAccount}
                            projectsInfo={projectsInfo}
                            createDraw={createDraw}
                            contribute={contribute}
                        ></ProjectTable>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default AllProjects;
