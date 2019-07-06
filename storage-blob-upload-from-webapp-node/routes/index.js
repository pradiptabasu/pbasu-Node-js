if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

//var accessKey = '[accountKey]';
var accessKey = 'kEIdvYqExN8I0CN/OppuOkaoT8jg2ADYR3jgU9IxKwlHf6ktJAAW+MDhWzFBUO+iQH/c+tAQcm5UiTk/4NewDg==';
//var storageAccount = '[accountName]';
var storageAccount = 'stopbac1';
//var containerName = 'nodejs';

const
      express = require('express')
    , router = express.Router()
    , azureStorage = require('azure-storage')
    , blobService = azureStorage.createBlobService()
    , containerName = 'images'
//   , containerName = 'thumbnails'
//    , containerName = 'stopbac-cont1'
    , config = require('../config')
;

router.get('/', (req, res, next) => {

  blobService.listBlobsSegmented(containerName, null, (err, data) => {

    let viewData;

    if (err) {

      viewData = {
        title: 'Error',
        viewName: 'error',
        message: 'There was an error contacting the blob storage container.',
        error: err
      };
      
      res.status(500);

    } else {

      viewData = {
        title: 'Home',
        viewName: 'index',
        accountName: config.getStorageAccountName(),
        containerName: containerName
      };

      if (data.entries.length) {
        viewData.thumbnails = data.entries;
      }
      
    }

    res.render(viewData.viewName, viewData);
  });

});

module.exports = router;