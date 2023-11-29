const sequelize = require("../config/hrmsDb");
const getEmpAttendence = async (data) => {
  const record = await sequelize.query(
    `select a.inTime as startTime ,a.outTime as outTime ,e.title, e.first_name as firstName,
    e.middle_name as middleName, e.last_name as lastName,a.attendence_date
    as date, a.status from attendance a right join 
    employees e on e.id = a.employee_id where e.company_id =${data.user.company_id} limit ${data.start}, ${data.limit}
    `,
    { type: sequelize.QueryTypes.SELECT }
  );
  const totalCount = await sequelize.query(
    `select count(e.id) as count from attendance a right join 
    employees e on e.id = a.employee_id where e.company_id =${data.user.company_id};
    `,
    { type: sequelize.QueryTypes.SELECT }
  );


  return {record,totalCount};
};

module.exports = getEmpAttendence;
