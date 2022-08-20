"use strict";

const { all } = require("bluebird");

// Print all entries, across all of the *async* sources, in chronological order.

function sortFunction(a,b){
  return new Date(a.date) - new Date(b.date);
}

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    let allLogs = []
    Promise.all(
      logSources.map(async (logSource)=>{
        let logSourceEntries=[]
        let logEntry = await logSource.popAsync();
        while(logEntry){
          logSourceEntries.push(logEntry)
          logEntry = await logSource.popAsync();
        } 
        return logSourceEntries;
      })
    ).then((values)=>{
      allLogs = values.flat()
      console.log(allLogs)
      allLogs = allLogs.sort(sortFunction);
      allLogs.forEach(log=>printer.print(log))
      printer.done();
      resolve(console.log("Async sort complete."));
    })
  });
};
