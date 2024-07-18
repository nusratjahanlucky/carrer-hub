import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getStoredJobApplication } from "../../Utility/localstorage";
import { Helmet } from "react-helmet-async";

const AppliedJobs = () => {
    const jobs = useLoaderData();

    const [AppliedJobs, setAppliedJobs] = useState([]);
    const [displayJobs,setDisplayJobs] = useState([]);

    const handleJobsFilter = filter =>{
        if(filter === 'all'){
            setDisplayJobs(AppliedJobs);
        }
        else if(filter === 'remote'){
            const remoteJobs = AppliedJobs.filter(job => job.remote_or_onsite === 'Remote');
            setDisplayJobs(remoteJobs);
        }
        else if(filter === 'onsite'){
            const onsiteJobs = AppliedJobs.filter(job => job.remote_or_onsite === 'Remote');
            setDisplayJobs(onsiteJobs);
        }
    }

    useEffect(() => {
        const storedJobIds = getStoredJobApplication();
        if (jobs.length > 0) {
            //const jobsApplied = jobs.filter(job => storedJobIds.includes(job.id))

            const jobsApplied = [];
            for (const id of storedJobIds) {
                const job = jobs.find(job => job.id === id);
                if (job) {
                    jobsApplied.push(job)
                }
            }
            setAppliedJobs(jobsApplied);
            setDisplayJobs(jobsApplied);
            //console.log(jobs,storedJobIds,jobsApplied);
        }
    }, [jobs])
    return (
        <div>
            <Helmet>
                <title>Carrer | Applied Jobs</title>
            </Helmet>
            <h2 className="text-2xl">Jobs i applied:{AppliedJobs.length}</h2>
            <details className="dropdown">
                <summary className="m-1 btn">open or close</summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li onClick={()=> handleJobsFilter('all')}><a>All</a></li>
                    <li onClick={()=> handleJobsFilter('remote')}><a>Remote</a></li>
                    <li onClick={()=> handleJobsFilter('onsite')}><a>onsite</a></li>
                </ul>
            </details>
            <ul>
                {
                    displayJobs.map(job => <li key={job.id}><span>{job.job_title}{job.company_name}:{job.remote_or_onsite}</span></li>)
                }
            </ul>
        </div>
    );
};

export default AppliedJobs;