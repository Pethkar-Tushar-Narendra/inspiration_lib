import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { Button, Form } from 'react-bootstrap';
import { Col, Row } from 'reactstrap';
import Chart from 'react-google-charts';
import UserEditToggle from '../Components/models/UserEditToggle';
import { Store } from '../Store';

const AdminDashboardScree = () => {
  const { state } = useContext(Store);
  const { inspiration_userInfo } = state;
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pieArrayneed, setPieArrayNeed] = useState([]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/summary', {
          headers: { Authorization: `Bearer ${inspiration_userInfo.token}` },
        });
        // setCategories(categories.data);
        // const { registered_users } = data;
        // setUsers(registered_users);
        // setLoading(false);
        // setPieArrayNeed(setPieArray());
      } catch (err) {
        setMessageTitle('Error...');
        setMessage(err.response ? err.response.data.message : err.message);
        setError(true);
      }
    };
    fetchData();
  }, []);
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState('');
  const toggle = () => setModal(!modal);
  var pieArray = [
    ['mart', 6],
    ['dasdas', 9],
  ];
  var numCategories = 0;
  const setPieArray = () => {
    for (var i = 0; i < categories.length; i++) {
      console.log(categories[i].field);
    }
    return pieArray;
  };
  return (
    <>
      <>
        <div>
          <span>mesmbers ===</span>
          {/* <span>{users.length}</span> */}
          {/* {console.log(categories)} */}
        </div>
        {/* <Chart
          width="100%"
          height="400px"
          chartType="AreaChart"
          loader={<div>Loading Chart...</div>}
          data={[
            ['Date', 'Sales'],
            // ...summary.dailyOrders.map((x) => [x._id, x.sales]),
          ]}
        ></Chart> */}
        {/* <Chart
          width="100%"
          height="400px"
          chartType="PieChart"
          loader={<div>Loading Chart...</div>}
          data={[
            ['Category', 'Products'],
            ...pieArrayneed.map((x) => [x[0], x[1]]),
          ]}
        ></Chart> */}
      </>
    </>
  );
};

export default AdminDashboardScree;
