# case-book
to install standalone version with empty database

$ git clone https://github.com/UCSC-MedBook/case-book.git <br>
$ cd case-book/webapp <br>
$ meteor

Installing Meteor
https://www.meteor.com/install

By default meteor starts up a mongo server, to look at mongo data, run the following:
$ meteor mongo
> show collections


You also need to manually create the full text index
> db.cases.createIndex( { fullNarrative: "text" } );




