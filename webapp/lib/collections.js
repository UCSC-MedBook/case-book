//Expression = new Mongo.Collection("expression");
//Points = new Meteor.Collection("Points");
myFiles = FileCollection({
  resumable: true,     // Enable the resumable.js compatible chunked file upload interface
  resumableIndexName: 'test',  // Dont use the default MongoDB index name, which is 94 chars long
  http: [{
      method: 'get',
      path: '/md5/:md5',
      lookup: function(params, query) {
        return {
          md5: params.md5
        };
      }
  }]
})
//Files = new FileCollection('fs',  // base name of collection
//  { resumable: false,          // Disable resumable.js upload support
//    resumableIndexName: undefined,    // Not used when resumable is false
//    chunkSize: 2*1024*1024 - 1024,    // Use 2MB chunks for gridFS and resumable
//    baseURL: '\gridfs\fs',     // Default base URL for all HTTP methods
//    locks: {                   // Parameters for gridfs-locks
//      timeOut: 360,            // Seconds to wait for an unavailable lock
//      pollingInterval: 5,      // Seconds to wait between lock attempts
//      lockExpiration: 90       // Seconds until a lock expires
//    },
//    http: []    // HTTP method definitions, none by default
//  }
//);
