async function log(db,collection,id,json = {},shardCount = 5){
	const shard = id+ '-shard-' + (Math.floor(Math.random() * shardCount) + 1);
	var ref = db.collection(collection).doc(shard);

  json.modified = Date.now();

	return ref.get()
    .then(doc => {
      if(!doc.exists){
      	var obj = {};
        obj.id = id;
        obj.events = [json];
  			obj.modified = Date.now();
				db.collection(collection).doc(shard).set(obj)
				.then(ref =>{return ref})
			  .catch(err =>{return err})
      }
      else{
      	var data = doc.data();
        var modified = Date.now();
        var events = data.hasOwnProperty('events') ? data.events : [];
        events.push(json);
      	var updateShard = ref.update({events,modified})
      	.then(update => {return update})
				.catch((err) => {return err})
      }
    })
    .catch(err => {
      return err;
    });
}

exports.log = log;