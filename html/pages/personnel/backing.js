
var backingObject={
activities: ""
}

var Backing={
    getFullname:function(){
        ActivityModule.getFullname("dummy", function(res,err){
            if(res){
                var response = res;
                $('#logedin-user-name').text(response.fullname);
                $('#logedin-user-name').show();
            //$('#resultDiv').text('wdgwogsiuoshduovhsopdvhpsvkbsuiodbsldvbsdjovbopsvlsdkvb\nsdvnks djkvbs');
            }
        });
    },
    getCandidates:function(){
        ActivityModule.getCandidates("dummy", function(res, err){
            if(res){
                //var response = JSON.stringify(res);
                var response = res;
                var loggedInAs = $('#logedin-user-name').text();
                for(var user in response)
                {
                    if(response[user].name===loggedInAs){
                        continue;
                    }
                    //$('#activityList').append("<tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>");
                    $('#candidateSelection').append("<option value="+response[user]._id+">"+response[user].name+"</option>");
                }
            }
        });  
    },
    getActivities:function(data){
        ActivityModule.getActivities(data, function(res, err){
            if(res){
                if(res!=="No activities found")
                {
                    $('#activityList').css('text-align','center');
                    for(var activity in res)
                    {
                        var start = new Date(parseInt(res[activity].startTime));
                        var end = new Date(parseInt(res[activity].endTime));
			res[activity].timeTaken = end-start;
			//alert(res[activity].timeTaken)
                        var totalTime = Math.floor((end-start)/(1000*60));
                        $('#activityList').append("<tr><td><img height=30px src='/images/notes-icon.jpg' /> "+(parseInt(activity)+1)+"</td><td>"+res[activity].activityTitle+"</td><td>"+res[activity].activityDescription+"</td><td>"+start.toString().substring(0,start.toString().indexOf('G'))+"</td><td>"+end.toString().substring(0,end.toString().indexOf('G'))+"</td><td>"+totalTime+" Minutes</td></tr><tr><td align='center' colspan='6'><img width=100% height=2px src='/images/contnt.gif' /> </td><tr>");
                    }
		backingObject.activities=res;
                }
                else{
			backingObject.activities="";
		    $('#activityList').append("<tr><td align='center' colspan='6'><img height=30px src='/images/loadingAnimation.gif' /></td></tr>"+
					"<tr><td align='center' colspan='6'>This candidate hasn't added any activity yet</td></tr>");
                }
            }
        });  
    }
}
