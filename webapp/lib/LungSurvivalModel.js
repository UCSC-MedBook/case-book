lung_survival = function(Gender, WHO, FEV, GTV, LymphNod) {
var Wintercept=2.4279;
var Wgender=0.8325;
var Wwho=-0.4395;
var Wfev=0.0056;
var Wlymphnod=-0.28002;
var Wgtv=-0.7746;

if (Gender=="female"){
  Gender=1;
  riskpoints=0;
}
else {
  Gender=0;
  riskpoints=1;
}

var LP=Wintercept+(Wgender*Gender)+(Wwho*WHO)+(Wfev*FEV)+(Wlymphnod*LymphNod)+(Wgtv*(Math.log(GTV)));
var Prob=1/(1+Math.exp(-LP));
Prob=Prob*100;
Prob=Math.round(Prob,0);
var Points=(2.5*riskpoints)+(1.5*WHO)+((140-FEV)/40)+(1*LymphNod)+(1.5*Math.log(GTV));

if (Points>15){
  riskgroup="high";
}
else {
  if (Points<11){
    riskgroup="low";
  }
  else {
    riskgroup="medium";
  }
}
console.log('riskgroup', riskgroup, 'Probability alive after 24 months', Prob);
console.log( '<img src="images/Kaplan300_2.jpg" alt="Kaplan Meier Curves" />');
return {risk:riskgroup, probability:Prob};
}
