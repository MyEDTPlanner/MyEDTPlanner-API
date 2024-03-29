const moment = require('moment');
const generateEventUuid = require('../utils/generateEventUuid');

class WebEventParser {
    static REGEX_DATE = /(Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche) /u;
    static REGEX_UEC = /-(?<ec>(?:EC|(?:UE(?:C|T|D)))[0-9]{2,3})_/;
    static REGEX_PROF = "^(?<prenom>(?:[A-Z][a-z]*)(?:[ \-]+[A-Z][a-z]*)?) +(?<nom>(?:[A-Z]+)(?:[ \-]+[A-Z]+)*)$";

    constructor(event, module, group){
        this._event = event;
        this._module = module;
        this.start;
        this.end;
        this.title;
        this.type;
        this.description;
        this.attendees = [];
        this.locations = [];
        this.groups = [];
        this.done;
        this.presential;
        this.code;
        this.group = group;
    }
    
    parse(){
        this.extractStartDate();
        this.extractEndDate();
        this.extractDescription();
        this.extractAttendees();
        this.extractGroups();
        this.extractIsDone();
        this.extractIsPresential();
        this.extractLocations();
        this.extractTitle();
        this.extractType();
        this.extractCode();

        return {
            start: this.start.toISOString(),
            end: this.end.toISOString(),
            title: this.title,
            group: this.group,
            type: this.type,
            description: this.description,
            attendees: this.attendees,
            locations: this.locations,
            groups: this.groups,
            done:this.done,
            presential:this.presential,
            code:this.code,
            uuid: generateEventUuid(this.start.toISOString(), this.end.toISOString())
        };
    }
    extractType(){
        let type = this._event["type"];
        if(type){
            type = type.trim();
            switch (type) {
                case "CM":
                    this.type = "Cours";
                    break;
                case "TD":
                    this.type = "TP";
                default:
                    this.type = type;
            }
        }
    }
    extractCode(){
        if(this._module){
            let match = this._module.match(WebEventParser.REGEX_UEC);
            if(match){
                this.code = match.groups.ec;
            }
        }
    }
    extractTitle(){
        this.title = this._event["enseignement"].trim();
    }
    extractLocations(){
        this.locations = this._event["salles"].split(" / ");
    }
    extractStartDate(){
        let jour = this._event["date"].replace(WebEventParser.REGEX_DATE, "");
        let heure = this._event["heure de début"];
        this.start = moment(`${jour} ${heure}`, 'DD-MM-YYYY HH[h]mm', 'fr').toDate();
    }
    extractEndDate(){
        let duree = this._event["durée"].replace("h", ":");
        this.end = moment(this.start).add(moment.duration(duree)).toDate();
    }
    extractDescription(){    
        this.description = this._event["commentaire"];
    }
    extractAttendees(){
        let list = this._event["profs"].split(" / ")
        this.attendees = list.reduce((acc, ligne) => {
            let match = ligne.match(WebEventParser.REGEX_PROF);
            if(match){
                acc.push({
                    firstname: match.groups.prenom,
                    lastname: match.groups.nom
                });
            }
            return acc;
        }, []);
    }
    extractGroups(){
        this.groups = this._event["groupes"].split(" / ");
    }
    extractIsDone(){
        this.done = this._event["effectuée"] == "✓";
    }
    extractIsPresential(){
        this.presential = (this._event["présentiel"] == "Présentiel" || this._event["présentiel"] == "Non défini");
    }
}
module.exports = WebEventParser;