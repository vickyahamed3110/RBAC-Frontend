import React, { useEffect, useState } from 'react';
import { acceptApi, getRequestData, rejectApi } from './apis';

const RequestList = () => {
    const [reqData, setReqData] = useState([])
    const [count, setCount] = useState(0)
    const getRequest = async() => {
    const data = await getRequestData()
    setReqData(data)
    }
    useEffect(() => {
        getRequest()
    }, [count])
  
  const onAccept = async(email) => {
    const data = await acceptApi(email)
    setCount(count + 1)
  }
  const onReject = async(email) => {
    const data = await rejectApi(email)
    setCount(count + 1)
  }
  return (
    <div className="container mt-4">
      <h2>User Requests</h2>
      <div className="list-group">
        {reqData.map((user) => (
          <div className="list-group-item d-flex justify-content-between align-items-center" key={user._id}>
            <span>{user.name}</span>
            <div>
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => onAccept(user.email)}
              >
                Accept
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onReject(user.email)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestList;
