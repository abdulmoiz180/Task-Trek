import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../utils/constants/Firebase';
import { List, Avatar, Input, Card, Typography, Pagination, Alert } from 'antd';
import './Member.css';
import { UserOutlined } from '@ant-design/icons';
import ContentLoader from '../contentLoader/ContentLoader';

const { Search } = Input;

const Member = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('firstName');
  const [filterRole, setFilterRole] = useState('');
  const [membersPerPage] = useState(5);

  const [filteredByRoleUsers, setFilteredByRoleUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollection);
        const userData = querySnapshot.docs.map((doc) => doc.data());
        setUsers(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users: ', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.firstName && user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  useEffect(() => {
    setFilteredByRoleUsers(
      filteredUsers.filter((user) => (filterRole ? user.role === filterRole : true))
    );
  }, [filteredUsers, filterRole]);

  const start = (currentPage - 1) * membersPerPage;
  const end = currentPage * membersPerPage;

  const paginatedUsers = filteredByRoleUsers.slice(start, end);

  const sortedUsers = [...paginatedUsers].sort((a, b) => {
    return a[sortBy].localeCompare(b[sortBy]);
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (key) => {
    setSortBy(key);
  };

  const handleRoleFilter = (role) => {
    setFilterRole(role);
    setCurrentPage(1);
  };

  return (
    <div>
      {loading ? (
        <ContentLoader />
      ) : (
        <div className='members-container'>
          <Search
            placeholder="Search members..."
            onSearch={handleSearch}
            className='members-search'
            style={{ width: 400 }}
          />
          <List
            itemLayout="vertical"
            dataSource={sortedUsers}
            renderItem={(user) => (
              <List.Item>
                <Card className='members-card'>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      size={50}
                      style={{
                        backgroundColor: '#4743e0',
                        color: 'white',
                        marginRight: 16,
                      }}
                    >
                      <UserOutlined />
                    </Avatar>
                    <div className="user-details">

                      <Typography.Title level={4} className='members-name'>
                        {user.firstName}
                      </Typography.Title>
                    </div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            total={filteredByRoleUsers.length}
            pageSize={membersPerPage}
            style={{ marginTop: '20px', textAlign: 'center', color: '#4743e0' }}
            itemRender={(current, type, originalElement) => {
              if (type === 'prev' || type === 'next') {
                return <a style={{ color: '#4743e0' }}>{originalElement}</a>;
              }
              if (type === 'page') {
                return <a style={{ color: '#4743e0' }}>{current}</a>;
              }
              return originalElement;
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Member;
