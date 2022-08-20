"use strict";

const { all } = require("bluebird");

// Print all entries, across all of the *async* sources, in chronological order.

function sortFunction(a,b){
  return new Date(a.date) - new Date(b.date);
}

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    var allLogs = []
    for (var i=0; i<logSources.length;i++){
    var logEntry = await logSources[i].popAsync();
    while(logEntry){
        allLogs.push(logEntry)
        logEntry= await logSources[i].popAsync();
      }
    }
    allLogs = allLogs.sort(sortFunction);
    allLogs.forEach(log=>printer.print(log))
    printer.done();
    resolve(console.log("Async sort complete."));
  });
};
