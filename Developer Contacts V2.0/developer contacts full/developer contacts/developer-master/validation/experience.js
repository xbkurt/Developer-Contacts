const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Job title field is required';
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  const fromDate = new Date(data.from);
  const toDate = new Date(data.to);
  
  if(fromDate.getTime() > toDate.getTime()){
    errors.from = 'From date must be before than To date';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
