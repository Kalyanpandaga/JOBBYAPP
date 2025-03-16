import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li className="job-item">
      <Link to={`jobs/${id}`} className="job-item-link">
        <div className="company-details-section">
          <div className="company-logo-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
          </div>
          <div className="title-with-rating-container">
            <h1 className="job-title"> {title} </h1>
            <div className="rating-container">
              <FaStar className="star-icon" />
              <p className="rating"> {rating} </p>
            </div>
          </div>
        </div>
        <div className="job-basic-details-section">
          <div className="location-container">
            <MdLocationOn className="location-icon" />
            <p className="location"> {location}</p>
          </div>
          <div className="employment-type-container">
            <BsBriefcaseFill className="employment-type-icon" />
            <p className="employment-type"> {employmentType}</p>
          </div>
          <p className="package-details"> {packagePerAnnum} </p>
        </div>
        <hr className="job-card-horizontal-line" />
        <div className="job-description-section">
          <h1 className="description-heading"> Description </h1>
          <p className="job-description"> {jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
