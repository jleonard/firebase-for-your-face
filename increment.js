async function increment(db,collection,shardCount = 20){
	const shard = 'shard-' + (Math.floor(Math.random() * shardCount) + 1);
	var ref = db.collection(collection).doc(shard);

	return ref.get()
    .then(doc => {
      if(!doc.exists){
      	var obj = {};
  			obj.count = 1;
				db.collection(collection).doc(shard).set(obj)
				.then(ref =>{return ref})
			  .catch(err =>{return err})
      }
      else{
      	var data = doc.data();
      	var count = data.hasOwnProperty('count') ? data.count + 1 : 0;
      	var modified = Date.now();
      	var updateShard = ref.update({ count,modified })
      	.then(update => {return update})
				.catch((err) => {return err})
      }
    })
    .catch(err => {
      return err;
    });
}

exports.increment = increment;