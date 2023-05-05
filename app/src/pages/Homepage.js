import { Grid, Paper } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect, Fragment } from "react";
import TextField from '@mui/material/TextField';


export default function App() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadMoreData();
  }, []);

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
      <TextField size="small" margin="normal" id="outlined-basic" label="Outlined" variant="outlined" />
      <InfiniteScroll
        dataLength={items.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
      >
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Paper>{item}</Paper>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Fragment>
  );
}

// 模拟异步加载数据
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newData = Array.from({ length: 10 }, (_, index) => `Item ${index}`);
      resolve(newData);
    }, 1000);
  });
};
