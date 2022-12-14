"use strict";

// Print all entries, across all of the sources, in chronological order.

function sortFunction(a,b){
  return new Date(a.date) - new Date(b.date);
}

module.exports = (logSources, printer) => {
  let allLogs = []
  for (let i=0; i<logSources.length;i++){
    let logEntry = logSources[i].pop();
    while(logEntry){
      allLogs.push(logEntry)
      logEntry=logSources[i].pop();
    }
  }
  allLogs = allLogs.sort(sortFunction);
  allLogs.forEach(log=>printer.print(log))
  printer.done();
  return console.log("Sync sort complete.");
};
