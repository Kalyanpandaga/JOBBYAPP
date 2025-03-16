import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'
import JobCard from '../JobCard'
import FiltersGroup from '../FiltersGroup'
import UserProfile from '../UserProfile'
import Header from '../Header'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    jobsData: {},
    employmentTypeIdsList: [],
    activeSalaryRangeId: '',
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, employmentTypeIdsList, activeSalaryRangeId} = this.state
    const employmentTypeQueryParamsValue = employmentTypeIdsList.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQueryParamsValue}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const updatedData = {
        jobs: fetchedData.jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          packagePerAnnum: eachJob.package_per_annum,
          rating: eachJob.rating,
          title: eachJob.title,
        })),
        total: fetchedData.total,
      }
      this.setState({
        jobsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = e => {
    this.setState({searchInput: e.target.value})
  }

  onClickSearchBtn = () => {
    this.getJobsData()
  }

  handleEmploymentTypeChange = (employmentTypeId, checked) => {
    this.setState(prevState => {
      const updatedEmploymentTypeIdsList = checked
        ? [...prevState.employmentTypeIdsList, employmentTypeId]
        : prevState.employmentTypeIdsList.filter(id => id !== employmentTypeId)

      return {employmentTypeIdsList: updatedEmploymentTypeIdsList}
    }, this.getJobsData)
  }

  handleSalaryRangeChange = salaryRangeId => {
    this.setState({activeSalaryRangeId: salaryRangeId}, this.getJobsData)
  }

  onClickRetryButton = () => {
    this.getJobsData()
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <>
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-btn"
          onClick={this.onClickSearchBtn}
        >
          <BsSearch />
        </button>
      </>
    )
  }

  renderJobsListView = () => {
    const {jobsData} = this.state
    const jobsList = jobsData.jobs
    const shouldShowJobsList = jobsList.length > 0

    return shouldShowJobsList ? (
      <ul className="jobs-list-view-container">
        {jobsList.map(eachJob => (
          <JobCard key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsListSection = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  renderProfileWithFiltersSection = () => (
    <>
      <UserProfile />
      <hr className="jobs-horizontal-line" />
      <FiltersGroup
        employmentTypesList={employmentTypesList}
        salaryRangesList={salaryRangesList}
        handleEmploymentTypeChange={this.handleEmploymentTypeChange}
        handleSalaryRangeChange={this.handleSalaryRangeChange}
      />
    </>
  )

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="jobs-content">
            <div className="profile-with-filters-section">
              <div className="mobile-search-input-container">
                {this.renderSearchInput()}
              </div>
              {this.renderProfileWithFiltersSection()}
            </div>
            <div className="jobs-list-section">
              <div className="desktop-search-input-container">
                {this.renderSearchInput()}
              </div>
              {this.renderJobsListSection()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
