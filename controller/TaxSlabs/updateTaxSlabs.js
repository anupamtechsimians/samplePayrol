const TaxSlabs = require('../../models/TaxSlabs');
const {UpdateSlabsComponentSchema} = require('../../validations/taxSlabs');
const {ObjectId} = require('mongoose').Types;
const updateTaxSlab = async (req, res) => {
    const {id} = req.params;
    try {
      const { error, value } =  UpdateSlabsComponentSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const data = await TaxSlabs.findOneAndUpdate({_id:new ObjectId(id)},value,{new:true});
      res.status(200).json(data);
      
    } catch (error) {
      console.error( error.message)
      res.status(500).json({ error: error.message });
    }
  };

module.exports = updateTaxSlab;
