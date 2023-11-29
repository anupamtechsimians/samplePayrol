const CompanyEmployee = require('../../models/CompanyEmployees')

const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await CompanyEmployee.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  module.exports = deleteUser;