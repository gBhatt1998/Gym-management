export interface trainerDetail{
    id:number;
    createdAt:string;
    firstname:string;
    lastname:string;
    age:number;
    experince:number;
}

export interface AdminTrainerResponse {
    id: string;
    name: string;
    username: string;
    role: string;
    password: string;
  }