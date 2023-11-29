const downloadData = async (req,res)=>{
    try{
    const filePath = 'sample_employee_export.xlsx'; // Replace with the actual file path

    // Set the response headers for the file download
    res.setHeader('Content-Disposition', 'attachment; filename="sample.excel"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  
    // Send the file for download
    res.download(filePath, 'sample.excel', (err) => {
      if (err) {
        // Handle any error that may occur during the download
        console.error('Error while downloading file:', err);
        res.status(500).send('Error downloading the file');
      }
    }); 
}catch(e){
    console.log(e);
    return res.status(500).json({message:"Internal server error"})
}   
}

module.exports = downloadData;