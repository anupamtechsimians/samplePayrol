

const sequelize = require("../config/hrmsDb");
const getEmpAttendence = async (data) => {
    const inc =0;
    for(let i=1;i<=31;i++){
        let v =i>9?`${i}`:`0${i}`;
        const date = new Date(`2023-07-${v}`);
        const dayOfWeek = date.getDay();
        if(dayOfWeek===0 || dayOfWeek===6){
            continue;
        }
        
   const dd = await sequelize.query(
    `INSERT INTO attendance
    ( employee_id, createdAt, updatedAt, inTime, outTime, hours, roundOf, attendence_date, owner_id, status)
    VALUES(834, '2023-07-${v} 10:10:11', '2023-07-${v} 19:10:10', '2023-07-${v} 10:00:08', '2023-07-${v} 19:00:30', NULL, NULL, '2023-07-${v}', 151, 'present');
    `,
    { type: sequelize.QueryTypes.INSERT }
  );
//    const dd = await sequelize.query(
//     `INSERT INTO employees
//     ( title, first_name, middle_name, last_name, emp_type, working_location, date_of_joining, gender, marital_status, date_of_birth, blood_group, nationality, languages, highest_qualification, work_experience, mobile_no, createdAt, updatedAt, branch_id, department_id, designation_id, company_id, work_email, email, password, nominee_mobile_no, nominee_email, relation_with_employee, nominee_name, isDeleted, company_type, crew_type, remark, manager_name, employee_status, employee_classification, religion, no_of_dependency, nearest_domestic_airport, nearest_internatinal_airport, safty_shoe_size, last_day, coverall_size, emergency_name, emergency_relation_employee, emergency_telephone_no, emergency_cellphone_no, emergency_address, emergency_Email, cv_approvel, cv_uploade, smartcard_approvel, smartcard_upload, bank_name, account_no, bank_address, bank_branch, attendance_code, nominee_telephone_no, personal_telephone, pan_no, upload_pan, aadhar_no, upload_aadhar, passport_no, restriction_passport, date_of_issue, date_of_expiry, place_of_issue, place_of_birth, passport_type, upload_passport, smartcard_issued, cdc_no, cdc_date_of_issue, cdc_date_of_expiry, upload_cdc, user_owner_id, emp_package, emp_shift, comm_address, comm_country, comm_city, comm_destrict, comm_zip, comm_state, country, state, district, city, zipcode, permanent_address, temp_country, temp_city, temp_destrict, temp_zip, temp_state, temporary_address, nominee_address, create_user_check, Same_as_Temporary, Same_as_Permanent, emp_id, probation_period, isExitDetail, upload_nominee_form, emp_role_id, employment_type, emp_role)
//     VALUES( 'Ms.', 'auto${i}', '', 'autoSurname', 'Staff', 'Mumbai', '2022-02-04 18:30:00', 'Male', '', '2005-07-15 18:30:00', '', '', NULL, '', '1 yrs', '4334345${i}56', '2023-07-18 12:13:31', '2023-07-18 12:13:31', 280, 454, 481, 300, 'automatic${i}@delta.com', 'swati${i}@yopmail.com', NULL, NULL, '', '', '', 0, 'Public Limited Company', '', '', 'Shivani', '', '', '', 0, '', '', '', NULL, NULL, '', '', '', '', '', '', 0, '', 0, '', '', '', '', '', '', '', NULL, '', '', '', '', '', '', NULL, NULL, '', NULL, '', '', '', '', NULL, NULL, '', 151, NULL, 304, 'gdsdfhg', 'United States Minor Outlying Islands', '', '', '545456', '', 'United States Minor Outlying Islands', '', '', '', '545456', 'gdsdfhg', '', '', '', '', '', '', '', 1, 1, 0, '6', '5', 0, '', 286, 119, NULL);
//     `,
//     { type: sequelize.QueryTypes.INSERT }
//   );
    }

//   return record;
};
getEmpAttendence();
// module.exports = getEmpAttendence;
