import qs from 'query-string';
import firestore from '../includes/firestore';
import $ from 'jquery';

const ref = (search) => {
  const query =  qs.parse(search);
  return query.ref ? query.ref : "";
}


const share = () => {
  console.log('share');
}

const apply = () => {
  console.log('apply');
}

export default () => {
  const _ref = ref(location.search);

  firestore.collection('referrals').doc(_ref).get().then((doc) => {
    doc.data().job.get().then( (job) => {
      const data = job.data();
      const title = data.title;
      const url   = data.url;

      $('.page-title').text(title);
      $(".job-url").attr('href', url).text(title);

      $(".apply-btn").on('click', apply);
      $(".share-btn").on('click', share);
    } );
  })
}
