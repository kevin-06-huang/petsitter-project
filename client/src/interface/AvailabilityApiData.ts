export interface AvailabileValue {
  name: string;
  days: {
    sunday: DayInformation;
    monday: DayInformation;
    tuesday: DayInformation;
    wednesday: DayInformation;
    thursday: DayInformation;
    friday: DayInformation;
    saturday: DayInformation;
  };
}

export interface DayInformation {
  active: boolean;
  startTime: string;
  endTime: string;
}
export interface AvailabilityApiDataSuccess {
  availability?: AvailabileValue[];
}

export interface AvailabilityApiData {
  error?: string;
  success?: AvailabilityApiDataSuccess;
}
