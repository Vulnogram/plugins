// Script to import JIRA database into Vulnogram using JIRA APIs //

// WARNING: keep this file secured as it can contain JIRA access tokens !!!!

var token = 'your jira access token'; 
var JiraApi = require('jira-client');
var mongoURL = 'your mongodb URL';
var MongoClient = require('mongodb').MongoClient;
var defaultJQL = 'Default JQL query';
var jiraOpts = {
    protocol: 'https',
    username: 'jira username',
    password: token,
    host: 'jira server address'
}
var jira = new JiraApi(jiraOpts)

function renameCustom(names, obj) {
    var ret = {};
    for(var k in obj) {
        val = obj[k];
        key = names[k] || k;
        ret[key] = val;
    }
    return ret;
}

async function queryJira(phrase) {
  try {
      var client = await MongoClient.connect(mongoURL, { useNewUrlParser: true });
      var db = client.db('vulnogram');
      
      var jql = defaultJQL + (phrase? ' AND ' + phrase : '');
      var startAt = 0, maxResults = 100;
      while(true) {
    const ret = 
          await jira.searchJira(jql, {
              startAt: startAt,
              maxResults: maxResults,
              expand: ['names']
              });
            for(var issue of ret.issues) {
                if(issue.fields.created) {
                    try{
                        var year = new Date(issue.fields.created).getFullYear();
                        issue.year = year;
                    } catch(e){
                        //ignore
                    }
                }
                issue.fields = renameCustom(ret.names, issue.fields);
                
                var result = await db.collection('jiras').findOneAndUpdate(
                    { key: issue.key },
                    { $set: issue }, 
                    { upsert: true }
                );
                if(result && result.value == null) {
                    console.log("new: https://" + jiraOpts.host + '/browse/' + issue.key);
                } else {
                    // console.log("upd: " + issue.key);
                }
            }
            if (ret.issues.length < ret.maxResults) {
                break;
            } else {
                startAt += ret.maxResults;
            }
        }
      client.close();
  } catch (err) {
    console.error(err.message);
  }
}

queryJira(process.argv[2]);

/*
// This code sample uses the 'request' library:
// https://www.npmjs.com/package/request
var request = require('request');

var options = {
   method: 'GET',
   url: 'jira query URL',
   user: 'userid',
    pass: token,
   //auth: { bearer: token },
   headers: {
      'Accept': 'application/json'
   }
};

request(options, function (error, response, body) {
   if (error) throw new Error(error);
   console.log(
      'Response: ' + response.statusCode + ' ' + response.statusMessage
   );
   console.log(body);
});
*/