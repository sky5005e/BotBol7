export interface PendingAgentAssitant {
    Id: number;
    UserID: string;
    UserName: string;
    Channel: string;
    created: Date;
    Message: string;
    IPAddress: string;
    MessageID: string;
    Type: string;
    DeviceType: string;
    IsAttended: boolean;
    AttendedBy: number;
    AttendedAgent: string;
}