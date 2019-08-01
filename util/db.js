function findAll(db, collectionName, callback) {
    const collection = db.collection(collectionName);
    collection.find({}).toArray(function(err, documents) {
        if (err) {
            console.log(err);
            return null;
        }
        console.log("Found the following records");
        callback(documents);
    });
}

module.exports = {
    findAll: findAll
};
