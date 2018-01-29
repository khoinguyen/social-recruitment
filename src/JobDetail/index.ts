import qs from 'query-string';
import {getReferralById, getJobByReferral, generateShareUrl} from './data-models';
import parse from 'url-parse';

const ref = (search) => {
  const query = qs.parse(search);
  return query.ref
    ? query.ref
    : "";
}

const formData = (form) => {
  return {
    name: form
      .find('.input-name')
      .val(),
    email: form
      .find('.input-email')
      .val()
  }
}
const share = (event) => {
  event.preventDefault();
  const data = formData($("#share-form"));
  generateShareUrl(data).then( (ref) => {
    let parsed = parse('JobDetail.html', location, false);
    console.log(parsed);
    parsed.query = '?ref=' + ref.id
    let url = parsed.toString();
    $('.link-shareable-url').attr('href', url).text(url);
  });
}

const apply = (event) => {
  event.preventDefault();
  const data = formData($("#apply-form"));
  console.log('apply' + JSON.stringify(data));
}

export default() => {
  const _ref = ref(location.search);

  getReferralById(_ref)
    .then(getJobByReferral)
    .then((job) => {
      console.log(job);
      const data = job.data();
      const title = data.title;
      const url = data.url;

      $('.job-title').text(title);
      $(".job-url")
        .attr('href', url)
        .text(title);

      $('.gen-share-btn').on('click', share);
      $('.confirm-apply-btn').on('click', apply);
    });
}
