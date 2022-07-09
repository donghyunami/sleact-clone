import axios from 'axios';

const fetcher = (url: string) =>
  axios
    .get(url, {
      withCredentials: true,
    })
    .then((res) => res.data);

// swr이 post 요청이 가능하다
// const fetcherPost = (url: string) =>
//   axios
//     .post(url, {
//       withCredentials: true,
//     })
//     .then((res) => res.data);

export default fetcher;
