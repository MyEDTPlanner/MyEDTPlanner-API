const generateEventUuid = require('../utils/generateEventUuid');

class ICSEventParser {
    static REGEX_SALLE = / (?=RFC|IBGBI|PEL|AX|BX|CX|1CY|IDF|MAU|IUT)/;
    static REGEX_DESCRIPTION = /(?<key>[^:]+(?= : )) : (?<value>.+)/;

    constructor(event, group){
        this._event = event;
        this._descInfos = {};
        this.start;
        this.end;
        this.title;
        this.type;
        this.description;
        this.locations = [];
        this.attendees = [];
        this.groups = [];
        this.done;
        this.presential;
        this.code;
        this.group = group;
        this.universityPresence;
    }
    parse(){
        
        this.extractDescriptionInfos();
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
        this.extractUniversityPresence();

        let event =  {
            start: this.start.toISOString(),
            end: this.end.toISOString(),
            group: this.group,
            title: this.title,
            type: this.type,
            description: this.description,
            locations: this.locations,
            attendees: this.attendees,
            groups: this.groups,
            done: this.done,
            presential: this.presential,
            code: this.code,
            universityPresence: this.universityPresence,
            uuid: generateEventUuid(this.start.toISOString(), this.end.toISOString())
        };
        return event;
    }
    extractType(){
        let type = this._event.summary.split(" - ")[1];
        if(type){
            type = type.trim();
            switch (type) {
                case "CM":
                    this.type = "Cours";
                    break;
                case "TD":
                    this.type = "TP";
                    break;
                default:
                    this.type = type;
            }
        } else {
            if(this._event.summary.toLowerCase().includes("rattrapage") || this._event.summary.toLowerCase().includes("examen")){
                this.type = "Examen";
            } else {
                this.type = "Autre";
            }
        }
    }
    extractUniversityPresence(){
        this.universityPresence = false;

        if(this.type == "Autre" && this._descInfos["INTITULE"]){
            // Mettre en majuscule et enlèver les accents
            const titre = this._descInfos["INTITULE"].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            if(titre.includes("presence") && titre.includes("universit")){
                this.universityPresence = true;
            }
        }
    }
    extractTitle(){
        this.title = this._event.summary.split(" - ")[0].trim();
    }
    extractLocations(){
        this.locations = this._event.location.split(ICSEventParser.REGEX_SALLE);
    }
    extractStartDate(){
        this.start = this._event.start;
    }
    extractEndDate(){
        this.end = this._event.end;
    }
    extractDescription(){  
        this.description = Object.entries(this._descInfos).reduce((acc, [key, value]) => {
            if(!["PROF", "MATIERE", "DUREE"].includes(key)){
                acc.push(`${key} : ${value}`);
            }
            return acc;
        }, []).join("\n");
    }
    extractAttendees(){
        let list = this._descInfos["PROF"] ? this._descInfos["PROF"].split(" / ") : [];
        this.attendees = list.map((lastname) => {
            return {
                firstname: "",
                lastname: lastname
            };
        });
    }
    extractGroups(){

    }
    extractIsDone(){
        
    }
    extractCode(){
        
    }
    extractIsPresential(){
        this.presential = this._descInfos["COMMENTAIRE"] ? !this._descInfos["COMMENTAIRE"].includes('Distanciel') : true;
    }
    extractDescriptionInfos(){
        let desc = this._event.description.val.split("\n");
        this._descInfos = desc.reduce((acc, line) => {
            let match = line.match(ICSEventParser.REGEX_DESCRIPTION);
            if(match){
                acc[match.groups.key.trim()] = match.groups.value.trim();
            }
            return acc;
        }, {});
    }
}
module.exports = ICSEventParser;