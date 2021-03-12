import periodic from "contained-periodic-values";



  export function betweenWithoutWeekend(start, end, hoursPerDay){
    const startDay = start.day();
    const total = end.diff(start, "days", true)
    const sun = periodic(startDay, total + startDay, 0, 7);
    const satur = periodic(startDay, total + startDay, 6, 7);
  
    const days = Math.floor(total-(sun+satur));
    const hours = Math.floor((total-(sun+satur+days))*hoursPerDay)
  
  
    return `${days == 0 ? '':`${days} j`} ${hours == 0 ? '' :`${hours} h`} `;
  }

  export function sortIssues(issues, project){

    let doneList = ["VERIFIEE", "Réalisée", "En verification", "En validation", "Terminée", "Cloturée"]

    let newIssues = issues.issues
            .filter(x => x.key.split('-')[0] === project)
            .map(issue => { return {
                id : issue.id,
                key : issue.key,
                status : {name : issue.fields.status.name, key : issue.fields.status.statusCategory.key} 
            }});

        let done = newIssues.filter(x => doneList.includes(x.status.name)).length
        let open = (newIssues.length - done);
        console.log(newIssues);
        return {newIssues, done, open};
  }



