exports.isValid = (errors,response) => {
 if (!errors.isEmpty()) {
  response.status(INVALID_REQUEST_CODE).json({ errors: errors.array() });
  return true;
 }
 return false;
};
