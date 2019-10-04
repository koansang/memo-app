import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';

import Labels from './pages/Labels';
import Memos from './pages/Memos';
import Memo from './pages/Memo';
import { listLabel } from './modules/labels';

import 'antd/dist/antd.css';

const { Sider, Content } = Layout;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listLabel());
  }, [dispatch]);

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider collapsible={false} theme="light" style={{ margin: '20px 0' }} width={300}>
        <Route path="/" component={Labels} />
      </Sider>
      <Content style={{ margin: '20px 10px', display: 'flex', width: '100px' }}>
        <Route path="/labels/:label" component={Memos} />
        <Route path="/labels/:label/memos/:memo" component={Memo} />
      </Content>
    </Layout>
  );
}

export default App;
