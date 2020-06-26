export class Question {
    public titre:string;
    public duree:string;
    public langage:Langage=new Langage();
    public score:number;
    public difficulte:string;
    public theme:Theme=new Theme();
    public enonce:string;
    public description:string;
    public reponses:any;
    public typeQuestion:string;
}
export class Langage{
    public id:number;
    public nom:string;
    public defaultText:string;

}
export class Theme{
    public id:number;
    public nom:string;

}