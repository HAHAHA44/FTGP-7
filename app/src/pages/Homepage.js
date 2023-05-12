import { Button, Grid, Paper } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect, Fragment } from "react";
import BetThemeItem from "../components/BetThemeItem";
import { SearchBar } from "../components/SearchBar";
import { getGuessThemes } from "../eth/index";

export default function App() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    loadMoreData();
  }, []);


// Simulate async data
const fetchData = () => {
  return new Promise((resolve) => {
    getGuessThemes(itemCount, 20).then((res) => {
      setItemCount(itemCount + res.length);
      if (res.length < 20) {
        setHasMore(false);
      }
      resolve(res);
    })
    // setTimeout(() => {
    //   const newData = Array.from({ length: 10 }, (_, index) => ({
    //     name: `Will it rain tomorrow? ${index}`,
    //     participants: 20, 
    //     yesOdd: 4, 
    //     noOdd: 3, 
    //     noPool: 200000, 
    //     createTime: "September 14, 2016", 
    //     yesPool: 10000, 
    //     img: 'https://p3.ssl.qhimg.com/t01f7d210920c0c73bd.jpg'}));
    //   resolve(newData);
    // }, 1000);
  });
};

  const loadMoreData = async () => {
    const newItems = await fetchData();
    if (newItems.length === 0) {
      setHasMore(false);
      return;
    }
    setItems((prevItems) => [...prevItems, ...newItems]);
  };

  return (
    <Fragment>
      <SearchBar></SearchBar>
      {/* <InfiniteScroll
        dataLength={items.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
      > */}
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <BetThemeItem data={item}></BetThemeItem>
            </Grid>
          ))}
        </Grid>
        <Button style={{marginTop: 20}} onClick={loadMoreData} variant='outlined'>Load More</Button>
      {/* </InfiniteScroll> */}
    </Fragment>
  );
}

