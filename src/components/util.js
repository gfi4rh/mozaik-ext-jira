import moment from "moment";

function notWorkingDay(date){

  let year = date.year();

  var JourAn = moment([year, "00", "01"])
	var FeteTravail = moment([year, "04", "01"])
	var Victoire1945 = moment([year, "04", "08"])
	var FeteNationale = moment([year,"06", "14"])
	var Assomption = moment([year, "07", "15"])
	var Toussaint = moment([year, "10", "01"])
	var Armistice = moment([year, "10", "11"])
	var Noel = moment([year, "11", "25"])
	
	var G = year%19
	var C = Math.floor(year/100)
	var H = (C - Math.floor(C/4) - Math.floor((8*C+13)/25) + 19*G + 15)%30
	var I = H - Math.floor(H/28)*(1 - Math.floor(H/28)*Math.floor(29/(H + 1))*Math.floor((21 - G)/11))
	var J = (year*1 + Math.floor(year/4) + I + 2 - C + Math.floor(C/4))%7
	var L = I - J
	var MoisPaques = 3 + Math.floor((L + 40)/44)
    var JourPaques = L + 28 - 31*Math.floor(MoisPaques/4)
    var LundiPaques = moment([year, MoisPaques, JourPaques]).subtract(1, "month").add(1, 'day')
    var Ascension = moment([year, MoisPaques, JourPaques]).subtract(1, "month").add(39, 'day')
    var LundiPentecote = moment([year, MoisPaques, JourPaques]).subtract(1, "month").add(50, 'day')
    
    let feries = [JourAn, LundiPaques, FeteTravail, Victoire1945, Ascension, LundiPentecote, FeteNationale, Assomption, Toussaint, Armistice, Noel];
    let weekend= [6 /*samedi*/, 0 /*dimanche*/];
    return feries.includes(date) || weekend.includes(date.day());

}

export function hoursLeft(){
  let hour = moment().hour()+1;
  if(hour <=9) return 8
  if(hour <=12) return 5+12-hour
  if(hour <=13) return 5
  if(hour <=18) return 18-hour
  return 0;
}

export function betweenBusinessDays(start, end){
  const total = end.diff(start, "days")
  let numOfDays = total
  for(let i = 0; i <= total; i++){
      if(notWorkingDay(moment(start).add(i, "days"))) numOfDays --
  }
  return numOfDays;
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

export function sortType(tickets){
  let data = {
    task : 0,
    bogue : 0,
    evolution : 0
  };

  tickets.issues.map(issue => {
    switch(issue.fields.issuetype.name){
      case("Bogue  "):
        data.bogue ++;
        break;
      case("Tâche"):
        data.task ++;
        break;
      case("Evolution"):
        data.evolution ++;
    }
  });

  const formatData = {
    labels: [
      'Bogue',
      'Tâche',
      'Evolution'
    ],
    datasets: [{
      data: [
        data.bogue,
        data.task,
        data.evolution
      ],
      backgroundColor: [
      '#d35400',
      '#2980b9',
      '#27ae60'
      ],
      hoverBackgroundColor: [
      '#d35400',
      '#2980b9',
      '#27ae60'
      ]
    }]
  };

  return formatData;

}



