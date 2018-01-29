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
        this.$referralAlert.find('a.ref-url').text(refURL).attr('href', refURL);
        this.$referralAlert.show();
    }

    submitData = (data: [
        { 'name': "username", 'value': string },
        { 'name': "title", 'value': string },
        { 'name': "url", 'value': string },
        { 'name': "bounty", 'value': string }]) => {
        
        this.submitJob(data);

    };

    submitJob(data) {

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

        this.jobCollectionRef.add(postDataObj)
            .then((docRef) => {
                const randomJobID = docRef.id;
                this.submitReferral(data, randomJobID);
                console.log('Job added:', docRef);
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

    }

    submitReferral(data, randomJobID) {

        let postDataObj = {
            job: "", trackback: [], type: "system", username: ""
        };

        // Simple validation
        if (!data[0].value) {
            console.log('Data is empty');
            return;
        }

        const jobPath = `jobs/${randomJobID}`;

        data.forEach(item => {
            if (item.name === "username") postDataObj["username"] = item.value;
        });

        postDataObj["job"] = db.collection('jobs').doc(randomJobID);

        this.referralCollectionRef.add(postDataObj)
            .then((docRef) => {
                const randomReferralID = docRef.id;
                this.showRefURL(randomReferralID);
                console.log('Referral added:', docRef);
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