export interface Schedule {
    id?: string;
    trainerId: string; 
    adminId: string; 
    proposedDays: string[]; 
    selectedDays: string[];
    status: 'proposed' | 'responded' | 'confirmed'; 
    createdAt?: Date;
}