const sequelize = require("../config/hrmsDb");
const getEmpAttendence = async (data) => {
  const record = await sequelize.query(
    `SELECT e.id as employee_id,e.first_name,e.last_name,e.middle_name,e.emp_type,e.work_email,
    COUNT(CASE WHEN ea.status = 'present' THEN 1 END) AS present_count,
    COUNT(CASE WHEN ea.status = 'absent' THEN 1 END) AS absent_count,
    count(el.total_leave_days) as leave_count,
    count(h.holiday_date) as holiday_count,
    (SUM(CASE WHEN ea.status = 'present' THEN 1 ELSE 0 END) + COUNT(h.holiday_date)) - (COUNT(CASE WHEN ea.status = 'absent' THEN 1 END) + COUNT(el.total_leave_days)) AS effective_date
    FROM employees e
    left JOIN employee_attendence ea ON e.id = ea.emp_attendence_name and ea.attendence_date BETWEEN '2023-01-01' AND '2023-01-30'
    left join employee_leave el on el.emp_id = e.id and el.isApproved =1 and el.to_date >= '2023-05-01' AND el.from_date <= '2022-05-30'
    left join holiday_employees he on he.employee_id = e.id 
    left join holiday h on h.id = he.holiday_id and h.holiday_date <='2023-05-01' where e.company_id = ${data.company_id}
    GROUP BY e.id
    `,
    { type: sequelize.QueryTypes.SELECT }
  );

  return record;
};

module.exports = getEmpAttendence;
