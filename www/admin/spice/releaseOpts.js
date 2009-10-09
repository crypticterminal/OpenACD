dojo.provide("spice.releaseOpts");

releaseOpts = function(){};

releaseOpts.store = releaseOpts.store = new dojo.data.ItemFileWriteStore({
	url:"/release_opts/get_all"
});

releaseOpts.init = function(){
	releaseOpts.store._forceLoad();
	releaseOpts.store._saveCustom = function(savecomplete){
		var changeset = releaseOpts.store._pending;
		var updates = [];
		for(var i in changeset._modifiedItems){
			var item = null;
			if(releaseOpts.store._itemsByIdentity){
				item = releaseOpts.store._itemsByIdentity[i];
			}
			else{
				item = releaseOpts.store._arrayOfAllItems[i];
			}
			updates.push(item);
		}
		savecomplete();
	}
	
	dijit.byId('agentReleaseCodesGrid')._setStore(releaseOpts.store);
	dijit.byId('agentReleaseCodesGrid')._refresh();
}

releaseOpts.addOption = function(obj, load, error){
	dojo.xhrPost({
		url:"/release_opts/add",
		content:obj,
		handleAs:'json',
		'load':function(res){
			load(res);
		},
		'error':function(res){
			error(res);
		}
	});
}

