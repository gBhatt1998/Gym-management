export interface Bmiresponse {
    status: string;
    error: any;
    code: number;
    data: {
      height: string;
      weight: string;
      bmi: number;
      risk: string;
      summary: string;
      recommendation: string;
    };
  }
  