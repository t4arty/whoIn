/**
 * 
 */

VK.init({
    apiId: 1755175
});


var grp = 0;
var us = 0;
var grpAvatar = 0;

var obj = [];

function getGroupInfo() {
    VK.api("groups.getById",{'group_id': '45091870','fields':'members_count,photo_100'}, function(data){
	for(i=0;i<data.response.length;i++) {
	    grp = data.response[i].name;
	    us = data.response[i].members_count;
	    grpAvatar = data.response[i].photo_100;
	    
	    obj[0] = grp;
	    obj[1] = us;
	    obj[2] = grpAvatar;
	    
	    wait();
	}
    });
}
function getGroupData() {
    return obj;
}

function wait() {
    var a = getGroupData();
    document.getElementById('data').innerHTML = 'name: '+a[0]' count:'+a[1];
    document.getElementById('av').src = a[2];
    console.log('Done');
}

//'http://vk.com/darcor?w=wall-45091870_69859'
//  45091870 