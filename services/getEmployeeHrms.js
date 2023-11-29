const sequelize = require("../config/hrmsDb");
const getEmployeeHrms = async (data, start, limit,search) => {
  let searchQuery = `AND (first_name like '%${search}%' OR last_name like '%${search}%')`
  const record = await sequelize.query(
    `select id as employee_id, title, first_name as firstName,middle_name as middleName,last_name as lastName,emp_type as designation,emp_type as department,
    gender,date_of_joining as dateOfJoining,
    date_of_birth as dateOfBirth, work_email as email, mobile_no as mobile, company_id ,comm_address as address, emp_type as role
    from employees where company_id =${data.company_id} ${searchQuery} limit ${start},${limit}
    `,
    { type: sequelize.QueryTypes.SELECT }
  );

  const totalCount = await sequelize.query(
    `select count(id) as totalCount from employees where company_id =${data.company_id} ${searchQuery}
    `,
    { type: sequelize.QueryTypes.SELECT }
  );

  return {
    start,
    limit,
    totalCount: totalCount[0].totalCount,
    visible: false,
    users: record,
  };
  
};

module.exports = getEmployeeHrms;
