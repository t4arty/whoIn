/**
 * 
 */

VK.init({
    apiId: 1755175
});

var WRONG_TEXT = 'Something goes wrong. Enter valid post address.';

var grp = '';
var us = '';
var grpAvatar = '';

var obj = [];
var parsed = [];

function getGroupInfo(groupId) {
    
    VK.api("groups.getById", { 'group_id': Math.abs(groupId), 'fields': 'members_count,photo_100' }, function (data) {
        if (data.error) {
            errorMSG('Error in data. Wrong group data.')
        }
	for(var i=0;i<data.response.length;i++) {
	    grp = data.response[i].name;
	    us = data.response[i].members_count;
	    grpAvatar = data.response[i].photo_100;
	    
	    obj[0] = grp;
	    obj[1] = us;
	    obj[2] = grpAvatar;
	    
	    groupViewChanges(getGroupData());

	    getGroupMembers(parsed);
	}
    });
}

function getGroupMembers(objTarget) {
    var OFFSET = 0;
    var info = objTarget;
    var m_count = 0;
    var code = '';


    VK.api('likes.getList', {'type':'post','owner_id':info[0],'item_id':info[1],'offset':OFFSET,'count':1000}, function (data) {
        if (data.error) { errorMSG('Wrong: Get likes fail.'); }

        m_count = data.response.count;
        var members = data.response.items;

        console.log(m_count,members);

    });

        code = 'var c=0;var p=[];var i=0;var o=' + OFFSET + ';var u="";' +
        'while(i!=10){'+
        'var li=API.likes.getList({"type":"post","owner_id":-10639516,"item_id":57781356,"offset":o,"count":1000});'+
        'c=li.count;u=u+API.users.get({"user_ids":li.items,"fields":"sex"})@.first_name;i=i+1;o=o+1000;}'+
        'return {"c":c,"u":u};';


}

function getGroupData() {
    return obj;
}

function getParsedInfo() {
    return parsed;
}

function groupViewChanges(obj) {
    var a = obj;
    document.getElementById('groupName').innerHTML = '��������: '+a[0];
    document.getElementById('members_count').innerHTML = '����������: '+a[1];
    document.getElementById('av').src = a[2];
}

function parseLink() {
    var link = String(document.getElementById('post').value);
    
    if (link != '' && (link.match('vk.com') == 'vk.com') && (link.match('wall-') == 'wall-')) {
	
        if (link.indexOf('=wall') != -1) {
            var adr = link.substring(link.indexOf('=wall') + 5, link.length);
            var p = adr.split('_');
            if ((p[0] === undefined) && (p[1] === undefined)) {
                errorMSG('Wrong: group or post or both');
            } else {
                if ((/\d+/.test(p[0])) && (/\d+/.test(p[1]))) {
                    getGroupInfo(parsed[0]);
                }
                
            }
        } else {
            errorMSG('Wrong: not wall post');
        }
    }else{
        errorMSG('Wrong: not vk.com');
    }
}

function clearadress() {
    document.getElementById('post').value = '';
}

function errorMSG(msg) {
    document.getElementById('post').value = msg;
    setTimeout(clearadress, 800);
}
