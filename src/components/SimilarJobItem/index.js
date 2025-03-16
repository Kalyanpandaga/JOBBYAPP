import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails
  return (
    <li className="similar-job-item">
      <div className="similar-job-company-details-section">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-company-logo"
        />

        <div className="similar-job-title-with-rating-container">
          <h1 className="similar-job-title"> {title} </h1>
          <div className="similar-job-rating-container">
            <FaStar className="similar-job-star-icon" />
            <p className="similar-job-rating"> {rating} </p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-description-heading"> Description </h1>
      <p className="similar-job-description"> {jobDescription}</p>
      <div className="similar-job-basic-details-section">
        <div className="similar-job-location-container">
          <MdLocationOn className="similar-job-location-icon" />
          <p className="similar-job-location"> {location}</p>
        </div>
        <div className="similar-job-employment-type-container">
          <BsBriefcaseFill className="similar-job-employment-type-icon" />
          <p className="similar-job-employment-type"> {employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
