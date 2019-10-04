import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Icon } from 'antd';
import { Link, matchPath } from 'react-router-dom';

import { addLabel } from '../modules/labels';
import { routerType } from '../types';
import AddLabel from '../components/Labels/AddLabel';
import styles from './Labels.module.scss';

function Labels(props) {
  const { history } = props;
  const match = matchPath(history.location.pathname, {
    path: '/labels/:label',
    exact: false,
  });
  const data = useSelector(state => state.labels);
  const dispatch = useDispatch();
  const handleDispatch = useCallback(
    title => {
      dispatch(addLabel(title));
    },
    [dispatch],
  );
  const { labels } = data;
  const defaultKey = match && match.params.label ? match.params.label : '0';

  if (labels.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Menu theme="light" style={{ flex: '1', overflowY: 'scroll' }} defaultSelectedKeys={[defaultKey]}>
        {labels.map(label => (
          <Menu.Item key={label['_id']}>
            <Link to={`/labels/${label['_id']}`}>
              <Icon type="container" />
              {`${label.title}(${label.memos.length})`}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
      <div className={styles.add}>
        <AddLabel dispatch={handleDispatch} />
      </div>
    </div>
  );
}

Labels.propTypes = {
  history: routerType.isRequired,
};

export default Labels;
