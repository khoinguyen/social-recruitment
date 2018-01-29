import db from '../includes/firestore';
import Promise from 'bluebird';

const dataStore = {
  referrals: {},
  jobs: {}
};

export const getJobByReferralId = async(refId) => {
  return getJobByReferral(getReferralById(refId));
}

const storeToCache = (key) => {
  return (data) => {
    dataStore[key][data.id] = data
    dataStore[key]['current'] = data;
    return data;
  }
}

export const getJobByReferral = async(ref) => {
  const r = await Promise.resolve(ref);

  return r
    .data()
    .job
    .get()
    .then(storeToCache('jobs'));
}

export const getReferralById = async(refId) => {
  if (!refId) 
    return Promise.resolve({});
  return db
    .collection('referrals')
    .doc(refId)
    .get()
    .then(storeToCache('referrals'));
}

export const generateShareUrl = (user) => {
  const currentRef = dataStore.referrals['current'];
  const trackback = currentRef.data().trackback;
  trackback.push(currentRef.ref);
  return db
    .collection("referrals")
    .add({
      job: dataStore.jobs['current'].ref,
      trackback: trackback,
      type: "referrer",
      username: user.name,
      email: user.email
    });
}

export const applyForJob = (user) => {
  const currentRef = dataStore.referrals['current'];
  const currentJob = dataStore.jobs['current'];

  const trackback = currentRef.data().trackback;
  trackback.push(currentRef.ref);

  return db
    .collection('applicants')
    .add( {
      job: currentJob.ref,
      referrals: trackback,
      name: user.name,
      email: user.email,
      status: "PENDING"
    });
}