export class ReponseQcm {
    constructor(titre,rep){
        this.reponseBol=rep;
        this.titre=titre;
    }
    public id:number;
    public titre:string;
    public reponseBol:boolean;
}
