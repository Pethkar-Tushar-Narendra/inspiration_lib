import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { Button, Form } from 'react-bootstrap';
import { Col, Row } from 'reactstrap';
import Chart from 'react-google-charts';
import UserEditToggle from '../Components/models/UserEditToggle';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const AdminDashboardScree = () => {
  const { state } = useContext(Store);
  const { inspiration_userInfo } = state;
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [pieArrayneed, setPieArrayNeed] = useState([]);

  const [categories, setCategories] = useState([]);
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/summary', {
          headers: { Authorization: `Bearer ${inspiration_userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        console.log(data);
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: err.response ? err.response.data.message : err.message,
        });
      }
    };
    fetchData();
  }, [inspiration_userInfo]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get('/api/summary', {
  //         headers: { Authorization: `Bearer ${inspiration_userInfo.token}` },
  //       });
  //     } catch (err) {
  //       setMessageTitle('Error...');
  //       setMessage(err.response ? err.response.data.message : err.message);
  //       setError(true);
  //     }
  //   };
  //   fetchData();
  // }, []);
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
    <div>
      <h1>Dashboard</h1>
      {loading ? (
        <>Raj</>
      ) : error ? (
        <>Raj</>
      ) : (
        <>
          <div className="my-3">
            <h2>Admission Chart</h2>
            {summary.dailyAdmissions.length === 0 ? (
              <MessageBox>No Sale</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="AreaChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ['Date', 'Sales'],
                  ...summary.dailyAdmissions.map((x) => [x._id, x.admissions]),
                ]}
              ></Chart>
            )}
          </div>
          <div className="my-3">
            <h2>Subscription over chart</h2>
            {summary.dailySubOver.length === 0 ? (
              <MessageBox>No Sale</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="AreaChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ['Date', 'Sales'],
                  ...summary.dailySubOver.map((x) => [x._id, x.admissions]),
                ]}
              ></Chart>
            )}
          </div>{' '}
          <div className="my-3">
            <h2>Categories</h2>
            {summary.studyCategories.length === 0 ? (
              <MessageBox>No Category</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ['Category', 'Products'],
                  ...summary.studyCategories.map((x) => [x._id, x.count]),
                ]}
              ></Chart>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboardScree;
