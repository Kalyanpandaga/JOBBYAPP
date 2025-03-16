import './index.css'

const FiltersGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    handleEmploymentTypeChange,
    handleSalaryRangeChange,
  } = props
  const onChangeEmploymentType = event => {
    const {value, checked} = event.target
    handleEmploymentTypeChange(value, checked)
  }

  const onChangeSalaryRange = event => {
    handleSalaryRangeChange(event.target.value)
  }

  const renderEmploymentTypes = () => (
    <div>
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filters-list">
        {employmentTypesList.map(employment => (
          <li
            key={employment.employmentTypeId}
            className="filter-item-container"
          >
            <input
              type="checkbox"
              id={employment.employmentTypeId}
              value={employment.employmentTypeId}
              onChange={onChangeEmploymentType}
            />
            <label
              htmlFor={employment.employmentTypeId}
              className="filter-label"
            >
              {employment.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryRanges = () => (
    <div>
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filters-list">
        {salaryRangesList.map(salary => (
          <li key={salary.salaryRangeId} className="filter-item-container">
            <input
              type="radio"
              id={salary.salaryRangeId}
              name="salaryRange"
              value={salary.salaryRangeId}
              onChange={onChangeSalaryRange}
            />
            <label htmlFor={salary.salaryRangeId} className="filter-label">
              {salary.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="filters-group-container">
      {renderEmploymentTypes()}
      <hr className="filter-group-horizontal-line" />
      {renderSalaryRanges()}
    </div>
  )
}

export default FiltersGroup
