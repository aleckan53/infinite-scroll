import React, { useState, useEffect } from 'react';

export default function InfiniteList(props) {

  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    setLoadMore(false);
    getData();
  }, [loadMore]);


  useEffect(() => {
    const list = document.getElementById('list')
    if(props.scrollable) {   
      // list has fixed height
      list.addEventListener('scroll', (e) => {
        const el = e.target;
        if(el.scrollTop + el.clientHeight === el.scrollHeight) {
          setLoadMore(true);
        }
      })  
    } else {  
      // list has auto height   
      window.addEventListener('scroll', () => {
        if (window.scrollY + window.innerHeight === list.clientHeight + list.offsetTop) {
          setLoadMore(true);
        }
      })
    }
  }, []);


  const getData = () => {
    fetch('https://dog.ceo/api/breeds/image/random/25')
      .then(res => {
        return !res.ok 
        ? res.json().then(e => Promise.reject(e)) 
        : res.json();
      })
      .then(res => {
        props.setState([...props.state, ...res.message]);
      });
  };

  return (
    <ul id='list'>
      { props.state.map((img, i) => <li style={{backgroundImage: `url(${img})`}} key={i}/>) }
    </ul>
  );
};