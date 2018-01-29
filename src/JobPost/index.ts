import "./JobPost.scss";
import db from "../includes/firestore";

class JobPost {

    $form: any;
    $submitButton: any;
    $referralAlert: any;
    jobCollectionRef: any;
    referralCollectionRef: any;

    constructor() {
        this.initElements();
        this.initFormSubmission();
        console.log('JobPost constructed');
    }

    initElements() {

        this.$form = $('#jobPostForm');
        this.$submitButton = $('#submitButton');
        this.$referralAlert = $('#referralAlert');

        this.jobCollectionRef = db.collection('jobs');
        this.referralCollectionRef = db.collection('referrals');

    }

    getFormData = () => {
        return this.$form.serializeArray();
    };

    showRefURL(randomReferralID: string) {
        const refURL = `http://127.0.0.1:8887/JobDetail.html?ref=${randomReferralID}`;
        this.$referralAlert.find('a.ref-url').text(refURL).attr('href', refURL)
        this.$referralAlert.show();
    }

    submitData = (data: [
        { 'name': "username", 'value': string },
        { 'name': "title", 'value': string },
        { 'name': "url", 'value': string },
        { 'name': "bounty", 'value': string }]) => {

        const now: number = Date.now();
        const randomJobID: string = "jobID_" + now;
        const randomReferralID: string = "refID_" + now;

        this.submitJob(data, randomJobID);
        this.submitReferral(data, randomJobID, randomReferralID);
        this.showRefURL(randomReferralID)

    };

    submitJob(data, randomJobID) {

        let postDataObj = {
            status: "OPEN"
        };

        // Simple validation
        if (!data[0].value) {
            console.log('Data is empty');
            return;
        }

        data.forEach(item => {
            if (item.name === "title") postDataObj["title"] = item.value;
            if (item.name === "url") postDataObj["url"] = item.value;
            if (item.name === "bounty") postDataObj["bounty"] = item.value
        });

        this.jobCollectionRef.doc(randomJobID).set(postDataObj)
            .then(() => {
                console.log(randomJobID, postDataObj);
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

    }

    submitReferral(data, randomJobID, randomReferralID) {

        let postDataObj = {
            job: "", trackback: [], type: "system", username: ""
        };

        // Simple validation
        if (!data[0].value) {
            console.log('Data is empty');
            return;
        }

        const jobPath = `firestore.googleapis.com/project/jobrefer-cec74/database/(default)/documents/jobs/${randomJobID}`;

        data.forEach(item => {
            if (item.name === "username") postDataObj["username"] = item.value;
        });

        postDataObj["job"] = jobPath;

        this.referralCollectionRef.doc(randomReferralID).set(postDataObj)
            .then(() => {
                console.log(randomReferralID, postDataObj)
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

    }

    initFormSubmission() {
        const {$submitButton} = this;
        $submitButton.click((e) => {
            e.preventDefault();
            const currentData = this.getFormData();
            this.submitData(currentData);
        })

    }
}

export default new JobPost;