import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import './index.css'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedJobBasicDetailsData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedJobData = data => ({
    ...this.getFormattedJobBasicDetailsData(data),
    companyWebsiteUrl: data.company_website_url,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    packagePerAnnum: data.package_per_annum,
  })

  getJobData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedJobData = this.getFormattedJobData(fetchedData.job_details)
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(eachJob =>
        this.getFormattedJobBasicDetailsData(eachJob),
      )
      this.setState({
        jobData: updatedJobData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  JobItemDetailsView = () => {
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobData

    return (
      <div className="job-item-details-success-view-container">
        <div className="job-details-container">
          <div className="job-posted-company-info-section">
            <div>
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="job-details-company-logo"
              />
            </div>
            <div className="job-details-title-with-rating-container">
              <h1 className="job-details-title"> {title} </h1>
              <div className="job-details-rating-container">
                <FaStar className="job-details-star-icon" />
                <p className="job-details-rating"> {rating} </p>
              </div>
            </div>
          </div>
          <div className="job-details-basic-info-container">
            <div className="job-details-location-container">
              <MdLocationOn className="job-details-location-icon" />
              <p className="job-details-location"> {location}</p>
            </div>
            <div className="job-details-employment-type-container">
              <BsBriefcaseFill className="job-details-employment-type-icon" />
              <p className="job-details-employment-type"> {employmentType}</p>
            </div>
            <p className="job-details-package-details"> {packagePerAnnum} </p>
          </div>
          <hr className="job-details-horizontal-line" />

          <div className="heading-with-visit-link-container">
            <h1 className="job-details-attribute-heading"> Description </h1>
            <a className="visit-link" href={companyWebsiteUrl}>
              <div className="visit-link-container">
                <p className="visit-text"> Visit </p>
                <BiLinkExternal className="visit-link-icon" />
              </div>
            </a>
          </div>
          <p className="job-details-attribute-description"> {jobDescription}</p>

          <h1 className="job-details-attribute-heading"> Skills </h1>
          <ul className="skills-list">
            {skills.map(eachSkill => (
              <li className="skill-item" key={eachSkill.name}>
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="skill-image"
                />
                <p className="skill-name"> {eachSkill.name} </p>
              </li>
            ))}
          </ul>

          <h1 className="job-details-attribute-heading">Life At Company</h1>
          <div className="life-at-company-info">
            <p className="job-details-attribute-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading"> Similar Jobs </h1>
        <ul className="similar-jobs-list">
          {similarJobsData.map(eachJob => (
            <SimilarJobItem key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  onClickRetryButton = () => {
    this.getJobData()
  }

  renderFailureView = () => (
    <div className="job-item-details-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-item-details-failure-img"
      />
      <h1 className="job-item-details-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="job-item-details-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-item-details-retry-btn"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="job-item-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.JobItemDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          <div className="job-item-details-content">
            {this.renderJobDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default JobItemDetails
