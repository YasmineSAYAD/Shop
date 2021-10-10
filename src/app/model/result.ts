export interface Result {
  status:number,
  result,//parfois c'est string et parfois c'est un tableau de string
  message:string;
  time:string,
  args;
}
