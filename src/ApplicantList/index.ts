import qs from 'query-string';
import db from "../includes/firestore";

class ApplicantList {
    jobID: string;
    applicantCollectionRef: any;
    jobCollectionRef: any;

    constructor() {
        this.getCurrentJobID();
        this.applicantCollectionRef = db.collection('applicants');
        this.jobCollectionRef = db.collection('jobs');
        this.renderJobPage();
        $(".application-table").on('click', '.btn-accept', this.setApplicantAsAccepted.bind(this));
    }
    
    setApplicantAsAccepted(event){
        const btn = event.target;
        $(btn).text("Accepted");
        const row = $(btn).parents('.applicant-row');
        const id = row.attr('data-id');
        this.applicantCollectionRef.doc(id).set({
            status: 'ACCEPTED'
        }).then( () => {
            row.find('.status').text("ACCEPTED");
        });
        
    }
    
    
    getCurrentJobID() {
        const currentLocationSearch = location.search;
        const parsedOjb = qs.parse(currentLocationSearch);
        this.jobID = parsedOjb.id;
        return parsedOjb.id;
    }

    getJobById(id) {
        return this.jobCollectionRef.doc(id).get();
    }

    transformApplicant(applicantSnapshot) {
        const data = applicantSnapshot.data();
        return {
            id: applicantSnapshot.id,
            name: data.name,
            email: data.email,
            status: data.status
        };
    }

    renderApplicantRow({id, name, email, status}) {
        return `
        <tr data-id="${id}" class="applicant-row">
                <td>${name}</td>
                <td>${email}</td>
                <td class="status">${status}</td>
                <td>
                    <button class="btn btn-default btn-accept m-b-sm m-t-sm">Accept</button>
                </td>
            </tr>
        `
    }

    renderJobPage() {
        const id = this.getCurrentJobID();
        this.getJobById(id).then((job) => {
            const data = job.data();
            $(".job-title").text(data.title);
            this.getApplicantsByJob(job).then((applicants) => {
                const applicantsHTML = applicants.map(this.renderApplicantRow).join("");
                $('.application-table').append(applicantsHTML);
            });
        })
    }

    getApplicantsByJob(job) {
        const jref = job.ref;
        const transform = this.transformApplicant;
        return this.applicantCollectionRef.where('job', '==', jref)
            .get()
            .then((querySnapshot) => {
                let applicants = [];

                querySnapshot.forEach(function (applicant) {
                    // doc.data() is never undefined for query doc snapshots
                    applicants.push(transform(applicant));
                    // console.log(applicant.id, " => ", applicant.data());
                });
                return applicants;
            })

    }
}

export default new ApplicantList();
