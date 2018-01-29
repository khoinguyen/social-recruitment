import qs from 'query-string';
import firestore from '../includes/firestore';


const ref = (search) => {
  const query =  qs.parse(search);
  return query.ref ? query.ref : "";
}


export default () => {
  const _ref = ref(location.search);

  firestore.collection('referrals').doc(_ref).get().then((doc) => {
    console.log(doc.data());
  })
}