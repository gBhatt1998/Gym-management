export interface Schedule {
    id?: string;
    trainerId: number; 
    adminId: number; 
    proposedDays: string[]; 
    selectedDays: string[];
    status: 'proposed' | 'responded' | 'confirmed'; 
    createdAt?: Date;
}