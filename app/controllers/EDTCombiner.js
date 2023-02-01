const Event = require('../models/event');

class EDTCombiner{
    
    constructor(master, complementaire){
        this.master = master;
        this.complementaire = complementaire;
    }
    
    concate(){
        return this.master.map(objmaster => {
            const objetcomplementaire = this.complementaire.find(elem => elem.uuid === objmaster.uuid);
            const result = {...objmaster, ...objetcomplementaire};
            return new Event(result);
        });
    }
}
module.exports = EDTCombiner;